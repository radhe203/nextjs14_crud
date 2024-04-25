import mongoose, { connection } from "mongoose";

async function connect(){
    try {

        mongoose.connect(process.env.MONGO_URL as string)

        connection.on('connected', () => {
            console.log('MongoDB connected')
        })

        connection.on('error', (err) => {
            console.log(err)
            process.exit(1)
        })

        
    } catch (error) {
        console.log(error)
        console.log('Error connecting to MongoDB')
    }
}

export default connect