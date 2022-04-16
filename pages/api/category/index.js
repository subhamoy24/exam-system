const db = require('../../../models');

export default async function(req,  res){
  if(req.method != "GET"){
    return res.status(405).end('Method Not Allowed');
  }

  const res1 = await db.QuestionCategory.findAll()
    
  res.json(res1)
}