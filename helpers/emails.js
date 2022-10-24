import nodemailer from 'nodemailer'


/*********************************************************Send email to register new user***************************************************************************** */

export const emailRegister = async (data) => {
    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    /** Mail information **/

    const info = await transport.sendMail({
        from: '"theWheel - tracker" <accounts@thewheel.com> ',
        to: email,
        subject: "the Wheel - Confirm your account",
        text: "Confirm your account on the Wheel",
        html: ` <p>Hello: ${name}</p>
        <p>Verify your email on the next link:</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Verify email</a>
        
        
        
        `
    })
}

/**************************************************************************************************************************************************************************/

/**********************************************************Send email to set new password when forgotten*******************************************************************/

export const emailForgotPassword = async (data) => {
    const { email, name, token } = data;


    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    /** Mail information **/

    const info = await transport.sendMail({
        from: '"theWheel - tracker" <accounts@thewheel.com> ',
        to: email,
        subject: "the Wheel - Change your password",
        text: "Confirm your account on the Wheel",
        html: ` <p>Hello: ${name}</p>
        <p>Click to change your password:</p>
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Change your password</a>
        
        
        
        `
    })
}

/******************************************************************************************************************************************************* */