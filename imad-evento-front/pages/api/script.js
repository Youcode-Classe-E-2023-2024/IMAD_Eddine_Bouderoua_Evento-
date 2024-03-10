import fs from 'fs';
import pdf from 'html-pdf';
import nodemailer from 'nodemailer';

export default async function script(req, res) {
  const { name, date, place, places, email } = req.body;

  try {
    const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title></title>
        <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css2?family=Arizonia&display=swap" rel="stylesheet">
        <!--<![endif]-->
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" rel="stylesheet">
        <!--<![endif]-->
    </head>
    
    <body>
        <div dir="ltr" class="es-wrapper-color">
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#ffffff"></v:fill>
                </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                            <!--[if mso]><table width="560" cellpadding="0"
                                cellspacing="0"><tr><td width="180" valign="top"><![endif]-->
                                                            <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="180" class="es-m-p0r es-m-p20b esd-container-frame" valign="top" align="center">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="left" class="esd-block-image es-m-txt-c" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/guids/CABINET_d949671a818d07985fea360ac1d2daec/images/group_1_f7f.png" alt="Logo" style="display: block;" title="Logo" height="40"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!--[if mso]></td><td width="20"></td><td width="360" valign="top"><![endif]-->
                                                            <table cellpadding="0" cellspacing="0" align="right">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="360" align="left" class="esd-container-frame">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-menu" esd-tmp-menu-color="#efefef" esd-tmp-divider="0|solid|#efefef" esd-tmp-menu-padding="14|10">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                <tbody>
                                                                                                    <tr class="links">
                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 14px;"><a target="_blank" href="https://viewstripo.email" style="color: #efefef;">Blog</a></td>
                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 14px;"><a target="_blank" href="https://viewstripo.email" style="color: #efefef;">News</a></td>
                                                                                                        <td align="center" valign="top" width="33.33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 14px;"><a target="_blank" href="https://viewstripo.email" style="color: #efefef;">Contact</a></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!--[if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table class="es-content-body" style="background-color: #96663e;" width="600" cellspacing="0" cellpadding="0" bgcolor="#96663E" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="es-m-p0r esd-container-frame" width="600" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_d949671a818d07985fea360ac1d2daec/images/pexelspixabay54098_1_1.png" alt style="display: block;" width="600"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p10b">
                                                                                            <h3>LEST WE FORGET</h3>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-spacer es-p5" style="font-size:0">
                                                                                            <table border="0" width="50%" height="100%" cellpadding="0" cellspacing="0" style="width: 50% !important; display: inline-table;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="border-bottom: 2px solid #cccccc; background: none; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b">
                                                                                            <h1 style="line-height: 100%;"><strong>ANZAC</strong><br><em><span style="font-family: arizonia, cursive;">Day</span></em></h1>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-spacer es-p5" style="font-size:0">
                                                                                            <table border="0" width="50%" height="100%" cellpadding="0" cellspacing="0" style="width: 50% !important; display: inline-table;">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="border-bottom: 2px solid #cccccc; background: none; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p10t">
                                                                                            <h3>25TH APRIL 2022 AT 1:00 PM</h3>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p15t es-p15b">
                                                                                            <p>They shall grow not old, as we that are left grow old;<br>Age shall not weary them, nor the years condemn.<br>At the going down of the sun and in the morning<br>We will remember them</p>
                                                                                            <h2>🙏</h2>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b" bgcolor="#ffffff">
                                                                                            <h2 style="color: #af2420; line-height: 150%;">MEMORIAL SERVICE | STREET FOOD | DRINKS | LIVE MUSIC</h2>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-button es-p30t es-p20b"><span class="es-button-border" style="background: #af2420;"><a href="https://viewstripo.email" class="es-button" target="_blank" style="font-weight: bold; font-size: 22px; background: #af2420; mso-border-alt: 10px solid  #af2420; color: #ffffff">REGISTER NOW</a></span></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="600" class="esd-container-frame" align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_d949671a818d07985fea360ac1d2daec/images/pngegg_20210929t143053_1.png" alt style="display: block;" width="600"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="esd-footer-popover es-footer" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left" esd-custom-block-id="465700">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="560" class="esd-container-frame" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-menu" esd-tmp-menu-padding="10|10" esd-tmp-menu-color="#999999" esd-tmp-menu-font-size="12px" esd-tmp-divider="0|solid|#999999">
                                                                                            <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                                <tbody>
                                                                                                    <tr class="links">
                                                                                                        <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom: 10px;"><a target="_blank" href="https://viewstripo.email" style="color: #999999; font-size: 12px;">About us</a></td>
                                                                                                        <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom: 10px;"><a target="_blank" href="https://viewstripo.email" style="color: #999999; font-size: 12px;">News</a></td>
                                                                                                        <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom: 10px;"><a target="_blank" href="https://viewstripo.email" style="color: #999999; font-size: 12px;">Career</a></td>
                                                                                                        <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom: 10px;"><a target="_blank" href="https://viewstripo.email" style="color: #999999; font-size: 12px;">The shops</a></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-social es-p20t es-p20b" style="font-size:0">
                                                                                            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td align="center" valign="top" class="es-p20r" esd-tmp-icon-type="facebook"><a target="_blank" href="https://viewstripo.email"><img title="Facebook" src="https://tlr.stripocdn.email/content/assets/img/social-icons/square-gray/facebook-square-gray.png" alt="Fb" width="32" height="32"></a></td>
                                                                                                        <td align="center" valign="top" class="es-p20r" esd-tmp-icon-type="twitter"><a target="_blank" href="https://viewstripo.email"><img title="Twitter" src="https://tlr.stripocdn.email/content/assets/img/social-icons/square-gray/twitter-square-gray.png" alt="Tw" width="32" height="32"></a></td>
                                                                                                        <td align="center" valign="top" class="es-p20r" esd-tmp-icon-type="instagram"><a target="_blank" href="https://viewstripo.email"><img title="Instagram" src="https://tlr.stripocdn.email/content/assets/img/social-icons/square-gray/instagram-square-gray.png" alt="Inst" width="32" height="32"></a></td>
                                                                                                        <td align="center" valign="top" esd-tmp-icon-type="youtube"><a target="_blank" href="https://viewstripo.email"><img title="Youtube" src="https://tlr.stripocdn.email/content/assets/img/social-icons/square-gray/youtube-square-gray.png" alt="Yt" width="32" height="32"></a></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-text es-p10t es-p10b" esd-links-color="#999999" esd-links-underline="none">
                                                                                            <p style="font-size: 12px; color: #999999;">You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).<br><strong><a target="_blank" style="font-size: 12px; color: #999999; text-decoration: none;" href="https://viewstripo.email">Privacy police</a> | <a target="_blank" style="font-size: 12px; color: #999999; text-decoration: none;">Unsubscribe</a></strong></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="560" class="esd-container-frame" align="left">
                                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" class="esd-block-image es-infoblock made_with" style="font-size:0"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=spirit&utm_content=we_will_remember_them"><img src="https://tlr.stripocdn.email/content/guids/CABINET_09023af45624943febfa123c229a060b/images/7911561025989373.png" alt width="125" style="display: block;"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
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
