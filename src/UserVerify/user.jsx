import { useState, useRef } from "react";
import "./user.scss";

export const User = () => {
  const [otp, setOtp] = useState({
    first: "",
    sec: "",
    third: "",
    four: "",
    five: "",
    six: "",
  });

  const inputRefs = {
    first: useRef(null),
    sec: useRef(null),
    third: useRef(null),
    four: useRef(null),
    five: useRef(null),
    six: useRef(null),
  };

  const handleChange = (e, currentInput) => {
    const { value } = e.target;
    
    setOtp((prevOtp) => ({
      ...prevOtp,
      [currentInput]: value,
    }));

    // Move focus to the previous input field if a digit is deleted
    if (value === "" && e.nativeEvent.inputType === "deleteContentBackward") {
      const prevInput = getPrevInput(currentInput);
      if (prevInput) {
        inputRefs[prevInput].current.focus();
      }
    } else {
      // Move focus to the next input field if a digit is entered
      const nextInput = getNextInput(currentInput);
      if (nextInput) {
        inputRefs[nextInput].current.focus();
      }
    }
  };

  const getNextInput = (currentInput) => {
    const inputKeys = Object.keys(inputRefs);
    const currentIndex = inputKeys.indexOf(currentInput);
    return inputKeys[currentIndex + 1];
  };

  const getPrevInput = (currentInput) => {
    const inputKeys = Object.keys(inputRefs);
    const currentIndex = inputKeys.indexOf(currentInput);
    return inputKeys[currentIndex - 1];
  };

  const array = [
    { sir: "first", data: otp.first },
    { sir: "sec", data: otp.sec },
    { sir: "third", data: otp.third },
    { sir: "four", data: otp.four },
    { sir: "five", data: otp.five },
    { sir: "six", data: otp.six },
  ];

  return (
    <div className="user-container">
      <h1>Enter Your OTP</h1>
      <p>
        We emailed you the six-digit code to mr.jitesh@gmail.com
        <br />
        Enter below code to confirm your email address.
      </p>
      <div className="inputs">
        {array.map(({ sir, data }, i) => (
          <input
            key={i}
            ref={inputRefs[sir]}
            value={data}
            name={sir}
            onChange={(e) => handleChange(e, sir)}
            type="number"
            placeholder="0"
            className="otpField"
            min={0}
            max={9}
            required
          />
        ))}
      </div>
      <div className="paragraph">
        This is design-only; we did not send any email to you!
      </div>
    </div>
  );
};

