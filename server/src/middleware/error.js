export const notFound = (_req, res) => res.status(404).json({ message: "Not Found" });

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
};
