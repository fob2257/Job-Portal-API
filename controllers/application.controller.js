module.exports = {
  async create(req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      let { JobId } = req.body;
      JobId = Number.parseInt(JobId, 10);
      const candidate = await req.db.Candidate.create({
        firstName,
        lastName,
        email,
      });
      JobId = Number.parseInt(JobId, 10);
      const application = await req.db.Application.create({
        JobId,
        CandidateId: candidate.id,
      });
      res.status(201).json(application);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
