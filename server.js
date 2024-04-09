var express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express();

const bodyParser = require ('body-parser');

app.use(bodyParser.json())

const uri = "mongodb+srv://SIT774_Example:it8_P-rscyza99h@cluster0.nata69c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.static(__dirname + '/public'));
// app.get('/', (req, res) => {
//     res.redirect(req.baseUrl + '/public/index.html');
//   });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.html')
})

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}

async function getAllCards() {
    try {
        await client.connect();
        const db = client.db("test");
        const coll = db.collection("Cat");
        const cursor = coll.find();
        results = await cursor.toArray();
        console.log(results);
        return results;
    } finally {
        await results;
    }
}

app.get('/api/cats', async (req, res) => {
    const cards = await getAllCards();

    const html = `${JSON.stringify(cards)}`

    res.send(html);
})

async function postCards(obj_req) {
    try {
        await client.connect();
        const db = client.db("test");
        const coll = db.collection("Cat");
        const result = await coll.insertOne(obj_req);
        console.log(result.insertedIds);
      } finally {
        await client.close();
      }
}

app.get('/api/cards', async (req, res) => {
    // getAllCards((err, result) => {
    //     if (!err) {
    //         // res.json({ statusCode: 200, data: cardList, message: "Success" })
    //         res
    //     }
    // })
    const cards = await getAllCards();
    res.send(JSON.stringify(cards))
})

// app.get('/api/cards', (req, res) => {
//     getAllCards();
// })

app.post('/api/postcards', (req, res) => {
    postCards(req.body);
})

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to : " + port);
})
