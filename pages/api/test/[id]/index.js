const db = require('../../../../models');

export default async function(req, res){
  const { id } = req.query;

  const res1 = await db.Test.findOne({ where: {id: id}, include: [db.Question]});

  res.status(200).json(res1)
}
