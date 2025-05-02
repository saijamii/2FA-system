import React, { useRef, useState } from "react";

export default function OtpInput() {
  const OTP_DIGIT_COUNT = 6;
  const [inputArr, setInputArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  console.log(inputArr);
  const arrRef = useRef([]);
  console.log(arrRef?.current);
  const handleOnchange = (value, index) => {
    if (isNaN(value)) return;
    const newArr = [...inputArr];
    newArr[index] = value.slice(-1);
    setInputArr(newArr);
  };

  return (
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
        />
      ))}
    </div>
  );
}
