
import ad1 from "../../public/images/Ads 1.png";
import ad2 from "../../public/images/Ads 2.png";
import { Button } from "@/components/ui/button";
import { BsArrowDownUp } from "react-icons/bs";
import Image from "next/image";
import Car from "./page";

export default function Screen() {
  return (
    <>
      <div className="w-full h-auto">
        {/* Card Section */}
        <div className="flex flex-col justify-center lg:flex-row space-y-4 lg:space-y-0 lg:space-x-[30px]" data-aos="fade-right">
          {/* First Card */}
          <div className="relative w-full lg:w-[640px] h-[380px] rounded-[10px]">
            <Image
              src={ad1}
              alt="Advertisement 1"
              className="object-cover w-full h-full rounded-[10px]"
            />
            <div className="absolute top-7 left-4 w-[90%] md:w-[70%] space-y-4">
              <h1 className="lg:w-[272px] lg:h-[96px] text-[20px] md:text-[28px] font-semibold text-white">
                The Best Platform for Car Rental
              </h1>
              <div className="lg:w-[284px] lg:h-[48px] text-[12px] md:text-[16px] text-gray-50">
               <p> Ease of doing a car rental safely and reliably. Of course, at a low price.
               </p><Button className=" block w-[100px] md:w-[120px] h-[36px] md:h-[44px] bg-blue-500 text-white mt-4">
                Rental Car
              </Button>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="relative hidden lg:block w-full lg:w-[640px] h-[380px] rounded-[10px]" data-aos="fade-left">
            <Image
              src={ad2}
              alt="Advertisement 2"
              className="object-cover w-full h-full rounded-[10px]"
            />
            <div className="absolute top-7 left-4 w-[90%] md:w-[70%] space-y-4">
              <h1 className="lg:w-[272px] lg:h-[96px] text-[20px] md:text-[28px] font-semibold text-white">
              Easy way to rent a car at a low price
              </h1>
              <div className="lg:w-[284px] lg:h-[48px] text-[12px] md:text-[16px] text-gray-50">
               <p>
               Providing cheap car rental services and safe and comfortable facilities.
               </p><Button className=" block w-[100px] md:w-[120px] h-[36px] md:h-[44px] bg-blue-500 text-white mt-4">
                Rental Car
              </Button>
              </div>
              </div>
          </div>
        </div>


        {/* Pick-Up and Drop-Off Section */}
                <div className="flex flex-col justify-center lg:flex-row space-y-4 lg:space-y-0 lg:space-x-[20px] mt-8">
          {/* Pick-Up */}
          <div className="w-full lg:w-[600px] bg-white p-4 rounded-lg shadow-md">
            <h2 className="flex items-center space-x-2">
              <span className="bg-gray-300 w-[20px] h-[20px] rounded-full flex justify-center items-center">
                <span className="bg-blue-700 w-[10px] h-[10px] rounded-full"></span>
              </span>
              <span className="font-bold text-[16px]">Pick-Up</span>
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {/* Location */}
              <div className="flex-1">
                <label className="text-[14px] font-bold">Location</label>
                <select className="w-full h-[36px] mt-2 text-[12px] text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="">
                  <option value="" disabled>Select Country</option>
                </select>
              </div>
              {/* Date */}
              <div className="flex-1">
                <label className="text-[14px] font-bold">Date</label>
                <select className="w-full h-[36px] mt-2 text-[12px] text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="">
                  <option value="" disabled>Select Date</option>
                </select>
              </div>
              {/* Time */}
              <div className="flex-1">
                <label className="text-[14px] font-bold">Time</label>
                <select className="w-full h-[36px] mt-2 text-[12px] text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="">
                  <option value="" disabled>Select Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Arrow Button */}
          <div className="flex justify-center items-center w-[48px] h-[48px] bg-blue-600 text-white rounded-md self-center lg:self-auto">
            <BsArrowDownUp />
          </div>

          {/* Drop-Off */}
          <div className="w-full lg:w-[600px] bg-white p-4 rounded-lg shadow-md">
            <h2 className="flex items-center space-x-2">
              <span className="bg-gray-300 w-[20px] h-[20px] rounded-full flex justify-center items-center">
                <span className="bg-blue-700 w-[10px] h-[10px] rounded-full"></span>
              </span>
              <span className="font-bold text-[16px]">Drop-Off</span>
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {/* Location */}
              <div className="flex-1">
                <label className="text-[14px] font-bold">Location</label>
                <select className="w-full h-[36px] mt-2 text-[12px] text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="">
                  <option value="" disabled>Select Country</option>
                </select>
              </div>
              {/* Date */}
              <div className="flex-1">
                <label className="text-[14px] font-bold">Date</label>
                <select className="w-full h-[36px] mt-2 text-[12px] text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="">
                  <option value="" disabled>Select Date</option>
                </select>
              </div>
              {/* Time */}
              <div className="flex-1">
                <label className="text-[14px] font-bold">Time</label>
                <select className="w-full h-[36px] mt-2 text-[12px] text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="">
                  <option value="" disabled>Select Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Car />
    </>
  );
}