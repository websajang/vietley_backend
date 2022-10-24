/** Import JSON web token to hide some information but not sensitive information like passwords because
 * this token can be reversed easily **/
import jwt from 'jsonwebtoken';

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export default generateJWT;