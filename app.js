const http = require("http");

const sever = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  //   res.writeHead(200);
  res.end(
    JSON.stringify({
      slackUsername: "diac",
      backend: true,
      age: 12,
      bio: "This should be a description of me... I guess",
    })
  );
});

sever.listen(process.env.PORT || 8000);
