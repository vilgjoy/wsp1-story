import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Home",
        message: "welcome to express server with nunjucks"
    })
})



export default router