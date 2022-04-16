const db = require('../../../models');

export default async function(req, res){
  const {
    name: name,
    description: description
  } = req.body;

  const QuestionCategory = db.QuestionCategory
  const category = {
    name,
    description
  }

  const res1 = await QuestionCategory.create(category);

  res.json({res1})
}
