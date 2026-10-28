export default function Loading() {
  return (
    <main id="main-content" className="page-shell">
      <div className="loading-state" role="status">
        <span className="spinner" aria-hidden="true" />
        Loading…
      </div>
    </main>
  );
}
