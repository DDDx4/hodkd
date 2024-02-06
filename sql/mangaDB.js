const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/hodkd_db')
}

const mangadbSchema = new mongoose.Schema({
    title:String,
    imagetitle:String,
    synopsis:String,
})

const mangadb = mongoose.model("mangadb",mangadbSchema)

module.exports = mangadb

// savemanga
module.exports.savemanga = async function(model,doc){
    await model.save(doc)
}
