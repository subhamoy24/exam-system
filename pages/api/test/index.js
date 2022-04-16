const db = require('../../../models');

export default async function(req, res){
   
  const res1 = await db.Test.findAll();

  res.status(200).json(res1)
}
