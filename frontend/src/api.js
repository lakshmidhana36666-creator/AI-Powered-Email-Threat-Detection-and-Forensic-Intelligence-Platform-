const API_BASE_URL = "http://127.0.0.1:8000";

export async function analyzeEmail(emailContent) {
  const response = await fetch(
    `${API_BASE_URL}/api/email/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: emailContent,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Email analysis failed");
  }

  return data;
}s