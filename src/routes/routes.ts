import { URLController } from "../controller/URLController";
import { Router } from "express";

const router = Router();
const urlController = new URLController();

router.get("/", (req, res) => {
    res.json({ message: "API Funcionando!"});
});

router.get("/:hash", urlController.redirect)

router.post('/shorten', urlController.shorten)

export default router;