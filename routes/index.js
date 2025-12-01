import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Öppnar fil... Terminalen startad",
        message: "Äventyr T & C v1.0"
    })
})



export default router