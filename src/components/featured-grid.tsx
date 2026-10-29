import { tools } from '@/lib/tools';
import Link from 'next/link';
import ToolIcon from './tool-icon';

export default function FeaturedGrid() {
  return (
    <div className="tool-grid">
      {tools.map((tool) => (
        <Link href={tool.href} className="tool-link" key={tool.href}>
          <span className="tool-link-icon">
            <ToolIcon name={tool.icon} />
          </span>
          <span>{tool.name}</span>
          <ToolIcon name="chevron" className="tool-chevron" />
        </Link>
      ))}
    </div>
  );
}
