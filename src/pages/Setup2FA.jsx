import TwoFASetup from "@/components/TwoFASetup";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Setup2FA() {
  const navigate = useNavigate();
  const handleSetupComplete = () => {
    navigate("/verify-2fa");
  };
  return <TwoFASetup onSetupComplete={handleSetupComplete} />;
}
