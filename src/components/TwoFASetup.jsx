import { setup2FA } from "@/service/authApi";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export default function TwoFASetup({ onSetupComplete }) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({});

  const fetchQRCode = async () => {
    const { data } = await setup2FA();
    setResponse(data);
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-md p-4">
      <h2 className="text-xl text-center font-medium mb-4">Enable 2FA</h2>
      <p className="text-center text-gray-600 text-sm mb-4 pl-6 pr-6">
        Scan the QR code using your authenticator app
      </p>
      <div className="flex justify-center mb-4">
        {response.qrCode && (
          <img
            alt="2FA QR code"
            className="w-40 h-40 border rounded-sm"
            src={response.qrCode}
          />
        )}
      </div>
      <div className="flex items-center text-xs text-gray-500">
        <div className="flex-grow border-t"></div>
        <span className="px-2">Enter code manually</span>
        <div className="flex-grow border-t"></div>
      </div>
      <div className="mb-6">
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
        <input
          readOnly
          defaultValue=""
          value={response.secret}
          className="w-full rounded mt-2 text-xs text-gray-600 p-4 "
          onClick={copyClipBoard}
        />
      </div>
      <button
        onClick={onSetupComplete}
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        Continue to Verification
      </button>
    </div>
  );
}

TwoFASetup.propTypes = {
  onSetupComplete: PropTypes.func.isRequired,
};
