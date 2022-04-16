
const db = require('../../../../models');

export default async function handler(req, res){
  if(req.method != "PUT"){
    return res.status(405).end('Method Not Allowed');
  }
  const { id } = req.query;
  
  const {
    question: question,
    options: [
            { id: id1, value: value1, correct: correct1 },
            { id: id2, value: value2, correct: correct2 },
            { id: id3, value: value3, correct: correct3 },
            { id: id4, value: value4, correct: correct4 }],
    explanation:  explanation,
    categoryId: categoryId
  } = req.body;

  const options = [
    { id: id1, value: value1, correct: correct1 },
    { id: id2, value: value2, correct: correct2 },
    { id: id3, value: value3, correct: correct3 },
    { id: id4, value: value4, correct: correct4 }
  ]

  //const answer = { explanation: explanation };
  const question1 = await db.Question.update(
    { description: question, questionCategoryId: categoryId },
    { where: { id: id } }
  );

  const answer1 = await db.Answer.update(
    { explanation: explanation},
    { where: { questionId: id}}
  );

  for(const op of options){
    const optionId = op.id;
    delete op['id'];
    const ans = await db.Option.update(op, { where: { id: optionId } });
  }

  res.status(200).end("updated")
}