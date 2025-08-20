import sanitize from "mongo-sanitize";

// Mutates objects in place and removes Mongo operator keys ($, .)
function scrubInPlace(obj) {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) { obj.forEach(scrubInPlace); return; }

  for (const key of Object.keys(obj)) {
    // Drop dangerous keys
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
      continue;
    }
    const val = obj[key];
    if (typeof val === "object") {
      scrubInPlace(val);
    } else if (typeof val === "string") {
      obj[key] = sanitize(val);
    }
  }
}

export const mongoSanitizeAll = (req, _res, next) => {
    // Sanitize body, params, and query
  if (req.body) scrubInPlace(req.body);
  if (req.params) scrubInPlace(req.params);
  if (req.query) scrubInPlace(req.query);
  next();
};
