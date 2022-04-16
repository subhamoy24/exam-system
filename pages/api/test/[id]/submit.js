const db = require('../../../../models');

export default async function(req, res){
  const { id } = req.query;
  const { time } = req.body;
  const record = await db.TestAttempt.findOne({ where: {id: id} });

  record.submitted = true;
  await record.save();

  res.status(200).json("ok")
}
