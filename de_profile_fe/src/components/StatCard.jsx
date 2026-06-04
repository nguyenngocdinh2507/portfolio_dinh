export function StatCard({ label, value, trend, icon: Icon }) {
  return (
    <article className="stat-card">
      <div className="stat-card-icon">{Icon ? <Icon size={20} aria-hidden="true" /> : null}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {trend ? <span>{trend}</span> : null}
      </div>
    </article>
  );
}
