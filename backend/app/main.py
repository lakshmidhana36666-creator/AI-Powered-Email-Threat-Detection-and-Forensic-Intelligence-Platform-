from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from app.database.connection import (
    get_connection,
    initialize_database,
)

app = FastAPI(
    title="Email Threat Detection API",
    description="API for email security analysis and investigation",
    version="1.0.0",
)

# Frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize database when backend starts
@app.on_event("startup")
def startup_event():
    initialize_database()


# Home API
@app.get("/")
def home():
    return {
        "message": "Email Threat Detection API is running!",
        "status": "success",
    }


# Health API
@app.get("/health")
def health_check():
    return {"status": "healthy"}


# Analyze email and save result
@app.post("/api/email/analyze")
def analyze_email(payload: dict):
    email_content = payload.get("email", "").strip()

    if not email_content:
        return {
            "success": False,
            "message": "Please provide email content.",
        }

    suspicious_keywords = [
        "verify your account",
        "urgent action",
        "password",
        "click here",
        "account suspended",
        "prize",
        "bank details",
    ]

    matched_keywords = [
        keyword
        for keyword in suspicious_keywords
        if keyword in email_content.lower()
    ]

    risk_level = (
        "Needs Investigation"
        if matched_keywords
        else "No Keyword Indicators Found"
    )

    # Save result in database
    connection = get_connection()

    try:
        cursor = connection.execute(
            """
            INSERT INTO email_history (
                email_content,
                risk_level,
                matched_indicators,
                indicator_count
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                email_content,
                risk_level,
                json.dumps(matched_keywords),
                len(matched_keywords),
            ),
        )

        connection.commit()
        analysis_id = cursor.lastrowid

    finally:
        connection.close()

    return {
        "success": True,
        "analysis": {
            "id": analysis_id,
            "suspicious_indicators": matched_keywords,
            "matched_indicator_count": len(matched_keywords),
            "risk_level": risk_level,
        },
        "disclaimer": (
            "This is a basic keyword check, not a complete threat detection "
            "system. A lack of matched keywords does not prove an email is safe."
        ),
    }


# Dashboard statistics
@app.get("/api/dashboard/stats")
def dashboard_stats():
    connection = get_connection()

    try:
        total = connection.execute(
            "SELECT COUNT(*) FROM email_history"
        ).fetchone()[0]

        suspicious = connection.execute(
            """
            SELECT COUNT(*)
            FROM email_history
            WHERE indicator_count > 0
            """
        ).fetchone()[0]

        return {
            "success": True,
            "total_emails_analyzed": total,
            "suspicious_emails": suspicious,
            "emails_without_matched_keywords": total - suspicious,
        }

    finally:
        connection.close()


# Email history
@app.get("/api/email/history")
def get_email_history():
    connection = get_connection()

    try:
        rows = connection.execute(
            """
            SELECT
                id,
                email_content,
                risk_level,
                matched_indicators,
                indicator_count,
                created_at
            FROM email_history
            ORDER BY id DESC
            LIMIT 100
            """
        ).fetchall()

        history = []

        for row in rows:
            history.append(
                {
                    "id": row["id"],
                    "email_content": row["email_content"],
                    "risk_level": row["risk_level"],
                    "suspicious_indicators": json.loads(
                        row["matched_indicators"]
                    ),
                    "matched_indicator_count": row["indicator_count"],
                    "created_at": row["created_at"],
                }
            )

        return {
            "success": True,
            "total_records": len(history),
            "history": history,
        }

    finally:
        connection.close()