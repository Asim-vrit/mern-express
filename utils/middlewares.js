const authMiddleware = (request, response, next) => {
  if (!request.headers.authorization) {
    response.status(401).json({ error: "Authorization header is required" });
    return;
  }
  const token = request.headers.authorization
    ?.split("Bearer")[1]
    ?.replace(" ", "");

  if (token !== "alkjdvhgasbdasdjnbasdhb23hi8g4uu2c") {
    response.status(401).json({ error: "Invalid token, login again!!" });
    return;
  }
  next();
};

const logMiddleware = (request, response, next) => {
  console.log(new Date(), request.url);
  next();
};

module.exports = {
  authMiddleware,
  logMiddleware,
};
