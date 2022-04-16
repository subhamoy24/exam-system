const db = require('../../../../models');

export default async function(req, res){
  const { id } = req.query;
  const { questionId: questionId, userId: userId, response: response} = req.body;

  console.log(id)

  await db.Attempt.findOrCreate({ where: { userId: userId, testAttemptId: id, questionId: questionId } }).then(
    async(record) =>{
      record[0].response = response
      await record[0].save();
    }
  )

  res.status(200).json("ok")
}
