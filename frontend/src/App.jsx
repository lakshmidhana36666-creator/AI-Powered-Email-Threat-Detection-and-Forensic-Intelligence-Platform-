import { useState } from "react";

const features = [
  {
    icon: "📧",
    title: "Email Threat Detection",
    description: "Inspect email content and identify suspicious patterns.",
  },
  {
    icon: "🔗",
    title: "URL Scanner",
    description: "Inspect suspicious links using configured security checks.",
  },
  {
    icon: "🌐",
    title: "GeoLocation Intelligence",
    description: "Review approximate IP location and network information.",
  },
  {
    icon: "🔬",
    title: "Email Forensics",
    description: "Investigate email headers and technical indicators.",
  },
  {
    icon: "🧠",
    title: "AI Risk Analysis",
    description: "Understand potential threats with intelligent analysis.",
  },
  {
    icon: "📄",
    title: "Investigation Reports",
    description: "Organize findings and review security analysis.",
  },
];

export default function App() {
  const [email, setEmail] = useState("");
  async function handleAnalyze() {
  if (!email.trim()) {
    alert("Please enter email content first.");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/email/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof data.detail === "string"
          ? data.detail
          : JSON.stringify(data.detail || "Analysis failed")
      );
    }

    alert("Email analysis completed!");
    console.log("Analysis result:", data);
  } catch (error) {
    alert("Analysis failed: " + error.message);
  }
}
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#090b12",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          padding: "22px 5%",
          borderBottom: "1px solid #252a35",
        }}
      >
        <a
          href="#home"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h2 style={{ margin: 0, fontSize: 25 }}>
            <span style={{ color: "#13c9e8" }}>Email</span>Guard AI
          </h2>
          <p
            style={{
              margin: "5px 0 0",
              color: "#13c9e8",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            AI-POWERED CYBERSECURITY
          </p>
        </a>

        <nav style={{ display: "flex", gap: 25, flexWrap: "wrap" }}>
          <a href="#features" style={navStyle}>Features</a>
          <a
            href="#analyzer"
            onClick={() => setShowAnalyzer(true)}
            style={navStyle}
          >
            Email Analyzer
          </a>
          <a href="#about" style={navStyle}>About</a>
          <a href="#analyzer" style={buttonStyle}>Get Started →</a>
        </nav>
      </header>

      <main>
        <section
          id="home"
          style={{
            padding: "75px 5% 55px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 45,
            alignItems: "center",
            background:
              "radial-gradient(ellipse at 80% 20%, #12323c 0%, #10131c 38%, #090b12 75%)",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(42px, 5.5vw, 68px)",
                lineHeight: 1.12,
                letterSpacing: "-2px",
                margin: "0 0 20px",
              }}
            >
              Detect Email Threats.
              <br />
              <span style={{ color: "#12c9e8" }}>Stay Protected.</span>
            </h1>

            <p
              style={{
                color: "#a7b0c0",
                fontSize: 17,
                lineHeight: 1.9,
                maxWidth: 620,
              }}
            >
              Analyze suspicious emails, inspect malicious links, investigate
              email headers, and understand potential cybersecurity threats
              in one place.
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginTop: 28,
              }}
            >
              <a
                href="#analyzer"
                onClick={() => setShowAnalyzer(true)}
                style={buttonStyle}
              >
                Analyze an Email →
              </a>

              <a href="#features" style={secondaryButtonStyle}>
                Explore Features
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                marginTop: 24,
                color: "#b8c3d2",
                fontSize: 13,
              }}
            >
              <span>🛡 Threat Analysis</span>
              <span>🔗 URL Inspection</span>
              <span>🔬 Email Forensics</span>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #303b4b",
              borderRadius: 20,
              padding: 28,
              background: "rgba(19, 25, 37, 0.9)",
              boxShadow: "0 20px 70px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                marginBottom: 26,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 21 }}>
                Email Security Center
              </h3>
              <span style={{ color: "#45d6a1", fontSize: 12 }}>● Ready</span>
            </div>

            <p style={{ color: "#a7b0c0", fontSize: 14 }}>
              Email analysis workspace
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 15,
                marginTop: 20,
              }}
            >
              <div style={miniCardStyle}>
                <span style={{ color: "#12c9e8" }}>AI Powered</span>
                <p style={miniTextStyle}>Threat Inspection</p>
              </div>

              <div style={miniCardStyle}>
                <span style={{ color: "#12c9e8" }}>Integrated</span>
                <p style={miniTextStyle}>Security Tools</p>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                padding: 18,
                borderRadius: 12,
                background: "#0c111b",
                border: "1px solid #263343",
              }}
            >
              <span style={{ fontSize: 24 }}>🛡️</span>
              <h4 style={{ margin: "10px 0" }}>Threat Intelligence</h4>
              <p style={{ color: "#a7b0c0", fontSize: 13, lineHeight: 1.7 }}>
                Analyze indicators and investigate suspicious emails.
              </p>
            </div>
          </div>
        </section>

        <section id="features" style={{ padding: "35px 5% 75px" }}>
          <div style={{ textAlign: "center", marginBottom: 38 }}>
            <h2 style={{ fontSize: "clamp(25px, 3vw, 36px)" }}>
              Everything You Need to Investigate Email Threats
            </h2>
            <p style={{ color: "#a7b0c0", lineHeight: 1.8 }}>
              A unified workspace for email security, threat intelligence,
              and digital investigations.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
            }}
          >
            {features.map((feature) => (
              <article
                key={feature.title}
                style={featureCardStyle}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 19, margin: "0 0 12px" }}>
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "#a7b0c0",
                    lineHeight: 1.8,
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="analyzer" style={{ padding: "0 5% 75px" }}>
          <div
            style={{
              maxWidth: 850,
              margin: "0 auto",
              border: "1px solid #303b4b",
              borderRadius: 18,
              padding: 28,
              background: "#121722",
            }}
          >
            <h2>Email Analyzer</h2>
            <p style={{ color: "#a7b0c0", lineHeight: 1.7 }}>
              Enter suspicious email content to prepare it for analysis.
            </p>

            <textarea
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Paste email content here..."
              rows={6}
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#090d15",
                color: "white",
                border: "1px solid #344155",
                borderRadius: 10,
                padding: 15,
                fontSize: 15,
                resize: "vertical",
              }}
            />

            <button
              onClick={handleAnalyze}
              style={{ ...buttonStyle, border: "none", marginTop: 18 }}
            >
              {showAnalyzer ? "Email Ready for Analysis" : "Prepare Email →"}
            </button>

            {showAnalyzer && (
              <p style={{ color: "#12c9e8", marginTop: 15 }}>
                {email.trim()
                  ? "Email entered. Backend analysis can be connected next."
                  : "Enter email content above to get started."}
              </p>
            )}
          </div>
        </section>

        <section id="about" style={{ padding: "0 5% 50px", textAlign: "center" }}>
          <h2>About EmailGuard AI</h2>
          <p style={{ color: "#a7b0c0", lineHeight: 1.8 }}>
            An email security interface designed to support threat inspection
            and cybersecurity investigations.
          </p>
        </section>
      </main>

      <footer
        style={{
          borderTop: "1px solid #252a35",
          padding: 25,
          textAlign: "center",
          color: "#7f8a9d",
          fontSize: 13,
        }}
      >
        © 2026 EmailGuard AI · AI-Powered Cybersecurity
      </footer>
    </div>
  );
}

const navStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
  fontSize: 14,
  alignSelf: "center",
};

const buttonStyle = {
  display: "inline-block",
  background: "#12c9e8",
  color: "#071018",
  padding: "12px 18px",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  display: "inline-block",
  background: "#1a2230",
  color: "#f8fafc",
  padding: "12px 18px",
  borderRadius: 8,
  border: "1px solid #364152",
  textDecoration: "none",
  fontWeight: "bold",
};

const miniCardStyle = {
  padding: 16,
  border: "1px solid #2b3748",
  borderRadius: 12,
  background: "#0d131f",
  fontWeight: "bold",
};

const miniTextStyle = {
  color: "#a7b0c0",
  fontSize: 12,
  marginBottom: 0,
};

const featureCardStyle = {
  background: "#111722",
  border: "1px solid #293445",
  borderRadius: 15,
  padding: 24,
  minHeight: 155,
};