import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container py-16 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">404 Page not found</h1>
      <p className="text-neutral-600 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary">Back Home</Link>
    </section>
  );
}
