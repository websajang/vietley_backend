import sgMail from '@sendgrid/mail'
/*********************************************************Send email to register new user***************************************************************************** */

export const emailRegister1 = async (data) => {
    const { email, name, token } = data;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: email, // Change to your recipient
        from: 'notreply@vietley.com', // Change to your verified sender
        subject: 'Vietley user registration',
        text: 'Verify your email.',
        html: `<strong>Hello ${name}, you are on a single click to verify your Vietley account.</strong>
        <br>
        <p>Click on the following link: <a href="${process.env.FRONTEND_URL}/confirm/${token}">Verify email</a></p>
        `
        ,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

/**************************************************************************************************************************************************************************/

/**********************************************************Send email to set new password when forgotten*******************************************************************/

export const emailForgotPassword1 = async (data) => {
    const { email, name, token } = data;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: email, // Change to your recipient
        from: 'notreply@vietley.com', // Change to your verified sender
        subject: 'Forgot password',
        text: 'Set your new password.',
        html: `<strong>Hello ${name}, you are on a single step to change your password.</strong>
        <br>
        <p>Click on the following link: <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Change your password</a></p>
        `
        ,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}


/******************************************************************************************************************************************************* */