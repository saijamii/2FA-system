import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function OtpInput({ submitOtp }) {
  const OTP_DIGIT_COUNT = 6;
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  const [error, setError] = useState(null);
  console.log(inputArr);
  const arrRef = useRef([]);

  useEffect(() => {
    arrRef?.current[0]?.focus();
  }, []);

  const handleOnchange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);

    if (index < OTP_DIGIT_COUNT - 1) {
      newValue && arrRef?.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      arrRef?.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) {
        arrRef?.current[index - 1]?.focus();
      }
    } else if (e.key === "Backspace") {
      !e.target.value && arrRef?.current[index - 1]?.focus();
    }
  };

  const getOtpValue = () => {
    const otp = inputArr.join("");
    const hasEmpty = inputArr.includes("");
    return { otp, isComplete: !hasEmpty };
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const { otp, isComplete } = getOtpValue();
    if (!isComplete) {
      setError("Please enter all 6 digits.");
      return;
    } else {
      submitOtp(otp);
      setError(null);
    }
  };

  return (
    <>
      <div className="flex flex-row w-md">
        {inputArr.map((e, index) => (
          <input
            key={index}
            ref={(input) => {
              arrRef.current[index] = input;
            }}
            className="h-12 w-12 text-3xl text-center m-0.2 border"
            value={inputArr[index]}
            onChange={(e) => handleOnchange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <div className="mt-8">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-3"
          onClick={handleVerify}
        >
          Verify OTP
        </button>
      </div>
    </>
  );
}

OtpInput.propTypes = {
  submitOtp: PropTypes.func.isRequired,
};
