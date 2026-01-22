"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@/icons/chevron-left.svg";

export default function BusinessMalaysianInfo() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "Jane Doe",
    nric: "000000-00-0000",
    dobDay: "01",
    dobMonth: "January",
    dobYear: "2001",
    phoneCode: "+60",
    phoneNumber: "123456789",
    streetAddress: "Jalan SS15/1H",
    postal: "40000",
    city: "Subang Jaya",
    state: "Selangor",
    country: "Malaysia",
  });

  const handleNavigation = () => router.push('/business_malaysian_email');

  if (!mounted) return null;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-[#F9FAFB] dark:bg-gray-950 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[200px] md:h-[320px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-[#3D405B]/10 dark:fill-gray-800/40" d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,0L0,0Z"></path>
        </svg>
      </div>

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'url(/images/business_picts.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

      <div className="absolute bottom-0 left-0 w-full leading-none z-0">
        <svg className="relative block w-full h-[150px] md:h-[250px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-[#3D405B]/5 dark:fill-gray-800/20" fillOpacity="1" d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L0,320Z"></path>
        </svg>
      </div>

      <div className="absolute top-6 left-4 right-4 flex justify-between items-center max-w-7xl mx-auto w-full z-20">
        <button type="button" onClick={() => router.push('/business_malaysian_phone')} className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-[#3D405B] dark:text-gray-400 dark:hover:text-white">
          <ChevronLeftIcon className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center">
          <Image src="/images/logo/logo-dark.svg" alt="Logo" width={50} height={50} className="dark:hidden" />
          <Image src="/images/logo/logo-light.svg" alt="Logo" width={50} height={50} className="hidden dark:block" />
          <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 uppercase tracking-tight">DTCOB</h1>
        </div>
      </div>

      <div className="relative w-full max-w-4xl mt-10 z-10">
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-bold text-gray-800 text-title-sm dark:text-white sm:text-title-md">
            Verify Your Personal Information
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please make sure all information match your official documents.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">Full Name <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">NRIC <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none" value={formData.nric} onChange={(e) => setFormData({ ...formData, nric: e.target.value })} />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">Date of Birth <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <select value={formData.dobDay} onChange={(e) => setFormData({ ...formData, dobDay: e.target.value })} className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none">
                      {Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0")).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="relative">
                    <select value={formData.dobMonth} onChange={(e) => setFormData({ ...formData, dobMonth: e.target.value })} className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none">
                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="relative">
                    <select value={formData.dobYear} onChange={(e) => setFormData({ ...formData, dobYear: e.target.value })} className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none">
                      {Array.from({ length: 100 }, (_, i) => (2025 - i).toString()).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">Mobile Number <span className="text-red-500">*</span></label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-4 py-3 border-2 rounded-lg bg-gray-50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed">
                    <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/MY.svg`} alt="MY" className="w-5 h-auto rounded-sm" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{formData.phoneCode}</span>
                  </div>
                  <input type="text" className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">Street Address <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none" value={formData.streetAddress} onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">Postal Code <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none" value={formData.postal} onChange={(e) => setFormData({ ...formData, postal: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">City <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">State <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-4 py-3 text-sm font-medium transition-all border-2 rounded-lg outline-none bg-white border-gray-200 text-gray-800 focus:border-[#3D405B] focus:ring-4 focus:ring-[#3D405B]/10 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:focus:border-[#5c6185] dark:focus:ring-[#3D405B]/40 appearance-none" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">Country <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 px-4 py-3 border-2 rounded-lg bg-gray-50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed justify-between">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{formData.country}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 pt-4 flex flex-col items-center">
              <p className="mb-6 text-xs text-gray-500 dark:text-gray-400 text-center">
                By clicking continue, you confirm that the information provided is accurate and belongs to you.
              </p>
              
              <button onClick={handleNavigation} className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold transition rounded-lg bg-[#3D405B] text-white hover:bg-[#2c2f42] dark:bg-[#3D405B] dark:hover:bg-[#4a4e6d] active:scale-[0.98]">
                Continue
              </button>

              <div className="mt-5 text-center">
                <p className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Having trouble? </span>
                  <Link href="/support" className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    Contact Support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="relative mt-12 text-xs text-gray-400 dark:text-gray-200 text-center z-10">
        &copy; {new Date().getFullYear()} DTCOB Banking Services. All rights reserved.
      </p>
    </div>
  );
}