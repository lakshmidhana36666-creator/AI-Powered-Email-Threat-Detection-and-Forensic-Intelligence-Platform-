import { useState } from "react";
function EmailAnalyzer() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const analyzeEmail = async () => {
    if (!email.trim()) {
      setError("Please enter email content.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/email/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Email analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        "Backend connection failed. Please check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "24px",
        color: "#ffffff",
        background: "#111827",
        borderRadius: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#06d6f5" }}>Email Threat Analyzer</h1>

      <p>Analyze suspicious emails using our security analysis API.</p>

      <label htmlFor="email-content">Email Content</label>

      <textarea
        id="email-content"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Paste suspicious email content here..."
        rows={9}
        style={{
          width: "100%",
          boxSizing: "border-box",
          marginTop: "12px",
          padding: "14px",
          background: "#1f2937",
          color: "#ffffff",
          border: "1px solid #374151",
          borderRadius: "8px",
          fontSize: "15px",
        }}
      />

      <button
        onClick={analyzeEmail}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "16px",
          padding: "14px",
          background: "#06b6d4",
          color: "#07111f",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Email"}
      </button>

      {error && (
        <p style={{ color: "#f87171", marginTop: "18px" }}>{error}</p>
      )}

      {result && (
        <div
          style={{
            marginTop: "24px",
            padding: "18px",
            background: "#1f2937",
            borderRadius: "10px",
          }}
        >
          <h2>Analysis Results</h2>

          <p>
            <strong>Status:</strong>{" "}
            {result.success ? "Analysis completed" : "Analysis unsuccessful"}
          </p>

          <p>
            <strong>Risk Level:</strong>{" "}
            {result.analysis?.risk_level || "Not available"}
          </p>

          <p>
            <strong>Matched Indicators:</strong>{" "}
            {result.analysis?.matched_indicator_count ?? 0}
          </p>

          <h3>Suspicious Indicators</h3>

          {result.analysis?.suspicious_indicators?.length > 0 ? (
            <ul>
              {result.analysis.suspicious_indicators.map((indicator, index) => (
                <li key={index}>{indicator}</li>
              ))}
            </ul>
          ) : (
            <p>No suspicious keywords detected by the current basic check.</p>
          )}

          <p style={{ color: "#fbbf24", fontSize: "13px" }}>
            {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

export default EmailAnalyzer;