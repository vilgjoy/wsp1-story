import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()
const rootDir = process.cwd()
const storyDataPath = path.join(rootDir, 'data', 'chapter-1.json')
const storyData = JSON.parse(fs.readFileSync(storyDataPath, 'utf8'))

router.get("/:id", (req, res, next) => {
    const storyId = req.params.id
    const storyNode = storyData[storyId]

    if (!storyNode) {
        
        return next()
    }
    const formattedText = storyNode.text.replace(/\n/g, '<br>')

    res.render("story.njk", {
        title: storyNode.title,
        text: formattedText,
        choices: storyNode.choices
    })
})

export default router