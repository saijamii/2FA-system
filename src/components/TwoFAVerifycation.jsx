import { reset2FA, verify2FA } from "@/service/authApi";
import React, { useState } from "react";
import OtpInput from "./OtpInput";
import PropTypes from "prop-types";

export default function TwoFAVerifycation({ onVerifySucess, onResetSucess }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTokenVerification = async (otp) => {
    try {
      setLoading(true);
      const { data } = await verify2FA(otp);
      onVerifySucess(data);
    } catch (error) {
      console.log("The err is : ", error.message);
      setError("invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await reset2FA();
      onResetSucess(data);
    } catch (error) {
      console.log("The err is : ", error.message);
      setError("invalid OTP");
    } finally {
      setLoading(false);
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

          <OtpInput submitOtp={handleTokenVerification} loading={loading} />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          className="w-full bg-slate-600 text-white py-2 rounded-md "
          onClick={handleReset}
          disabled={loading}
        >
          Reset 2FA
        </button>
      </div>
    </form>
  );
}

TwoFAVerifycation.propTypes = {
  onVerifySucess: PropTypes.func.isRequired,
  onResetSucess: PropTypes.func.isRequired,
};
