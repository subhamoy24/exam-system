const db = require('../../../../models');

export default async function(req, res){
  const { id } = req.query;
  const { questionIds } = req.body;
  const q = questionIds.join(", ");
  const query = `delete from TestQuestions where testId=${id} and questionId not in (${q})`;
  const query1 = `select questionId from TestQuestions where testId=${id}`;

  await db.sequelize.query(query);

  db.sequelize.query(query1, { type: db.sequelize.QueryTypes.SELECT } ).then(
    async (ids) => {
      ids = ids.map(i => i.id)
      for(const item of questionIds){
        if(!ids.includes(item)){
          await db.TestQuestion.create({questionId: item, testId: id})
        }
      }
    }
  )

  const res1 = await db.Test.findOne({ where: { id: id } }, { include: [db.Question] })

  res.status(200).json(res1)
}
