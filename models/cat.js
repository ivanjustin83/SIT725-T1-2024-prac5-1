const { connectToDB, client } = require('../dbconnection');

class FormDataModel {
    constructor(title, colour, link, description) {
        this.title = title;
        this.colour = colour;
        this.link = link;
        this.description = description;
    }

    async saveToDatabase() {
        try {
            await connectToDB();
            const db = client.db("test");
            const coll = db.collection("Cat");
            const result = await coll.insertOne(this);
            console.log("Data has been successfully inserted.");
        } finally {
            await client.close();
        }
    }
}

module.exports = FormDataModel;