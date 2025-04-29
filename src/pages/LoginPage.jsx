import LoginForm from "@/components/LoginForm";
import { useSession } from "@/context/SessionContext";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSuccess = (loggedInUserData) => {
    console.log(loggedInUserData, "loggedInUserData");
    login(loggedInUserData);
    if (!loggedInUserData.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa");
    }
  };
  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}
