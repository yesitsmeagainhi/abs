// pages/404.tsx
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | ABS</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            width: "100%",
            textAlign: "center",
            background: "var(--card, #fff)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            padding: "32px 24px",
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 32 }}>404 — Page not found</h1>
          <p style={{ margin: "12px 0 24px", color: "#555", lineHeight: 1.6 }}>
            The page you’re looking for doesn’t exist or isn’t available yet.
          </p>

          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: 10,
              border: "1px solid #222",
              textDecoration: "none",
              fontWeight: 600,
              transition: "transform .05s ease, box-shadow .2s ease",
              background:
                "linear-gradient(180deg, #111 0%, #000 100%)",
              color: "#fff",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.2) inset, 0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            Return to Home Page
          </Link>
        </div>
      </main>
    </>
  );
}
