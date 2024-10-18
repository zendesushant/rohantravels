const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const COMPANY_EMAIL = "frio.cabservices@gmail.com";
const GMAIL_APP_PASSWORD = "cevm scie vxkx cqrf";

async function sendEmail(recepientDetails) {
    // Read the HTML template and image file

    let name = recepientDetails.name;
    let email = recepientDetails.email;
    let contact = recepientDetails.contact;
    let message = recepientDetails.message;
    let htmlTemplate = await readFileAsync('D:/rohantravels/RohanTravels/_backend/src/templates/html/send-enquiry.html', 'utf-8');
    htmlTemplate = htmlTemplate.replace("{{name}}",name.charAt(0).toUpperCase()+name.slice(1))
    htmlTemplate = htmlTemplate.replace("{{email}}",email)
    htmlTemplate = htmlTemplate.replace("{{contact}}",contact)
    htmlTemplate = htmlTemplate.replace("{{message}}",message)
   // const imageAttachment = await readFileAsync('path/to/your/image.png');

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: COMPANY_EMAIL,
          pass: GMAIL_APP_PASSWORD,
        },
      });

    // Send email
    const mailOptions = {
        from: email,
        to: COMPANY_EMAIL,
        subject: "Enquiry",
        text: "This is a test email sent using Nodemailer.",
        html: htmlTemplate
       /* attachments: [{
            filename: 'image.png',
            content: imageAttachment,
            encoding: 'base64',
            cid: 'uniqueImageCID', // Referenced in the HTML template
        }],*/
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
          } else {
            return true;
          }
      })
}


module.exports = {sendEmail}