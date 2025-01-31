import jwt from "jsonwebtoken";

// Middleware de autenticación
export const auth = (req, res, next) => {
  const getToken = req.headers.authorization;

  if (!getToken) {
    return res.status(403).send("Token no proporcionado");
  }

  const token = getToken.split(" ")[1];

  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      return res.status(403).send("Token inválido");
    }
    req.user = { id: payload.id, email: payload.email };
    next();
  });
};
