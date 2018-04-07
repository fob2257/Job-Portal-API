module.exports = {
  async create(req, res) {
    try {
      const { title } = req.body;
      let { CompanyId } = req.body;
      CompanyId = Number.parseInt(CompanyId, 10);
      const newJob = await req.db.Job.create({
        title,
        CompanyId,
      });
      res.status(201).json(newJob);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async find(req, res) {
    try {
      const { count, rows } = await req.db.Job.findAndCount({
        include: [
          {
            model: req.db.Candidate,
          },
        ],
      });
      res.json({ count, rows });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
