export default function Result({
  children,
  detail,
  label = 'Result',
}: {
  children: React.ReactNode;
  detail?: string;
  label?: string;
}) {
  return (
    <div className="result" role="status">
      <p className="result-label">{label}</p>
      <p className="result-value">{children}</p>
      {detail && <p className="result-detail">{detail}</p>}
    </div>
  );
}
