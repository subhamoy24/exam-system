const db = require('../../../models');
const bcrypt = require('bcrypt');

export default async function(req, res){
  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    retypePassword: retypePassword
  } = req.body;

  if(password !== retypePassword){
    res.status(200).json("please match the password");
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const userParams = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: passwordHash
  }
  
  try{
    const m = await db.User.create(userParams);

    if(m){
      res.status(200).json({ success: 1 })
    }else{
      res.status(200).json({ success: 0 })
    }

  }catch(err){
    res.status(200).json({ success: 0 })
  }
}
