import ToolIcon, { type IconName } from './tool-icon';

export default function PageShell({
  title,
  icon,
  children,
}: {
  title: string;
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="page-shell">
      <header className="page-heading">
        <span className="page-icon">
          <ToolIcon name={icon} />
        </span>
        <h1>{title}</h1>
      </header>
      {children}
    </main>
  );
}
