import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Home",
        message: "welcome to express server with nunjucks"
    })
})


export default router