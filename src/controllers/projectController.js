const Project = require("../models/project");
const User = require("../models/user");

exports.createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });

    const project = await Project.create({
      name, description, startDate, endDate, status, createdBy: req.user.id
    });

    res.status(201).json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProjects = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const where = status ? { status } : {};
    const projects = await Project.findAll({
      where,
      include: [{ model: User, as: "creator", attributes: ["id","name","email"] }],
      limit: parseInt(limit),
      offset: (page-1)*limit
    });
    res.json(projects);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{ model: User, as: "creator", attributes: ["id","name","email"] }]
    });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    // allow only creator or admin/manager (manager allowed globally by role check in route)
    if (req.user.role !== "admin" && req.user.id !== project.createdBy && req.user.role !== "manager") {
      return res.status(403).json({ message: "Forbidden" });
    }
    await project.update(req.body);
    res.json({ message: "updated", project });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    if (req.user.role !== "admin" && req.user.id !== project.createdBy) return res.status(403).json({ message: "Forbidden" });
    await project.destroy();
    res.json({ message: "deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
