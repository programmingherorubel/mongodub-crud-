const express = require('express')
const cors =  require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


//user name mdrubel
//Password g9SnII44Yz3oCo8n

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://rubel_rubel:P9uxnOr44uCWVGlb@cluster0.tdolxqi.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("userCollection");
    const databaseCollection = database.collection("users");


    app.get('/users',async(req,res)=>{
      const cursor = databaseCollection.find({})
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/users/:id',async(req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)}
      const result = await databaseCollection.findOne(query)
      res.send(result)
    })

    app.post('/users',async(req,res)=>{
      const user = req.body 
      console.log({user})
      const result = await databaseCollection.insertOne(user)
      res.send(result)
    })


    app.delete('/users/:id',async(req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)}
      const result = await databaseCollection.deleteOne(query)
      res.send(result)
    })

    app.put('/users/:id',async(req,res)=>{
      const id = req.params.id 
      const update = req.body;
      const filterUser = {_id:new ObjectId(id)}
      const options = {upsert:true}
      const updateUser = {
        $set:{
          name:update.name,
          email:update.email,
          phoneNumber:update.phoneNumber
        }
      }
      const result = await databaseCollection.updateOne(filterUser,updateUser,options)
      res.send(result)
    })

    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('server is running...')
})


app.listen(port,()=>{
    console.log(`server is runnning port number ${port}`)
})

