'use client';

import { Poppins } from "next/font/google";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const FilterSection = ({
    title,
    options,
  }: {
    title: string;
    options: { label: string; count: number; checked?: boolean }[];
  }) => (
    <div className="w-[220px]  mt-[32px] ml-[32px] gap-[32px]">
      <p className="text-[12px] font-semibold text-sideNav mb-6">{title}</p>
      {options.map(({ label, count, checked }, index) => (
        <div key={index} className="mb-6 flex items-center">
          <input type="checkbox" defaultChecked={checked} className="mr-2" />
          <span className="text-gray-700 tracking-[-2%] text-[20px]">
            {label} <span className="text-sideNav">({count})</span>
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="flex ] lg:hidden p-2  left-12   border border-[#C3D4E9] rounded-full  absolute top-[7.9rem]   ">
        <FaBars onClick={toggleMenu}  className=" text-2xl cursor-pointer" />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 lg:left-auto h-[2100px] bg-white border transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-[360px] z-50`}
      >
        {/* Close Button for Mobile */}
        <div className="flex  justify-end lg:hidden p-4">
          <button
            onClick={toggleMenu}
            className="text-xl font-semibold text-gray-500 "
          >
            ✕
          </button>
        </div>

        {/* Filter Sections */}
        <FilterSection
          title="TYPE"
          options={[
            { label: "Sport", count: 10, checked: true },
            { label: "SUV", count: 12, checked: true },
            { label: "MPV", count: 16 },
            { label: "Sedan", count: 20 },
            { label: "Coupe", count: 14 },
            { label: "Hatchback", count: 14 },
          ]}
        />
        <FilterSection
          title="CAPACITY"
          options={[
            { label: "2 Person", count: 10, checked: true },
            { label: "4 Person", count: 14 },
            { label: "6 Person", count: 12 },
            { label: "8 Person", count: 16, checked: true },
          ]}
        />

        {/* Price Range */}
        <div className="w-[220px] mt-[32px] ml-[32px]">
          <p className="text-[12px] font-semibold text-sideNav mb-6">PRICE</p>
          <input type="range" className="w-full mb-2" />
          <p
            className={`text-[20px] text-[#596780] font-semibold ${inter.className}`}
          >
            Max. $100.00
          </p>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
