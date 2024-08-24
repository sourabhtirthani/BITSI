import * as React from 'react';

interface ClaimTemplateProps {
  userName: string;
  assetId : number;
  claimStatus : string
}

export const ClaimTemplate: React.FC<Readonly<ClaimTemplateProps>> = ({
  userName, assetId , claimStatus
}) => (
  <div>
    <h1>Hello, {userName}!</h1>
    <p>We Hope this email finds you well</p>
    <p>We wanted to inform you that your compensation claim for the asset with ID {assetId} has been {claimStatus}.</p>
    <p>If you have any questions or require further assistance, please do not hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>BITSI Crypto&apos;s Insurance Mechanism</p>
  </div>
);