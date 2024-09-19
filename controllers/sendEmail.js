const nodemailer = require('nodemailer');

const sendEmailE = async (req, res) => {
    const testAccount = await nodemailer.createTestAccount;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: '"Rammal" <mohammad.rammal@hotmail.com>',
        to: 'mohammad.rammal@hotmail.com',
        subject: 'Hello',
        html: '<h2> Test Email </h2>',
    });

    res.json(info);
};

//////////////////////////////////////////////////////////////////////////////
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const Mailgen = require('mailgen');

// Initialize the Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

const DOMAIN = process.env.MAILGUN_DOMAIN;

const sendEmail = async (req, res) => {
    // Setup Mailgen
    const mailgen = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mohammad',
            link: 'https://test.io',
        },
    });

    // Define the email content
    const email = {
        body: {
            name: 'Recipient',
            intro: "Welcome to Mohammad's email service!",
            action: {
                instructions: 'Please click the button below to visit our website:',
                button: {
                    color: '#22BC66',
                    text: 'Visit Now',
                    link: 'https://test.io',
                },
            },
            outro: 'If you have any questions, feel free to reply to this email.',
        },
    };

    // Generate email content using Mailgen
    const emailBody = mailgen.generate(email);
    const emailText = mailgen.generatePlaintext(email);

    try {
        // Send the email using Mailgun
        const response = await mg.messages.create(DOMAIN, {
            to: 'lapagon986@degcos.com',
            from: 'Mohammad <lapagon986@degcos.com>',
            subject: 'Hello',
            text: emailText,
            html: emailBody,
        });

        res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};

module.exports = { sendEmail };
