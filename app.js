const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).json({
    slackUsername: "diac",
    backend: true,
    age: 12,
    bio: "This should be a description of me... I guess.",
  });
});

app.post("/", (req, res) => {
  let result = "0";
  let operation_type;
  let x;
  let y;
  const { operation_type: op, x: nx, y: ny } = req.body;
  // if (op.split(" ").length > 1) {
  if (op.includes("add") || op.includes("+")) {
    operation_type = "addition";
  } else if (op.includes("sub") || op.includes("minus") || op.includes("-")) {
    operation_type = "subtraction";
  } else if (
    op.includes("multiply") ||
    op.includes("times") ||
    op.includes("*") ||
    op.includes("x")
  ) {
    operation_type = "multiplication";
  }
  // }

  x = parseInt(nx);
  y = parseInt(ny);
  switch (operation_type) {
    case "addition":
      result = x + y;
      break;
    case "subtraction":
      result = x - y;
      break;
    case "multiplication":
      result = x * y;
      break;
    default:
      result = result;
      break;
  }
  return res
    .status(200)
    .json({ slackUsername: "diac", result, operation_type });
});

app.listen(process.env.PORT || 8000, () => console.log("Server Up"));
