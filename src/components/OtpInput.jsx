import React, { useEffect, useRef, useState } from "react";

export default function OtpInput() {
  const OTP_DIGIT_COUNT = 6;
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
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
    </>
  );
}
