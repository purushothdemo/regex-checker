"use client";

import Image from "next/image";
import logo from "../../public/assets/logo.svg";
import { useCallback, useEffect, useState } from "react";
import SizedConfetti from "react-confetti";
import useWindowSize from "react";
import { useRef } from "react";

export default function Home() {
  const [validateReg, setValidateReg] = useState<any>("start");
  const [regexValue, setRegexValue] = useState<any>("");

  const [validateRegBool, setValidateRegBool] = useState<boolean>(false);
  const [valueBool, setValueBool] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState(0);
  const [textValue, setTextValue] = useState<string>();
  // const { width, height } = useWindowSize()
  // Test the validation function
  function isRegexString(input: string): boolean {
    return /^\/.+\/[gimsuy]*$/.test(input);
  }

  const handleValidateRegex = (e: any) => {
    const inputValue = e.target.value;
    setTextValue("");

    // Check for consecutive identical characters
    for (let i = 1; i < inputValue.length; i++) {
      if (inputValue[i] === inputValue[i - 1]) {
        // Prevent the new character from being entered
        if (i === 1) {
          e.target.value = inputValue.slice(0, i);
        } else {
          e.target.value;
        }
        break;
      }
    }
    setRegexValue(e.target.value);

    // console.log(e.target.value);
    if (isRegexString(String(e.target.value))) {
      setValidateReg(e.target.value);

      setValidateRegBool(true);
    } else {
      setValidateReg("");
      setValidateRegBool(false);
    }
  };
  const handleCheckGivenvalue = (e: any) => {
    const regex: RegExp = new RegExp(validateReg.slice(1, -1));
    setTextValue(e.target.value);

    try {
      const validate = regex.test(e.target.value);
      setValueBool(validate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setValidateReg("start"), setValidateRegBool(false);
    setValueBool(false);
    setTextValue("");
    setRegexValue("");
  };

  const onScroll = useCallback((event: any) => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="flex flex-col pt-4   bg-[#FFFEFE]

    min-h-screen"
    >
      <div
        className={`p-4 flex items-center h-[70px] header_style fixed ${
          scrollY ? "border" : ""
        } top-0 left-0 right-0 `}
      >
        <Image src={logo} alt="logo" />
      </div>
      <div className="flex flex-col pt-24 items-center min-h-max">
        <div className="flex flex-col items-center ">
          <div className="font-normal text-[#676667]  leading-8 text-[24px] not-italic">
            Instantly Verify Your
          </div>
          <div className="font-extrabold text-[#1A1B1A] text-[92px] not-italic">
            Regular Expressions
          </div>
          <div></div>
        </div>
        <div className="flex mt-12 ">
          <div className="mt-1 flex">
            <input
              value={regexValue}
              onChange={(el) => handleValidateRegex(el)}
              className={`input_style w-[500px] h-[50px] rounded-[10px] border-2 p-4 ${
                validateReg === "start"
                  ? ""
                  : validateRegBool
                  ? "border-[#A1D99A] border-1 border-solid"
                  : "border-[#FEBBB9] border-1 border-solid"
              } `}
              placeholder="ENTER YOUR REGEX"
              contentEditable={true}
            />
          </div>
        </div>

        <div className=" mt-12 pb-12">
          <textarea
            className={`input_style w-[550px] h-[150px] border-2 p-4 ${
              validateRegBool ? "" : "disable"
            } `}
            id="textarea"
            name="text"
            disabled={!validateRegBool}
            placeholder="ENTER YOUR INPUT"
            onChange={handleCheckGivenvalue}
            value={textValue}
          />

          {/* {valueBool ? "Matching" : "NOt Matching"} */}
        </div>
        <div>
          <button
            onClick={handleReset}
            className="border-2 hover:border-stone-950 border-solid border-stone-300 py-1 px-4 rounded-md"
          >
            RESET
          </button>
        </div>
        {valueBool ? (
          <>
            <SizedConfetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={90}
              gravity={0.3}
              confettiSource={{
                w: 100,
                h: 100,
                x: window.innerWidth / 2,
                y: 0,
              }}
              colors={["#A1D99A"]}
            />
          </>
        ) : (
          <></>
        )}

        <p className="text-[8px] p-0 m-0 font-light text-[#676667] mt-10">
          Color paper rain start, when your value match with regex 🥳{" "}
        </p>
      </div>
    </div>
  );
}
