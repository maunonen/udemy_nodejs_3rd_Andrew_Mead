const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name ) => {
    sgMail.send({
        to : email, 
        from : 'santari33@gmail.com', 
        subject : 'Welcme to the up', 
        text : `Welcome to the app ${name}`
        //html : 
    })
}

const sendRemoveUserEmail = (email, name) => {
    sgMail.send({
        to : email, 
        from : 'santari33@gmail.com', 
        subject : 'Thanks you for usinng our app', 
        text : `${name} your account was succefully removed`
    })
}

module.exports = { sendWelcomeEmail , sendRemoveUserEmail }
/* sgMail.send({
    to : 'santari33@gmail.com', 
    from : 'santari@gmail.com', 
    subject : 'Test email', 
    text : 'My test email'

}) */