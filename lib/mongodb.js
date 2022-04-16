import { MongoClient } from "mongodb";
const mongoUri = "mongodb+srv://subha:Subhamoy$24@cluster0.ybtvp.mongodb.net/nextjs-exam?retryWrites=true&w=majority";
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect(){
  await client.connect();
  const db = client.db("nextjs-exam");
  console.log(db);
  return { db, client }
}

export { connect };
