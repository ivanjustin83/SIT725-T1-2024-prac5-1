const express = require("express");
const bodyParser = require ('body-parser');
const { connectToDB, client } = require('./dbconnection');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let projectsRoute= require('./routers/routes')

app.get('/', (req, res) => {
    res.render('index.html')
})

app.use('/api/',projectsRoute);

connectToDB();

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to : " + port);
})
