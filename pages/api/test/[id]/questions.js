const db = require('../../../../models');

export default async function(req, res){
  const { id, userId } = req.query;

  const res1 = await db.Test.findOne({ where: {id: id}, include: [{ model: db.Question, include: db.Option}] });
  const [record, created] = await db.TestAttempt.findOrCreate({ where: {testId: id, userId: userId, submitted: false } });
  
  if(created){
    record.timeRemaining = res1.duration;
    await record.save();
  }

 const attempt = await db.Attempt.findAll({where: {testAttemptId: record.id, userId: userId}});

  if(attempt.length === 0){
    for(const r of res1.Questions){
      await db.Attempt.create({testAttemptId: record.id, userId: userId, questionId: r.id,  response: ''})
    }
  }

  const attempts = await db.Attempt.findAll({where: {testAttemptId: record.id, userId: userId}, attributes: ['response'] })
  
  const responses = attempts.map((res) => res.response)

  res.status(200).json({questions: res1.Questions, testAttempt: {timeRemaining: record.timeRemaining, id: record.id}, responses: responses })
}
