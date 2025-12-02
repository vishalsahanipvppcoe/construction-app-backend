const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/dprController");

router.post("/", auth(["admin","manager","worker"]), controller.createDpr);
router.get("/", auth(), controller.getDprs);
router.get("/:id", auth(), controller.getDpr);
router.put("/:id", auth(["admin","manager"]), controller.updateDpr);
router.delete("/:id", auth(["admin"]), controller.deleteDpr);

module.exports = router;
