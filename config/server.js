const express = require("express")
const path = require("path")
const app = express()
const root = path.join(__dirname, "../", "build")

app.use(express.static(root))
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept",
    )
    next()
})
app.get(
    ("*",
    function (_req, res) {
        res.sendFile("index.html", { root }, function (error) {
            if (error) {
                res.status(500).send(error)
            }
        })
    }),
)
const port = process.env.PORT || 4000
const env = (process.env.NODE_ENV = "production")
app.listen(port, () =>
    console.info(`BP React listening on port ${port}! Running on ${env}!`),
)
