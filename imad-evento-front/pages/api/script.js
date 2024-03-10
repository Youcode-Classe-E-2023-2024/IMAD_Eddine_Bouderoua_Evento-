import fs from 'fs';
import pdf from 'html-pdf';
import nodemailer from 'nodemailer';

export default async function script(req, res) {
  const { name, date, place, places, email } = req.body;

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              color: #3498db;
            }
            .event-details {
              margin-top: 20px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <h1>Hello, PDF!</h1>
          <div class="event-details">
            <h2>Event Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Place:</strong> ${date}</p>
            <p><strong>Places:</strong> ${place}</p>
            <p><strong>Places:</strong> ${places}</p>
          </div>
        </body>
      </html>
    `;

    // Generate PDF
    pdf.create(htmlContent).toFile('output.pdf', async (err, pdfRes) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error generating PDF' });
      } else {
        console.log('PDF created:', pdfRes.filename);

        // Send email with PDF attachment
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ibouderoua63@gmail.com',
              pass: 'buyb amaf ytnk vycv',
            },
          });

        const mailOptions = {
            from: 'ibouderoua63@gmail.com',
          to: 'imadbpro63@gmail.com',
          subject: 'Event Details and PDF',
          html: 'Hello, here are the event details!',
          attachments: [
            {
              filename: 'event_details.pdf',
              path: pdfRes.filename,
            },
          ],
        };

        transporter.sendMail(mailOptions, (emailError, info) => {
          if (emailError) {
            console.error(emailError);
            res.status(500).json({ success: false, message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'PDF generated and email sent successfully' });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error parsing request body or generating PDF' });
  }
}
