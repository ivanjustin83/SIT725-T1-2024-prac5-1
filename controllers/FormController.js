const FormDataModel = require('../models/cat')
const { connectToDB, client } = require('../dbconnection');

class formController {
    static async submitNewCat(req, res) {
        const { title, colour, link, description } = req.body

        const formData = new FormDataModel(title, colour, link, description);

        if (await formData.saveToDatabase()) {
            res.send('Form submitted successfully.')
        } else {
            res.send('Form was not submitted successfully');
        }
    }

    static async getCat(req, res) {
        let results = [];

        try {
            await connectToDB();
            const db = client.db("test");
            const coll = db.collection("Cat");
            const cursor = coll.find();
            results = await cursor.toArray();
            console.log(results);
            res.send(results)
        } finally {
            await client.close();
        }
    }

    // static async getCat() {
    //     const cards = await getAllCards();
    //     res.send(JSON.stringify(cards))
    // }
}

module.exports = formController;