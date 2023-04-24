let express = require("express");
let http = require("http");
let path = require("path");
let nodemailer = require("nodemailer");

let app = express();
let server = http.Server(app);
let port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../index.html")));

// Routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/send_email", (req, res) => {
  let from = "lucassouzaprofissional16@gmail.com";
  let to = req.body.to;
  let subject = req.body.subject;
  let message = req.body.message;

  "Email do remetente: " +
    req.body.from +
    "\n\n" +
    "Assunto: " +
    req.body.subject +
    "\n\n" +
    "Mensagem: " +
    req.body.message;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lucassouzaprofissional16@gmail.com",
      pass: "ygbodiolptycejux",
    },
  });
  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
    res.redirect("/");
  });
});

// initialize routes server
server.listen(port, () => {
  console.log("Starting server on port: " + port);
});
