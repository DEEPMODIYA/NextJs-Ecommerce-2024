import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const connectToDB = async () => {

    const connectionUrl = "mongodb+srv://modiyadeep:12342024@cluster0.fjfams8.mongodb.net/";

    mongoose.connect(connectionUrl,configOptions)
        .then(() => console.log("Ecommerce database connected successfully!!"))
        .catch((err) => 
        console.log(`Getting error from DB connection ${err.message}`)
        );
};

export default connectToDB;
