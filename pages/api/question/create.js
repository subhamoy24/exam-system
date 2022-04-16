const models = require('../../../models');

export default async function(req,  res){
  console.log(req.body)
  if(req.method != "POST"){
    return res.status(405).end('Method Not Allowed');
  }
  var Question = models.Question
  const {
    question: question,
    options: [ 
      { value: value1, correct: correct1 },
      { value: value2, correct: correct2 },
      { value: value3, correct: correct3 },
      { value: value4, correct: correct4 } 
    ],
    explanation: explanation,
    categoryId: categoryId
  } = req.body;

  const options = [
    { value: value1, correct: correct1 },
    { value: value2, correct: correct2 },
    { value: value3, correct: correct3 },
    { value: value4, correct: correct4 }
  ]

  const answer = { explanation: explanation };

  const question_params = { description: question, questionCategoryId: categoryId, Options: options, Answer: answer };

  const res1 = await Question.create(question_params,
    {include:  [models.Answer, models.Option] }
  );

  console.log(req.body)
  res.json({res1})
}