import express from "express"
import nunjucks from "nunjucks"
import morgan from "morgan"

import indexRouter from "./routes/index.js"
import storyRouter from "./routes/story.js"

const app = express()

app.use(morgan("dev"))
app.use(express.static("public"))
app.use("/", indexRouter)
app.use("/story", storyRouter)

nunjucks.configure("views", {
    autoescape: true,
    express: app
})

function notFound(req, res, next) {
    res.status(404)
    res.send("404 - Not Found")
}

app.use(notFound)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})