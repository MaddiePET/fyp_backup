"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@/icons/chevron-left.svg";

export default function BusinessUserVerification() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<'existing' | 'new' | null>(null);

  const handleNext = () => {
    if (selectedOption === 'existing') {
      router.push('/login');
    } else if (selectedOption === 'new') {
      router.push('/business_malaysian_mykad');
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
          onClick={() => router.push("/")}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-[#3D405B] dark:text-gray-400 dark:hover:text-white"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Home
        </button>
        <div className="flex items-center"> 
          <Image src="/images/logo/logo-dark.svg" alt="Logo" width={50} height={50} className="dark:hidden" />
          <Image src="/images/logo/logo-light.svg" alt="Logo" width={50} height={50} className="hidden dark:block" />
          <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 uppercase tracking-tight">DTCOB</h1>
        </div>
      </div>

      <div className="relative w-full max-w-2xl z-10">
        <div className="mb-10 text-center">
            <h1 className="mb-3 font-bold text-gray-800 text-title-sm dark:text-white sm:text-title-md">
                Business Account User Verification
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Please verify your identity to proceed with account creation or login.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div
            onClick={() => setSelectedOption('existing')}
            className={`relative cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center group backdrop-blur-sm ${
              selectedOption === 'existing'
                ? 'border-[#3D405B] bg-white/90 shadow-lg ring-4 ring-[#3D405B]/10 dark:bg-gray-900/90 dark:border-[#5c6185] dark:ring-[#3D405B]/40'
                : 'border-gray-200 bg-white/70 hover:border-[#3D405B]/50 dark:border-gray-800 dark:bg-gray-900/70'
            }`}
          >
            {selectedOption === 'existing' && (
              <div className="absolute top-3 right-3 bg-[#3D405B] text-white p-1 rounded-full shadow-sm">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className={`mb-4 p-3 rounded-xl transition-colors ${
               selectedOption === 'existing' ? 'bg-[#3D405B] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-[#3D405B]/10 group-hover:text-[#3D405B] dark:bg-gray-800'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.675.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.675-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${selectedOption === 'existing' ? 'text-[#3D405B] dark:text-white' : 'text-gray-800 dark:text-white'}`}>
              Existing Business
            </h3>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">Log in to your existing business account</p>
          </div>

          <div
            onClick={() => setSelectedOption('new')}
            className={`relative cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center group backdrop-blur-sm ${
              selectedOption === 'new'
                ? 'border-[#3D405B] bg-white/90 shadow-lg ring-4 ring-[#3D405B]/10 dark:bg-gray-900/90 dark:border-[#5c6185] dark:ring-[#3D405B]/40'
                : 'border-gray-200 bg-white/70 hover:border-[#3D405B]/50 dark:border-gray-800 dark:bg-gray-900/70'
            }`}
          >
            {selectedOption === 'new' && (
              <div className="absolute top-3 right-3 bg-[#3D405B] text-white p-1 rounded-full shadow-sm">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className={`mb-4 p-3 rounded-xl transition-colors ${
               selectedOption === 'new' ? 'bg-[#3D405B] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-[#3D405B]/10 group-hover:text-[#3D405B] dark:bg-gray-800'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${selectedOption === 'new' ? 'text-[#3D405B] dark:text-white' : 'text-gray-800 dark:text-white'}`}>
              New Business
            </h3>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">Create a new business banking account</p>
          </div>
        </div>

        <div className="mt-6 w-full max-w-md mx-auto relative z-10">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold transition rounded-lg shadow-theme-xs relative z-10 ${
              selectedOption
                ? 'bg-[#3D405B] text-white hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
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
        </div>
      </div>

      <p className="relative mt-8 text-xs text-gray-400 dark:text-gray-200 z-10">
        &copy; {new Date().getFullYear()} DTCOB Banking Services. All rights reserved.
      </p>
    </div>
  );
}