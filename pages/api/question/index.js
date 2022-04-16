const db = require('../../../models');

export default async function(req,  res){
  if(req.method != "GET"){
    return res.status(405).end('Method Not Allowed');
  }

  const res1 = await db.Question.findAll({ include: [db.Answer, db.QuestionCategory, db.Option]})
    
  res.json(res1)
}