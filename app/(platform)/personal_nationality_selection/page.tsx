"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@/icons/chevron-left.svg";
import Label from "@/components/form/Label";

export default function PersonalNationalitySelection() {
  const router = useRouter();
  const [selectedNationality, setSelectedNationality] = useState<string>("");

  const handleNext = () => {
    if (selectedNationality === "Malaysian") {
      router.push("/personal_malaysian_mykad");
    } else if (selectedNationality === "Non-Malaysian") {
      router.push("/personal_non_malaysian_passport");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-[#F9FAFB] dark:bg-gray-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[200px] md:h-[320px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="fill-[#3D405B]/10 dark:fill-gray-800/40" 
            d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[150px] md:h-[250px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="fill-[#3D405B]/5 dark:fill-gray-800/20" 
            fillOpacity="1" 
            d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="absolute top-6 left-4 right-4 flex justify-between items-center max-w-7xl mx-auto w-full z-20">
        <button
          onClick={() => router.push("/personal_user_verification")}
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
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-bold text-gray-800 text-title-sm dark:text-white sm:text-title-md">
            Choose Your Nationality
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please select your nationality to proceed with the registration.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="block mb-2 text-center sm:text-left text-gray-800 dark:text-white/90">
              Nationality <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <select
                id="nationalitySelect"
                value={selectedNationality}
                onChange={(e) => setSelectedNationality(e.target.value)}
                className="w-full px-4 py-3 text-sm transition-all bg-white border-2 rounded-lg outline-none appearance-none border-gray-200 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40"
              >
                <option value="" disabled>Select your nationality</option>
                <option value="Malaysian">Malaysian (MyKad)</option>
                <option value="Non-Malaysian">Non-Malaysian (Passport)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full mx-auto">
          <button
            onClick={handleNext}
            disabled={!selectedNationality}
            className={`inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold transition rounded-lg shadow-theme-xs ${
              selectedNationality
                ? "bg-[#3D405B] text-white hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d] dark:shadow-[0_0_20px_rgba(61,64,91,0.5)]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
            }`}
          >
            Continue
          </button>

          <div className="mt-5 text-center">
            <p className="text-sm font-normal">
              <span className="text-gray-500 dark:text-gray-400">Having trouble? </span>
              <Link
                href="/support"
                className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="p-4 rounded-xl flex gap-3 border transition-all backdrop-blur-sm
              bg-blue-50/80 border-blue-200 
              dark:bg-blue-900/30 dark:border-blue-500/50 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <p className="text-xs leading-relaxed text-blue-900 dark:text-blue-100">
                Malaysian citizens are required to have their <span className="font-bold text-blue-700 dark:text-blue-300">MyKad</span> ready for
                e-KYC verification. Non-Malaysians must provide a valid <span className="font-bold text-blue-700 dark:text-blue-300">Passport</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="relative mt-8 text-xs text-gray-400 dark:text-gray-200 text-center z-10">
        &copy; {new Date().getFullYear()} DTCOB Banking Services. All rights reserved.
      </p>
    </div>
  );
}