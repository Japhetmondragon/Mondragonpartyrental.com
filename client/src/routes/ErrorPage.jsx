import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();
  let title = "Something went wrong";
  let message = "Please refresh or go back home.";

  if (isRouteErrorResponse(err)) {
    title = `${err.status} ${err.statusText}`;
    message = err.data?.message || message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return (
    <section className="container py-16 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
      <p className="text-neutral-600 mb-6">{message}</p>
      <Link to="/" className="btn btn-primary">Back Home</Link>
    </section>
  );
}
