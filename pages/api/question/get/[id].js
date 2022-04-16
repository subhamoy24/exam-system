
const db = require('../../../../models');

export default async function handler(req, res){
  if(req.method != "GET"){
    return res.status(405).end('Method Not Allowed');
  }
  const { id } = req.query;
  console.log(id);
  console.log(req.query);

  const res1 = await db.Question.findOne({where: {id: id}, include: [{model: db.Answer}, {model: db.Option, attributes: ['id', 'value', 'correct']}], attributes: {exclude: ['createdAt', 'updatedAt']}})
  console.log(res1)
  var formatted_res = {}
  formatted_res.question = res1.description;
  formatted_res.categoryId = res1.QuestionCategoryId;
  formatted_res.explanation = res1.Answer.explanation;
  formatted_res.options = res1.Options;
  res.status(200).json(formatted_res);
}