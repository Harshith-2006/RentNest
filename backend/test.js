const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://akiharshith_db_user:Hari2834o@cluster0.phbve4l.mongodb.net/RentNest?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected Successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

test();