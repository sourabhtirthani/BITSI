import * as React from 'react';

interface OtpTemplateProps {
 otp : number
}

export const OtpTemplate: React.FC<Readonly<OtpTemplateProps>> = ({
  otp
}) => (
  <div>
    <h1>Hello Admin!</h1>
    <p>Your One-Time Password (OTP) for secure access is:</p>
    <p>{otp}</p>
    <p>This OTP is valid for 10 minutes.</p>
    <p>If you have any questions or require further assistance, please do not hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>BITSI Crypto&apos;s Insurance Mechanism</p>
  </div>
);