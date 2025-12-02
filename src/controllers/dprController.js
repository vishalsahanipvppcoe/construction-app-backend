const DPR = require("../models/dpr");

exports.createDpr = async (req, res) => {
  try {
    const { projectId, date, workDescription, weather, workerCount } = req.body;
    if (!projectId || !date) return res.status(400).json({ message: "projectId and date required" });

    const dpr = await DPR.create({
      projectId,
      userId: req.user.id,
      date,
      workDescription,
      weather,
      workerCount
    });

    res.status(201).json(dpr);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getDprs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.projectId) filter.projectId = req.query.projectId;
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.date) filter.date = req.query.date;

    const dprs = await DPR.findAll({ where: filter, limit: req.query.limit ? parseInt(req.query.limit) : 100 });
    res.json(dprs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getDpr = async (req, res) => {
  try {
    const dpr = await DPR.findByPk(req.params.id);
    if (!dpr) return res.status(404).json({ message: "Not found" });
    res.json(dpr);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateDpr = async (req, res) => {
  try {
    const dpr = await DPR.findByPk(req.params.id);
    if (!dpr) return res.status(404).json({ message: "Not found" });

    // allow only author or admin/manager
    if (req.user.role !== "admin" && req.user.role !== "manager" && req.user.id !== dpr.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await dpr.update(req.body);
    res.json({ message: "updated", dpr });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteDpr = async (req, res) => {
  try {
    const dpr = await DPR.findByPk(req.params.id);
    if (!dpr) return res.status(404).json({ message: "Not found" });
    if (req.user.role !== "admin" && req.user.id !== dpr.userId) return res.status(403).json({ message: "Forbidden" });
    await dpr.destroy();
    res.json({ message: "deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
