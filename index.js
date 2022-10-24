/*** The architecture pattern im going to use is MVC or Model View Controller.It allows to separate the obligations
 * on each part of the code. It enphasizes the logic programming with the presentation. In one file you will find
 * the logic and in other you will find the results. This pattern is not going to improve the performance or security but
 * it will keep the code organiced and easier to mantain. It is going to manage everything related to data, database
 * and CRUD. The model will read the database but not to show the results on screen which will be mananged by
 * the VIEW. the VIEW will manage everything that the user will see on screen(HTML). The MODEL will consult a database
 * but is th VIEW the one that will show the results, in this case REACT will be the VIEW.
 * 
 * The CONTROLLER is the one that will communicate MODEL and VIEW. Before the MODEL consults the database the CONTROLLER
 * is going to call it, once the MODEL consult the database, is the CONTROLLER whos going to communicate to the VIEW the data
 * for showing.
 * 
 * The ROUTER is on charge or register all URL`s or Endpoints of this application. If the user access a URL, the ROUTER have the
 * indications to communicate with a specific CONTROLLER, this CONTROLLER knows which MODEL is going to call and in which
 * VIEW is going to be executed.
 *  ***/

/** CORS package added to allow send api data from one domain to other */
import cors from 'cors'
/** Import express package. section: EXPRESS **/
import express from 'express';
/** import dependency for environment variables managing file: .env **/
import dotenv from 'dotenv'
/** Import database file with mongoose. section: MONGODB **/
import connectDB from './config/db.js';
/** Imported for /api/users. section:ROUTING **/
import userRouter from './routes/userRoutes.js'
/** Imported for /api/tickers. section:ROUTING **/
import tickerRouter from './routes/tickerRoutes.js'
/** Imported for /api/entries. section:ROUTING **/
import entryRouter from './routes/entryRoutes.js'
/** Imported for /api/stock-entries. section:ROUTING **/
import stockEntryRouter from './routes/stockEntryRoutes.js'

/**************** DOTENV ********************/
dotenv.config();
/*********************************************/



/**************** EXPRESS ********************/
/** Execute the function with @app */

const app = express();

/** Ability to process JSON information**/
app.use(express.json())

/** Running on server and Saving port conecction in environment variables @PORT ,
if it doesnt exist will conect on port 4000 **/
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

/*********************************************/

/**************** CORS ********************/

/** Allowed domains **/
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            /** Access accepted **/
            callback(null, true);
        } else {
            /** Access denied **/
            callback(new Error('CORS error'));
        }
    }
}
/** Very important to execute it after execute express() in @app or its not going to work **/
app.use(cors(corsOptions))


/*********************************************/


/**************** ROUTING ********************/
/** .use will support GET POST PUT PATCH and DELETE. In here I choose a route, and add
 * what will happen @useRouter when the user enters to this url **/
app.use('/api/users', userRouter);
app.use('/api/tickers', tickerRouter);
app.use('/api/entries', entryRouter);
app.use('/api/stock-entries', stockEntryRouter);

/*********************************************/

/**************** MONGODB ********************/
connectDB();
/*********************************************/
