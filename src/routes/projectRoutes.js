const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/projectController");

router.post("/", auth(["admin","manager"]), controller.createProject);
router.get("/", auth(), controller.getProjects);
router.get("/:id", auth(), controller.getProject);
router.put("/:id", auth(["admin","manager"]), controller.updateProject);
router.delete("/:id", auth(["admin"]), controller.deleteProject);

module.exports = router;
