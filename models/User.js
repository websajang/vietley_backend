import mongoose from 'mongoose'
/** Package for hashing passwords **/
import bcrypt from 'bcrypt';

/** Create the schema for the user on the database **/
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

/** To hash passwords I am going to implement a middleware that will run before save the new register in the database.
 * This function have the object data that will be saved in database.
 * 
 * .this will reference the object in @user . In this case if we were about to use an arrow function, .this will not
 * refere to the object we want to **/
userSchema.pre('save', async function (next) {
    /** Avoid change the hash when the user change some user information like email or name.  **/
    if (!this.isModified('password')) {
        next();
    }

    /** this.password holds the user password passed in @user . So I hash it by using the funtion bcrypt.hash and pass the password and
     * the salt and return it to this.password, so it will be sent hashed to database **/

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});





/** Create function to verify password **/
/** @passwordForm is the password the user is writting on the form and this.password is the instance in database **/
userSchema.methods.verifyPassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}


/** Mount the model and export it **/

const User = mongoose.model('User', userSchema);
export default User;