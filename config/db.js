/** Import mongoose ORM package for mongoDB connections **/
import mongoose from 'mongoose';

/** Connection to the database. Normally mongoDB ends processes with process.exit(0),
 Im going to force process.exit(1) executing @finish to exit any other processes going on if some error happens
 on connection. This is going to happen in syncronous mode, so any operations happening on asyncronous
 functions will end on that moment.
 
 Saving connection url with sensitive data on environment variables file and reference it
 with @MONGO_URI
 **/
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB connected on: ${url}`);

    } catch (error) {
        console.log(`error: ${error.message}`);
        const finish = process.exit(1);
        finish();
    }
};

export default connectDB;