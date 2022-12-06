const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res, next) => {
    res.render("index");
  });

app.post("/scan", (req, res) => {
    const input_text = req.body.text;
    qrcode.toDataURL(input_text, (err, src) => {
        if (err) res.send("server error!!");
        res.render("scan", {
            qr_code: src,
        });
    });
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server connected at port ${PORT}`)
})