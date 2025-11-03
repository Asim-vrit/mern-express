const express = require("express");
const app = express();

function calculator(operation, a, b) {
  if (operation === "add") {
    return { result: a + b, isSuccess: true };
  } else if (operation === "sub") {
    return { result: a + b, isSuccess: true };
  } else {
    throw new Error("the operation or value are not processable");
  }
}

app.get("/", (request, response) => {
  response.json({ result: "hi i am active" });
});

app.get("/calculate", (request, response) => {
  try {
    const queryParams = request.query;
    if (!queryParams.operation) {
      response.status(400).json({ result: "Please send an operation" });
      return;
    }
    if (!queryParams.a && !queryParams.b) {
      response
        .status(400)
        .json({ result: "Please a & b both values are required" });
      return;
    }
    const value1 = parseInt(queryParams.a);
    const value2 = parseInt(queryParams.b);
    if (isNaN(value1) || isNaN(value2)) {
      response
        .status(400)
        .json({ result: "Please a & b must both be numbers " });
      return;
    }
    const result = calculator(queryParams.operation, value1, value2);
    response
      .status(result.isSuccess ? 200 : 400)
      .json({ result: result.result });
  } catch (error) {
    response.status(500).json({
      result: "Something went wrong",
      error: typeof error.message === "string" ? error.message : undefined,
    });
  }
});

app.listen(3000, () => {
  console.log("Hi! i am express app and i am on 3000 port");
});
