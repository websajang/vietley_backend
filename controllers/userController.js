/** database Model for users **/
import User from "../models/User.js";
/** Function to generate some unique token to let the user recover the password if lost or forgotten **/
import generateId from "../helpers/generarId.js";
/** Import JSON web token to hide some information but not sensitive information like passwords because
 * this token can be reversed easily **/
import generateJWT from "../helpers/generarJWT.js";
/** To send emails with nodemailer **/
import { emailRegister, emailForgotPassword } from '../helpers/emails.js'
import { emailRegister1, emailForgotPassword1 } from '../helpers/sendgrid.js'


/** Here I am going to create the functionality CONTROLLERS that is going to comunicate ROUTING with MODELS **/

const register = async (req, res) => {
    /** Avoid duplicate registers **/
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
        const error = new Error('User is already registered');
        return res.status(400).json({ msg: error.message });
    }
    /*********************************/

    /** Register new User, this will call the model and execute the middleware there before
     * saving to hash the password. Aso will provide a token. **/
    try {
        const user = new User(req.body);
        user.token = generateId();
        await user.save();

        /** Send confirmation email **/
        emailRegister1({
            email: user.email,
            name: user.name,
            token: user.token,
        })

        res.json({ msg: 'User created succesfully, check your email to confirm the account' });
    } catch (error) {
        console.log(error);
    }
};


/********************************************************************************************************************************************** */

const authentication = async (req, res) => {
    const { email, password } = req.body;
    /** Check if the user exists **/
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('User doesn`t exist.');
        return res.status(404).json({ msg: error.message });
    };

    /** Check if the user is confirmed **/
    if (!user.confirmed) {
        const error = new Error('Your account is not confirmed yet.');
        return res.status(403).json({ msg: error.message });
    };

    /** Check password **/
    /** I need to pass @password so verify method added in User.js have it to compare **/
    if (await user.verifyPassword(password)) {
        /** return only an object with the data I need, not other like password **/
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        })
    } else {
        const error = new Error('Password incorrect.');
        return res.status(403).json({ msg: error.message });
    }

};

/******************************************************************************************************************************************************* */

const confirm = async (req, res) => {

    const { token } = req.params;
    const userConfirm = await User.findOne({ token });
    if (!userConfirm) {
        const error = new Error('Token is not valid.');
        return res.status(403).json({ msg: error.message });
    };

    try {
        userConfirm.confirmed = true;
        userConfirm.token = '';
        await userConfirm.save();
        res.json({ msg: 'User confirmed' })
    } catch (error) {
        console.log(error)
    }
};

/******************************************************************************************************************************************************* */

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
        const error = new Error('The user doesnt exist.');
        return res.status(404).json({ msg: error.message });
    }

    try {
        existUser.token = generateId();
        await existUser.save();

        /** Send email **/
        emailForgotPassword1({
            email: existUser.email,
            name: existUser.name,
            token: existUser.token,
        })

        res.json({ msg: 'Email sent with instructions' })
    } catch (error) {
        console.log(error)
    }

}

/****************************************************************************************************************************************************** */
const verifyToken = async (req, res) => {
    const { token } = req.params;

    const tokenValid = await User.findOne({ token });

    if (tokenValid) {
        res.json({ msg: 'Valid token and the user exists' })
    } else {
        const error = new Error('Token is not valid.');
        return res.status(403).json({ msg: error.message });
    }
};

/********************************************************************************************************************************************************* */

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ token });

    if (user) {
        user.password = password;
        user.token = '';
        try {
            await user.save();
            res.json({ msg: 'Password modified correctly' });
        } catch (error) {
            console.log(error);
        }

    } else {
        const error = new Error('Token is not valid.');
        return res.status(403).json({ msg: error.message });
    }
};
/********************************************************************************************************************************************************** */

const profile = async (req, res) => {
    /** This @user comes from checkAuth.js **/
    const { user } = req;
    res.json(user);
};


/********************************************************************************************************************************************************** */
export {
    register,
    authentication,
    confirm,
    forgotPassword,
    verifyToken,
    newPassword,
    profile,
};