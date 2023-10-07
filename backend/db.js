const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log('MongoDB connected: ' + conn.connection.host)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectDB

//kada se inserta. zapamti id i izbrisi taj row za 96 sati ili kad izadu ovi. ugl ne pamtis sobe nego code samo i onda ako postoji kod na klijentu prilikom joina cekas