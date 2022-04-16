const db = require('../../../models');
const bcrypt = require('bcrypt');

export default async function(req, res){
  const {
    email: email,
    password: password,
  } = req.body;
  
  try{
    const m = await db.User.findOne({ where: { email: email }});

    if(m){
      if (bcrypt.compareSync(password, m.password)){
        res.status(200).json({ success: 1, user: { id: m.id, email: m.email }});
      }else{
        res.status(200).json({ success: 0, msg: "incorrect password" });
      }
    }else{
      res.status(200).json({ success: 0, msg: "please signup" });
    }

  }catch(err){
    res.status(200).json({ success: 0, msg: "there is some error" })
  }
}
