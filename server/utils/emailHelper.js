const nodemailer = require("nodemailer");

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    console.log("Using custom SMTP configuration");
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || "587"),
      secure: SMTP_PORT === "465",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  } else {
    console.log("No SMTP credentials found in .env. Attempting to create an Ethereal test account...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log("Ethereal test account created successfully!");
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      transporter._isEthereal = true;
    } catch (error) {
      console.warn("Failed to create Ethereal account, falling back to console logger:", error.message);
      transporter = {
        sendMail: async (mailOptions) => {
          console.log("\n=================== EMAIL SENT (CONSOLE FALLBACK) ===================");
          console.log(`From: ${mailOptions.from}`);
          console.log(`To: ${mailOptions.to}`);
          console.log(`Subject: ${mailOptions.subject}`);
          console.log(`Body (HTML):\n${mailOptions.html}`);
          console.log("=====================================================================\n");
          return { messageId: "console-fallback-" + Date.now() };
        }
      };
    }
  }

  return transporter;
};

const sendEmergencyAlertEmail = async ({ donor, request }) => {
  try {
    const mailTransporter = await getTransporter();
    const fromAddress = process.env.SMTP_FROM || '"BloodLink Emergency Alert" <no-reply@bloodlink.com>';
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f3f3f3; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px; letter-spacing: 1px;">🚨 EMERGENCY BLOOD REQUIRED</h2>
        </div>
        <div style="padding: 24px; color: #333333; line-height: 1.6;">
          <p>Dear <strong>${donor.name}</strong>,</p>
          <p>An urgent blood request has been posted in your city matching your blood group profile. A patient is in critical need of your support.</p>
          
          <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #b91c1c; font-size: 18px;">Request Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; font-weight: bold; width: 120px;">Blood Group:</td>
                <td style="padding: 4px 0; color: #dc2626; font-weight: bold; font-size: 16px;">${request.bloodGroup}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Patient:</td>
                <td style="padding: 4px 0;">${request.patientName}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Hospital:</td>
                <td style="padding: 4px 0;">${request.hospital}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">City:</td>
                <td style="padding: 4px 0;">${request.city}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: bold;">Contact:</td>
                <td style="padding: 4px 0; font-weight: bold; color: #2563eb;">${request.phone}</td>
              </tr>
            </table>
          </div>
          
          <p>If you are able to donate, please contact the hospital or patient coordinator immediately at the number above.</p>
          
          <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
            <a href="tel:${request.phone}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">Contact Now</a>
          </div>
          
          <p style="font-size: 12px; color: #666666; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 15px;">
            Thank you for being a registered donor with BloodLink. Your quick action can save a life.
          </p>
        </div>
      </div>
    `;

    const info = await mailTransporter.sendMail({
      from: fromAddress,
      to: donor.email,
      subject: `🚨 Urgent: Blood Request for ${request.bloodGroup} in ${request.city}`,
      html: htmlContent
    });

    console.log(`Email successfully sent to ${donor.email}. Message ID: ${info.messageId}`);
    if (mailTransporter._isEthereal) {
      console.log(`✉️ Ethereal Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return info;
  } catch (error) {
    console.error(`Failed to send email to ${donor.email}:`, error);
  }
};

module.exports = {
  sendEmergencyAlertEmail
};
