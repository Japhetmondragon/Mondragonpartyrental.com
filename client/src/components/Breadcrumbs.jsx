import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs(){
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  return (
    <nav className="text-sm px-4 py-2" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 items-center">
        <li><Link to="/" className="text-blue-700 underline">Home</Link></li>
        {parts.map((p,i) => (
          <li key={i} className="flex items-center gap-2" aria-current={i===parts.length-1 ? "page" : undefined}>
            <span aria-hidden>›</span>
            {i===parts.length-1 ? <span className="font-medium capitalize">{p}</span> :
              <Link to={"/"+parts.slice(0,i+1).join("/")} className="text-blue-700 underline capitalize">{p}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
