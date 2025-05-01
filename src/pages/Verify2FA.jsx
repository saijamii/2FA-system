import TwoFAVerifycation from "@/components/TwoFAVerifycation";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Verify2FA() {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };
  
  return (
    <TwoFAVerifycation
      onVerifySucess={handleVerification}
      onResetSucess={handle2FAReset}
    />
  );
}
