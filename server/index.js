const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 3006

app.use(
    cors({
        origin: "*",
    })
)

app.use(bodyParser.json())

const db = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
    { id: 4, title: "Post 4" },
    { id: 5, title: "Post 5" },
]

app.get("/api/posts", (req, res) => {
    res.status(200).json(db)
})

app.post("/api/posts", (req, res) => {
    const { title } = req.body
    let latestId = db[db.length - 1].id
    db.push({
        id: ++latestId,
        title,
    })
    res.status(200).json({ id, title })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
