import sqlite3
from pathlib import Path

# Database file location
DATABASE_PATH = Path(__file__).resolve().parents[2] / "emailguard.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

    try:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS email_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email_content TEXT NOT NULL,
                risk_level TEXT NOT NULL,
                matched_indicators TEXT NOT NULL,
                indicator_count INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        connection.commit()
    finally:
        connection.close()