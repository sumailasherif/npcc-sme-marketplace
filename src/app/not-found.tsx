export default function NotFound() {
  return (
    <main
      className="wrap"
      style={{
        minHeight: "82svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 14,
      }}
    >
      <span
        className="logo"
        style={{ fontSize: "1.1rem", marginBottom: 4 }}
      >
        bazar
      </span>
      <h1 className="t-h1">This page or shop link wasn&apos;t found</h1>
      <p style={{ color: "var(--muted)", maxWidth: "44ch" }}>
        Check the spelling of the shop link, browse verified Mauritian
        businesses on the marketplace, or create your own free shop.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
        <a href="/" className="btn btn-black">
          Browse Marketplace
        </a>
        <a href="/onboarding" className="btn btn-lime">
          Create a Shop
        </a>
      </div>
    </main>
  );
}
