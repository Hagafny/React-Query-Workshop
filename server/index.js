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

app.post("/api/posts", async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { title } = req.body

    if (title.toLowerCase() === "stickies") {
        res.status(400)
        res.json({ message: "You cant use Stickies in our posts!" })
        return
    }

    let latestId = db[db.length - 1].id

    const newPost = {
        id: ++latestId,
        title,
    }

    db.push(newPost)
    res.status(200).json(newPost)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
