const nodemailer = require("nodemailer");
const pug = require("pug");
const { google } = require("googleapis");

module.exports = class Email {
    constructor(email, firstName, url) {
        this.to = email;
        this.firstName = firstName;
        this.from = "RVN";
        this.url = url;
    }

    async newTransport() {
        try {
            return nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "bongmaxuyentuong1@gmail.com",
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    refreshToken: process.env.GOOGLE_REFRESEH_TOKEN,
                    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    // Send the actual email

    async send(template, subject) {
        // 1) Render HTML based on a pug template
        try {
            const html = pug.renderFile(
                `${__dirname}/../views/email/${template}.pug`,
                {
                    firstName: this.firstName,
                    url: this.url,
                    subject,
                },
            );
            // 2) Define email options
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                html,
            };
            // 3) Create a transport and send email
            const transport = await this.newTransport();
            await transport.sendMail(mailOptions);
        } catch (e) {
            console.log(e);
        }
    }

    async sendWelcome() {
        await this.send("verifySignUp", "Chào mừng đến với RVN!");
    }

    async sendPasswordReset() {
        await this.send(
            "passwordReset",
            "Thay đổi mật khẩu của bạn",
        );
    }
};
