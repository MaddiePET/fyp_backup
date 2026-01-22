"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@/icons/chevron-left.svg";
import Label from "@/components/form/Label";
import EyeCloseIcon from "@/icons/eye-close.svg";
import EyeIcon from "@/icons/eye.svg";

interface User {
  username: string;
  email: string;
  name: string;
  avatar: string;
  securityPhrase: string;
  password: string;
}

const mockUsers: User[] = [
  {
    username: "johndoe",
    email: "john.doe@gmail.com",
    name: "John Doe",
    avatar: "/images/user/user-01.jpg",
    securityPhrase: "My first pet's name",
    password: "pw123",
  },
  {
    username: "gogosdnbhd",
    email: "gogo.sdnbhd@yahoo.com",
    name: "GoGo Sdn Bhd",
    avatar: "/images/user/user-02.jpg",
    securityPhrase: "My favorite drink",
    password: "pw123",
  },
];

export default function LogIn() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"username" | "confirm" | "password">("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setStep("confirm");
    } else {
      alert("Username not found. Please try again.");
    }
  };

  const handleConfirmYes = () => {
    setStep("password");
  };

  const handleGlobalBack = () => {
    if (step === "password") {
      setStep("confirm");
    } else if (step === "confirm") {
      setStep("username");
      setCurrentUser(null);
    } else {
      router.back();
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && password === currentUser.password) {
      localStorage.setItem("currentAccount", currentUser.name);
      router.push("/dashboard");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950" />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-[#F9FAFB] dark:bg-gray-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[200px] md:h-[320px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-[#3D405B]/10 dark:fill-gray-800/40" d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L0,0Z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[150px] md:h-[250px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-[#3D405B]/5 dark:fill-gray-800/20" fillOpacity="1" d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L0,320Z" />
        </svg>
      </div>
      <div className="absolute top-6 left-4 right-4 flex justify-between items-center max-w-7xl mx-auto w-full z-20">
        <button
          type="button"
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
        {step === "username" && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10 text-center">
              <h1 className="mb-3 font-bold text-gray-800 text-title-sm dark:text-white sm:text-title-md">Log In</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Please enter your username to log in.</p>
            </div>
            <form onSubmit={handleUsernameSubmit}>
              <div className="space-y-6">
                <div>
                  <Label className="block mb-2 text-center sm:text-left text-gray-800 dark:text-white/90">
                    Username <span className="text-error-500">*</span>
                  </Label>
                  <input
                    className="w-full px-4 py-3 text-sm transition-all bg-white border-2 rounded-lg outline-none border-gray-200 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40"
                    placeholder="Enter your username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white transition rounded-lg bg-[#3D405B] shadow-theme-xs hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d]"
                >
                  Continue
                </button>
              </div>
            </form>
            <div className="mt-5 text-center">
              <p className="text-sm font-normal">
                <span className="text-gray-500 dark:text-gray-400">Having trouble? </span>
                <Link href="/support" className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        )}

        {step === "confirm" && currentUser && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8 text-center">
              <h1 className="mb-6 font-bold text-gray-800 text-title-sm dark:text-white sm:text-title-md">Is this you?</h1>
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative w-24 h-24 overflow-hidden rounded-full ring-4 ring-[#3D405B]/20">
                  <Image src={currentUser.avatar} alt={currentUser.name} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">{currentUser.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                </div>
              </div>
              <div className="relative p-4 mb-8 rounded-2xl border-2 transition-all duration-300 text-center border-[#3D405B] bg-white shadow-lg ring-4 ring-[#3D405B]/10 dark:bg-gray-900 dark:border-[#5c6185] dark:ring-[#3D405B]/40">
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">"{currentUser.securityPhrase}"</p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleConfirmYes}
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white transition rounded-lg bg-[#3D405B] shadow-theme-xs hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d]"
              >
                Yes, that's me
              </button>
              <button
                type="button"
                onClick={handleGlobalBack}
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold transition bg-transparent border-2 rounded-lg text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                No, use different account
              </button>
            </div>
            <div className="mt-5 text-center">
              <p className="text-sm font-normal">
                <span className="text-gray-500 dark:text-gray-400">Having trouble? </span>
                <Link href="/support" className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        )}

        {step === "password" && currentUser && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-1 mb-8 text-center">
              <div className="relative w-20 h-20 mb-3 overflow-hidden rounded-full ring-4 ring-[#3D405B]/20">
                <Image src={currentUser.avatar} alt={currentUser.name} fill className="object-cover" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">{currentUser.name}</h2>
              <div className="inline-block px-6 py-2 rounded-full border-2 transition-all duration-300 border-[#3D405B] bg-white shadow-md ring-4 ring-[#3D405B]/10 dark:bg-gray-900 dark:border-[#5c6185] dark:ring-[#3D405B]/40">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">"{currentUser.securityPhrase}"</p>
              </div>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-6">
                <div>
                  <Label className="block mb-2 text-center sm:text-left text-gray-800 dark:text-white/90">
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 pr-12 text-sm transition-all bg-white border-2 rounded-lg outline-none border-gray-200 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 cursor-pointer -translate-y-1/2 right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white transition rounded-lg bg-[#3D405B] shadow-theme-xs hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d]"
                >
                  Log In
                </button>
                <div className="text-center">
                  <Link href="/reset-password" className="text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      <p className="relative mt-8 text-xs text-gray-400 dark:text-gray-200 z-10">
        &copy; {new Date().getFullYear()} DTCOB Banking Services. All rights reserved.
      </p>
    </div>
  );
}