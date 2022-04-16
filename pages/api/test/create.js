const db = require('../../../models');

export default async function(req, res){
  const {
    name: name,
    duration: duration,
    description: description
  } = req.body;

  const test = {
    name: name,
    duration: duration,
    description: description
  }

  const res1 = await db.Test.create(test);

  res.status(200).json(res1)
}
