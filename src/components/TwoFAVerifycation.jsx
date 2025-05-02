import { reset2FA, verify2FA } from "@/service/authApi";
import React, { useState } from "react";
import OtpInput from "./OtpInput";

export default function TwoFAVerifycation({ onVerifySucess, onResetSucess }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerifySucess(data);
    } catch (error) {
      setOtp("");
      console.log("The err is : ", error.message);
      setError("invalid OTP");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await reset2FA(otp);
      onResetSucess(data);
    } catch (error) {
      console.log("The err is : ", error.message);
      setError("invalid OTP");
    }
  };

  return (
    <form
      onSubmit={handleTokenVerification}
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto mt-20 p-6"
    >
      <h2 className="text-3xl text-center font-light mb-6">Validate TOTP</h2>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-gray-600 text-lg font-light">
        Please enter 6-digit Time based OTP to Verify 2FA Authentication
      </p>
      <div className="p-6">
        <div className="mb-4 mt-4">
          <label className="block text-gray-700 mb-2" htmlFor="TOTP">
            TOTP
          </label>

          <OtpInput />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-3"
        >
          Verify OTP
        </button>
        <button
          className="w-full bg-slate-600 text-white py-2 rounded-md "
          onClick={handleReset}
        >
          Reset 2FA
        </button>
      </div>
    </form>
  );
}
