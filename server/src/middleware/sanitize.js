import xss from "xss";

function clean(value) {
  if (typeof value === "string") {
    return xss(value, { whiteList: {}, stripIgnoreTag: true, stripIgnoreTagBody: ["script"] });
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = clean(value[i]);
    return value;
  }
  if (value && typeof value === "object") {
    for (const k of Object.keys(value)) value[k] = clean(value[k]);
    return value;
  }
  return value;
}

export const sanitizeBody = (req, _res, next) => { if (req.body) clean(req.body); next(); };
export const sanitizeQuery = (req, _res, next) => { if (req.query) clean(req.query); next(); };
