import fs from 'fs';
import pdf from 'html-pdf';
import nodemailer from 'nodemailer';

export default async function script(req, res) {
  const { name, date, place, places, email  } = req.body;

  try {
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Design</title>
</head>

<body style="font-family: 'Helvetica', sans-serif; background-color: #f0f0f0; margin: 0; padding: 40px; display: flex; align-items: center; justify-content: center; height: 100vh;">

    <div style="background: url('https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg'); border-radius: 12px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); max-width: 600px; width: 100%; padding: 40px; box-sizing: border-box;">

        <div style="border-bottom: 2px solid #ddd; padding-bottom: 20px; margin-bottom: 20px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">${name}</h1>
        </div>

        <div style="margin-bottom: 20px;">
            <h2 style="color: #ffffff; font-size: 18px; margin: 5px 0;">Date: ${date}</h2>
            <h2 style="color: #ffffff; font-size: 18px; margin: 5px 0;">Location: ${place}</h2>
        </div>

        <div style="text-align: center; margin-top: 20px;">
            <!-- Placeholder for barcode image -->
            <img src="https://barcode.tec-it.com/barcode.ashx?data=ABC-1234" alt="Barcode" style="max-width: 100%; height: auto;">
        </div>

        <div style="text-align: center; font-size: 16px; color: #ffffff;">
            <p>Thank you for your purchase, Mr. ${email}!</p>
        </div>

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
          to: email,
          subject: 'Event Details and PDF',
          html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <style class="darkreader darkreader--fallback" media="screen"></style>
    <style class="darkreader darkreader--text" media="screen"></style>
    <style class="darkreader darkreader--invert" media="screen">
        .jfk-bubble.gtx-bubble,
        .captcheck_answer_label>input+img,
        span#closed_text>img[src^="https://www.gstatic.com/images/branding/googlelogo"],
        span[data-href^="https://www.hcaptcha.com/"]>#icon,
        #bit-notification-bar-iframe,
        ::-webkit-calendar-picker-indicator,
        img.Wirisformula {
            filter: invert(100%) hue-rotate(180deg) contrast(90%) !important;
        }
    </style>
    <style class="darkreader darkreader--inline" media="screen">
        [data-darkreader-inline-bgcolor] {
            background-color: var(--darkreader-inline-bgcolor) !important;
        }

        [data-darkreader-inline-bgimage] {
            background-image: var(--darkreader-inline-bgimage) !important;
        }

        [data-darkreader-inline-border] {
            border-color: var(--darkreader-inline-border) !important;
        }

        [data-darkreader-inline-border-bottom] {
            border-bottom-color: var(--darkreader-inline-border-bottom) !important;
        }

        [data-darkreader-inline-border-left] {
            border-left-color: var(--darkreader-inline-border-left) !important;
        }

        [data-darkreader-inline-border-right] {
            border-right-color: var(--darkreader-inline-border-right) !important;
        }

        [data-darkreader-inline-border-top] {
            border-top-color: var(--darkreader-inline-border-top) !important;
        }

        [data-darkreader-inline-boxshadow] {
            box-shadow: var(--darkreader-inline-boxshadow) !important;
        }

        [data-darkreader-inline-color] {
            color: var(--darkreader-inline-color) !important;
        }

        [data-darkreader-inline-fill] {
            fill: var(--darkreader-inline-fill) !important;
        }

        [data-darkreader-inline-stroke] {
            stroke: var(--darkreader-inline-stroke) !important;
        }

        [data-darkreader-inline-outline] {
            outline-color: var(--darkreader-inline-outline) !important;
        }

        [data-darkreader-inline-stopcolor] {
            stop-color: var(--darkreader-inline-stopcolor) !important;
        }

        [data-darkreader-inline-bg] {
            background: var(--darkreader-inline-bg) !important;
        }
    </style>
    <style class="darkreader darkreader--variables" media="screen">
        :root {
            --darkreader-neutral-background: #131516;
            --darkreader-neutral-text: #d8d4cf;
            --darkreader-selection-background: #004daa;
            --darkreader-selection-text: #e8e6e3;
        }
    </style>
    <style class="darkreader darkreader--user-agent" media="screen">
        html {
            color-scheme: dark !important;
        }

        html,
        body {
            border-color: #736b5e;
            color: #e8e6e3;
        }

        a {
            color: #3391ff;
        }

        table {
            border-color: #545b5e;
        }

        ::placeholder {
            color: #b2aba1;
        }

        input:-webkit-autofill,
        textarea:-webkit-autofill,
        select:-webkit-autofill {
            background-color: #404400 !important;
            color: #e8e6e3 !important;
        }

        ::-webkit-scrollbar {
            background-color: #202324;
            color: #aba499;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #454a4d;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: #575e62;
        }

        ::-webkit-scrollbar-thumb:active {
            background-color: #484e51;
        }

        ::-webkit-scrollbar-corner {
            background-color: #181a1b;
        }

        ::selection {
            background-color: #004daa !important;
            color: #e8e6e3 !important;
        }

        ::-moz-selection {
            background-color: #004daa !important;
            color: #e8e6e3 !important;
        }
    </style>
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
    <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet">
    <!--<![endif]-->
    <style class="darkreader darkreader--sync" media="screen"></style>
    <style class="darkreader darkreader--sync" media="screen"></style>
    <style class="darkreader darkreader--sync" media="screen"></style>
    <style class="darkreader darkreader--sync" media="screen"></style>
    <style class="darkreader darkreader--sync" media="screen"></style>
    <style class="darkreader darkreader--sync" media="screen"></style>
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
</head>

<body>
    <div dir="ltr" class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f4effa"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table class="esd-header-popover es-header" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" data-darkreader-inline-bgcolor style="--darkreader-inline-bgcolor: #181a1b;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left" esd-custom-block-id="1047574">
                                                        <!--[if mso]><table width="560" cellpadding="0"
                            cellspacing="0"><tr><td width="240" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="240" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://demo.stripocdn.email/content/guids/46152d73-5906-40e6-83a3-09cdc7a3d289/images/el_evento.png" alt style="display: block;" width="240"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="300" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="300" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="17|15" esd-tmp-menu-font-size="12px">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links">
                                                                                                    <td align="center" valign="top" width="33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 17px; padding-bottom: 15px;"><a target="_blank" href="https://viewstripo.email" style="font-size: 12px;">News</a></td>
                                                                                                    <td align="center" valign="top" width="33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 17px; padding-bottom: 15px;"><a target="_blank" href="https://viewstripo.email" style="font-size: 12px;">Blog</a></td>
                                                                                                    <td align="center" valign="top" width="33%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-top: 17px; padding-bottom: 15px;"><a target="_blank" href="https://viewstripo.email" style="font-size: 12px;">Contact</a></td>
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
                                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" data-darkreader-inline-bgcolor style="--darkreader-inline-bgcolor: #181a1b;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" align="left" esd-custom-block-id="1047575">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-banner" style="position: relative;" esdev-config="h1"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img esdev-stretch-width esdev-banner-rendered" src="https://tlr.stripocdn.email/content/guids/bannerImgGuid/images/image16989437066653580.png" alt="Dr. Jane Smith" title="Dr. Jane Smith" width="600" style="display: block;"></a></td>
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
                                        <table bgcolor="#bc00dd" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #bc00dd; --darkreader-inline-bgcolor: #9600b1;" data-darkreader-inline-bgcolor>
                                            <tbody>
                                                <tr>
                                                    <td class="es-p20t es-p20r es-p20l esd-structure" align="left" esd-custom-block-id="1047576">
                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="316" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="316" class="esd-container-frame es-m-p20b" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>Guest Speaker</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p10t es-p20b">
                                                                                        <h1 style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>Dr. Jane Smith</h1>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>Location</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p10t es-p20b">
                                                                                        <h3 style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>University Hall, Room 203</h3>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="224" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="224" align="left" class="esd-container-frame">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>Date</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p15t es-p20b">
                                                                                        <h3 style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>October 15, 2023</h3>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>Time</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p15t es-p20b">
                                                                                        <h3 style="color: #ffffff; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color>2:00 PM - 4:00 PM</h3>
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
                                                <tr>
                                                    <td class="esd-structure es-p20 es-m-p30b" align="left" esd-custom-block-id="1047578">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-button">
                                                                                        <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
                style="height:51px; v-text-anchor:middle; width:176px" arcsize="50%" stroke="f"  fillcolor="#2d00f7">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; font-size:18px; font-weight:700; line-height:18px;  mso-text-raise:1px'>RSVP NOW</center>
	</v:roundrect></a>
<![endif]-->
                                                                                        <!--[if !mso]><!-- --><span class="msohide es-button-border"><a href="https://viewstripo.email" class="es-button" target="_blank">RSVP NOW</a></span>
                                                                                        <!--<![endif]-->
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
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" data-darkreader-inline-bgcolor style="--darkreader-inline-bgcolor: #181a1b;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p30 es-m-p20" align="left" esd-custom-block-id="1047579">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="540" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fbfaff" style="background-color: #fbfaff; --darkreader-inline-bgcolor: #191c1d;" data-darkreader-inline-bgcolor>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p40 es-m-p20">
                                                                                        <h3>Dear Esteemed Students,</h3>
                                                                                        <h3><br></h3>
                                                                                        <p>We are thrilled to extend a special invitation to you for an upcoming event that promises to be both enlightening and inspiring. We encourage you to seize this chance to broaden your horizons and deepen your knowledge. We look forward to your participation.</p>
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
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#fbfaff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #fbfaff; --darkreader-inline-bgcolor: #191c1d;" data-darkreader-inline-bgcolor>
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20r es-m-p30b es-m-p20l" align="left" esd-custom-block-id="1047581">
                                                        <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="300" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="300" class="es-m-p20b esd-container-frame" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_992ee6401ad0903256dce6979d64ca802f92f4de4b8da37f8f2177e3bf43deb9/images/pexelsluisfelipealburquerquebriganti5191971.jpeg" alt style="display: block;" width="300"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="260" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="260" align="left" class="esd-container-frame">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p30t es-m-p0t">
                                                                                        <h2>Event Highlights</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="23|13" esd-tmp-menu-size="width|23">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links-images-left">
                                                                                                    <td align="left" valign="top" width="100%" class="es-p10t es-p10b " style="padding-top: 23px; padding-bottom: 13px;"><a target="_blank" href="https://"><img src="https://tlr.stripocdn.email/content/guids/CABINET_992ee6401ad0903256dce6979d64ca802f92f4de4b8da37f8f2177e3bf43deb9/images/group_4076602_QbJ.png" alt="Gain unique insights from a renowned expert in Astrophysics" title="Gain unique insights from a renowned expert in Astrophysics" align="absmiddle" class="es-p10r" width="23">Gain unique insights from a renowned expert in Astrophysics</a></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="13|13" esd-tmp-menu-size="width|23">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links-images-left">
                                                                                                    <td align="left" valign="top" width="100%" class="es-p10t es-p10b " style="padding-top: 13px; padding-bottom: 13px;"><a target="_blank" href="https://"><img src="https://tlr.stripocdn.email/content/guids/CABINET_992ee6401ad0903256dce6979d64ca802f92f4de4b8da37f8f2177e3bf43deb9/images/group_4076600_0SF.png" alt="Participate in an open Q&A session with the speaker" title="Participate in an open Q&A session with the speaker" align="absmiddle" class="es-p10r" width="23">Participate in an open Q&A session with the speaker</a></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-menu" esd-tmp-menu-padding="13|13" esd-tmp-menu-size="width|23">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                                                                            <tbody>
                                                                                                <tr class="links-images-left">
                                                                                                    <td align="left" valign="top" width="100%" class="es-p10t es-p10b " style="padding-top: 13px; padding-bottom: 13px;"><a target="_blank" href="https://"><img src="https://tlr.stripocdn.email/content/guids/CABINET_992ee6401ad0903256dce6979d64ca802f92f4de4b8da37f8f2177e3bf43deb9/images/group_4076603_BfM.png" alt="Network with fellow students who share your passion for the cosmos" title="Network with fellow students who share your passion for the cosmos" align="absmiddle" class="es-p10r" width="23">Network with fellow students who share your passion for the cosmos</a></td>
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
                                                <tr>
                                                    <td class="esd-structure es-p20l es-m-p30b es-m-p20r" align="left" esd-custom-block-id="1047582">
                                                        <!--[if mso]><table dir="ltr" cellpadding="0" cellspacing="0"><tr><td><table dir="rtl" width="580" cellpadding="0" cellspacing="0"><tr><td dir="ltr" width="300" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="300" align="left" class="esd-container-frame es-m-p20b">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_992ee6401ad0903256dce6979d64ca802f92f4de4b8da37f8f2177e3bf43deb9/images/karanbhatian1qnvohnhxyunsplash.jpg" alt style="display: block;" width="300"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td dir="ltr" width="20"></td><td dir="ltr" width="260" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="260" class="esd-container-frame" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p40t es-p30b es-m-p0t">
                                                                                        <p>This event offers a rare opportunity to connect with a luminary in Astrophysics. Dr. Jane Smith is celebrated for her pioneering work in black hole research and her groundbreaking contributions to our understanding of the universe.</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-button">
                                                                                        <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
                style="height:51px; v-text-anchor:middle; width:176px" arcsize="50%" stroke="f"  fillcolor="#2d00f7">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; font-size:18px; font-weight:700; line-height:18px;  mso-text-raise:1px'>RSVP NOW</center>
	</v:roundrect></a>
<![endif]-->
                                                                                        <!--[if !mso]><!-- --><span class="msohide es-button-border"><a href="https://viewstripo.email" class="es-button" target="_blank">RSVP NOW</a></span>
                                                                                        <!--<![endif]-->
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" data-darkreader-inline-bgcolor style="--darkreader-inline-bgcolor: #181a1b;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20r es-m-p30b es-m-p20l" align="left" esd-custom-block-id="1047583">
                                                        <!--[if mso]><table width="580" cellpadding="0" 
                        cellspacing="0"><tr><td width="300" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p20b esd-container-frame" width="300" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img class="adapt-img" src="https://tlr.stripocdn.email/content/guids/CABINET_992ee6401ad0903256dce6979d64ca802f92f4de4b8da37f8f2177e3bf43deb9/images/attractiveladystandingisolatedpinkneonspaceexpressingpositiveemotions.jpeg" alt="Prof. Jane Doe" style="display: block;" width="300" title="Prof. Jane Doe"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="260" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="260" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr class="es-mobile-hidden">
                                                                                    <td align="center" class="esd-block-spacer" height="60"></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-m-txt-c">
                                                                                        <p>Warm regards,</p>
                                                                                        <p><br></p>
                                                                                        <h1>Prof. Jane Doe&nbsp;</h1>
                                                                                        <h2><br></h2>
                                                                                        <h3>Department of Physics&nbsp;</h3>
                                                                                        <h3>Harvard University</h3>
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
                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="1023241">
                                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#fbfaff" align="center" style="background-color: #fbfaff; --darkreader-inline-bgcolor: #191c1d;" data-darkreader-inline-bgcolor>
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p40b es-p20r es-p20l" align="left" esd-custom-block-id="1047585">
                                                        <!--[if mso]><table width="560" cellpadding="0" 
                        cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p20b esd-container-frame" width="270" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-image es-p5t es-p5b es-m-txt-c" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/guids/CABINET_992ee6401ad0903256dce6979d64ca802f92f4de4b8da37f8f2177e3bf43deb9/images/group_4076599.png" alt="Logo" style="display: block;" width="200" title="Logo"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="270" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="right" class="esd-block-social es-p10t es-p5b es-m-txt-c" style="font-size:0">
                                                                                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" valign="top" class="es-p20r"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" title="Facebook" width="32"></a></td>
                                                                                                    <td align="center" valign="top" class="es-p20r"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Ig" title="Instagram" width="32"></a></td>
                                                                                                    <td align="center" valign="top" class="es-p20r"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" title="Youtube" width="32"></a></td>
                                                                                                    <td align="center" valign="top" esd-tmp-icon-type="twitter"><a target="_blank" href="https://viewstripo.email"><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png" alt="X" title="X.com" width="32"></a></td>
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
                                                <tr>
                                                    <td class="esd-structure es-p30b es-p20r es-p20l" align="left">
                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="270" class="es-m-p20b esd-container-frame" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-m-txt-c">
                                                                                        <p>For any questions contact us at <a href="mailto:info@email.com" target="_new">info@email.com</a></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="270" align="left" class="esd-container-frame">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="right" class="esd-block-text es-m-txt-c">
                                                                                        <p>To unsubscribe from updates, click <a href="https://viewstripo.email" target="_new">here</a>.</p>
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
                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent; --darkreader-inline-bgcolor: transparent;" data-darkreader-inline-bgcolor>
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image es-infoblock made_with" style="font-size:0"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=professor_email_9&utm_content=exclusive_lecture"><img src="https://tlr.stripocdn.email/content/guids/CABINET_09023af45624943febfa123c229a060b/images/7911561025989373.png" alt width="125" style="display: block;"></a></td>
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
          `,
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
            res.status(200).json({ success: true, message: `PDF generated and email sent successfully ${email}` });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error parsing request body or generating PDF' });
  }
}
