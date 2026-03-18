import nodemailer from 'nodemailer';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const logoPath = path.join(process.cwd(), 'public', 'logo.png');

export const sendOtpEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: `"BuildUrSite" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Password - BuildUrSite',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f9fb;">
                <div style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e1e4e8;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="cid:logo" alt="BuildUrSite" style="width: 60px; height: 60px; margin-bottom: 10px;">
                        <h1 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 700;">BuildUr<span style="color: #6C63FF;">Site</span></h1>
                    </div>
                    
                    <h2 style="color: #2d3748; font-size: 20px; margin-bottom: 20px; text-align: center;">Password Reset Request</h2>
                    
                    <p style="color: #4a5568; line-height: 1.6; margin-bottom: 25px;">
                        Hello,<br><br>
                        We received a request to reset your password for your BuildUrSite account. Use the verification code below to proceed with the reset. This code is valid for 10 minutes.
                    </p>
                    
                    <div style="background-color: #f7fafc; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 30px;">
                        <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #6C63FF;">${otp}</span>
                    </div>
                    
                    <p style="color: #718096; font-size: 14px; line-height: 1.5; margin-bottom: 30px; text-align: center;">
                        If you did not request a password reset, please ignore this email or contact support if you have concerns about your account security.
                    </p>
                    
                    <div style="border-top: 1px solid #e2e8f0; pt-30px font-size: 12px; color: #a0aec0; text-align: center; padding-top: 20px;">
                        &copy; 2026 BuildUrSite. Elevate your professional presence.
                    </div>
                </div>
            </div>
        `,
        attachments: [{
            filename: 'logo.png',
            path: logoPath,
            cid: 'logo'
        }]
    };

    return transporter.sendMail(mailOptions);
};

export const sendFeedbackEmail = async (username: string, rating: number, comment: string, isSuggestion: boolean) => {
    const typeLabel = isSuggestion ? 'Suggestion' : 'Review';
    const accentColor = isSuggestion ? '#06B6D4' : '#6C63FF';

    const mailOptions = {
        from: `"BuildUrSite Notifications" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `[New ${typeLabel}] from ${username}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f4f7f6;">
                <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-top: 6px solid ${accentColor};">
                    <div style="padding: 30px;">
                        <div style="display: flex; align-items: center; margin-bottom: 20px;">
                            <img src="cid:logo" alt="BuildUrSite" style="width: 40px; height: 40px; margin-right: 12px;">
                            <h2 style="margin: 0; color: #1a202c;">New Platform ${typeLabel}</h2>
                        </div>
                        
                        <div style="background-color: #edf2f7; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #4a5568; font-weight: 600; width: 120px;">User:</td>
                                    <td style="padding: 8px 0; color: #2d3748;">${username}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #4a5568; font-weight: 600;">Rating:</td>
                                    <td style="padding: 8px 0; color: #2d3748;">
                                        <span style="color: #f6ad55; font-size: 18px;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
                                        (${rating}/5)
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #4a5568; font-weight: 600;">Date:</td>
                                    <td style="padding: 8px 0; color: #2d3748;">${new Date().toLocaleDateString()}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <h3 style="color: #4a5568; font-size: 16px; margin-bottom: 10px;">User Comments:</h3>
                        <div style="background-color: #f8fafc; border-left: 4px solid ${accentColor}; padding: 20px; color: #2d3748; line-height: 1.6; font-style: italic; border-radius: 0 4px 4px 0;">
                            "${comment}"
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #718096; font-size: 12px;">
                    This is an automated notification from the BuildUrSite Feedback System.
                </div>
            </div>
        `,
        attachments: [{
            filename: 'logo.png',
            path: logoPath,
            cid: 'logo'
        }]
    };

    return transporter.sendMail(mailOptions);
};
