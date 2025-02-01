import * as React from 'react';

interface InvestorWelcomeTemplateProps {
  name: string;
  address : string;
}

export const InvestorWelcomeTemplate: React.FC<Readonly<InvestorWelcomeTemplateProps>> = ({
  name , address
}) => (
  <div>
    <h1>Hello, {name}!</h1>
    <p>We hope you&apos;re doing well.</p>
    <p>We wanted to inform you that you have been approved as an investor in BITSI Crypto.</p>
    <p>Your linked wallet address is: {address}</p>
    <p>If you have any questions or require further assistance, please do not hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>BITSI Crypto&apos;s Insurance Mechanism</p>
  </div>
);