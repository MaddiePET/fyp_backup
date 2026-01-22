"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@/icons/chevron-left.svg";

type Step = "input" | "otp";

export default function PersonalNonMalaysianPhone() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("input");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!mounted) return null;

  const handleGlobalBack = () => {
    if (step === "otp") {
      setStep("input");
    } else {
      router.push("/personal_non_malaysian_email");
    }
  };

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimer(60);
    }, 800);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/personal_non_malaysian_face_verification");
    }, 800);
  };

  const handleOtpChange = (value: string, index: number) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    if (cleanValue.length > 1) {
      const pastedChars = cleanValue.slice(0, 6).split("");
      pastedChars.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      otpInputs.current[Math.min(index + pastedChars.length, 5)]?.focus();
    } else {
      newOtp[index] = cleanValue;
      setOtp(newOtp);
      if (cleanValue && index < 5) otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-[#F9FAFB] dark:bg-gray-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[200px] md:h-[320px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-[#3D405B]/10 dark:fill-gray-800/40" d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L0,0Z"></path>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[150px] md:h-[250px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-[#3D405B]/5 dark:fill-gray-800/20" fillOpacity="1" d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L0,320Z"></path>
        </svg>
      </div>

      <div className="absolute top-6 left-4 right-4 flex justify-between items-center max-w-7xl mx-auto w-full z-20">
        <button
          onClick={handleGlobalBack}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-[#3D405B] dark:text-gray-400 dark:hover:text-white"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back
        </button>
        <div className="flex items-center">
          <Image src="/images/logo/logo-dark.svg" alt="Logo" width={50} height={50} className="dark:hidden" />
          <Image src="/images/logo/logo-light.svg" alt="Logo" width={50} height={50} className="hidden dark:block" />
          <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 uppercase tracking-tight">DTCOB</h1>
        </div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {step === "input" && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10 text-center">
              <h1 className="mb-3 font-bold text-gray-800 text-title-sm dark:text-white sm:text-title-md">
                Enter Your Phone Number
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please provide your mobile number to proceed with the registration.
              </p>
            </div>
            
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="flex items-center gap-2 px-4 border-2 border-r-0 rounded-l-lg bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-800">
                    <img src="https://purecatamphetamine.github.io/country-flag-icons/3x2/MY.svg" alt="MY" className="w-5 h-auto rounded-sm shadow-sm" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">+60</span>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="123456789"
                    className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-r-lg outline-none border-gray-200 bg-white focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading || phoneNumber.length < 8} 
                className={`inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold transition rounded-lg shadow-theme-xs ${
                  phoneNumber.length >= 8 
                  ? 'bg-[#3D405B] text-white hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d] dark:shadow-[0_0_20px_rgba(61,64,91,0.5)]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                }`}
              >
                {isLoading ? "Processing..." : "Continue"}
              </button>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8 text-center">
              <h1 className="mb-3 font-bold text-gray-800 text-title-sm dark:text-white sm:text-title-md">
                Verify Your Phone Number
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We've sent a 6-digit code to <span className="font-bold text-gray-900 dark:text-white">+60 {phoneNumber}</span>. Please provide the code to proceed with the registration.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    ref={(el) => { otpInputs.current[index] = el; }}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-12 h-14 text-center text-xl font-bold transition-all border-2 rounded-lg outline-none border-gray-200 bg-white focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40"
                  />
                ))}
              </div>

              <button 
                type="button" 
                onClick={handleVerifyOtp} 
                disabled={otp.join("").length < 6 || isLoading} 
                className={`inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold transition rounded-lg shadow-theme-xs ${
                  otp.join("").length === 6 
                  ? 'bg-[#3D405B] text-white hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d] dark:shadow-[0_0_20px_rgba(61,64,91,0.5)]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                }`}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>

              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Resend code in <span className="font-bold text-blue-600 dark:text-blue-400">{timer}s</span>
                  </p>
                ) : (
                  <button type="button" onClick={handleSendOtp} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
                    Resend Code
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 text-center">
          <p className="text-sm font-normal">
            <span className="text-gray-500 dark:text-gray-400">Having trouble? </span>
            <Link href="/support" className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Contact Support
            </Link>
          </p>
        </div>

        <div className="mt-8 p-4 rounded-xl flex gap-3 border transition-all bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          <p className="text-xs leading-relaxed text-blue-900 dark:text-blue-100">
            Standard SMS rates may apply. Your mobile number is used solely for <span className="font-bold text-blue-700 dark:text-blue-300">secure account registration</span> and <span className="font-bold text-blue-700 dark:text-blue-300">identity verification</span>.
          </p>
        </div>
      </div>

      <p className="relative mt-8 text-xs text-gray-400 dark:text-gray-200 text-center z-10">
        &copy; {new Date().getFullYear()} DTCOB Banking Services. All rights reserved.
      </p>
    </div>
  );
}