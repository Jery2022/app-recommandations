import { set, connect } from 'mongoose';

const connectDb = async () => {
    try {
        set("strictQuery", false);
        await connect(process.env.SECRET_URI);
        console.log("MongoDB connecté");
    } catch (error) {
        console.error("Connection to MongoDB failed", error);
        process.exit(1);
    }
};

export default connectDb;
