module.exports = {
  async create(req, res) {
    try {
      const { name, city, address } = req.body;
      let { UserId } = req.body;
      UserId = (UserId) ? UserId : req.decodedToken.id;
      const newCompany = await req.db.Company.create({
        name,
        city,
        address,
        UserId,
      });
      res.status(201).json(newCompany);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async find(req, res) {
    try {
      const { count, rows } = await req.db.Company.findAndCount({
        include: [
          {
            model: req.db.Job,
          },
        ],
      });
      res.json({ count, rows });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async findOne(req, res) {
    try {
      const company = await req.db.Company.findById(req.params.id);
      if (!company) {
        return res.status(404).send();
      }
      res.json(company);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async delete(req, res) {
    try {
      const result = await req.db.Company.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (result === 0) {
        return res.status(404).send();
      }
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async update(req, res) {
    try {
      let company = await req.db.Company.count({
        where: {
          id: req.params.id,
        },
      });
      if (company === 0) {
        return res.status(404).send();
      }
      const toUpdate = { name, city, address } = req.body;
      company = await req.db.Company.update(toUpdate, {
        where: {
          id: req.params.id,
        },
      });
      company = await req.db.Company.findById(req.params.id);
      res.json(company);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
