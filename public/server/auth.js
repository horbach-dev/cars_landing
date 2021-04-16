const amoAuth = require("./integrations/amoCrm/amoAuth");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    return amoAuth(next, req, res)
  } catch (e) {
    res.status(401).json({ message: "Не авторизован", code: 2300 });
  }
};
