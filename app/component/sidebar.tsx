'use client'
import { Poppins } from "next/font/google";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle `isOpen` state
  };
  return (
    <>
    
      <div className="hidden lg:block w-[360px] h-[2206px] border bg-white">
    
      <div className=" mr-10">
          <FaBars onClick={toggleMenu} className="text-2xl cursor-pointer " />
        </div>
        <div className="w-[220px] h-[352px] mt-[32px] ml-[32px] gap-[32px]  ">
          <p className="sideNavTxt text-[12px] font-semibold text-sideNav mb-6">
            Type
          </p>
          <input
            type="checkbox"
            checked
            name="Sport"
            id="Sport"
            className="mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Sport <span className="text-sideNav"> (10)</span>
            <br />
          </span>
          <input
            type="checkbox"
            checked
            name="#"
            id="#"
            className=" mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            SUV <span className="text-sideNav"> (12)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            MPV <span className="text-sideNav"> (16)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Sedan <span className="text-sideNav"> (20)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Coupe <span className="text-sideNav"> (14)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Hatchback <span className="text-sideNav"> (14)</span>
            <br />
          </span>
        </div>

        <div className="w-[176px] h-[352px] mt-[32px] ml-[32px] gap-[32px] ">
          <p className="sideNavTxt text-[12px] font-semibold text-sideNav mb-6 ">
            CAPACITY
          </p>

          <input
            type="checkbox"
            checked
            name="#"
            id="#"
            className="mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            2 Person <span className="text-sideNav"> (10)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            4 Person <span className="text-sideNav"> (14)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            6 Person <span className="text-sideNav"> (12)</span>
            <br />
          </span>
          <input
            type="checkbox"
            checked
            name="#"
            id="#"
            className="mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            8 Person <span className="text-sideNav"> (16)</span>
            <br />
          </span>
        </div>
        <div className="rang">
          <div className="w-[176px] h-[352px]   ml-[32px] gap-[32px] ">
            <p className="sideNavTxt text-[12px] font-semibold text-sideNav mb-6 ">
              PRICE
            </p>
            <input type="range" className="w-[200px] h-[20px]" />
            <p
              className={`text-[20px] text-[#596780] font-semibold ${inter.className} `}
            >
              Max . $100.00
            </p>
          </div>
        </div>
        <div 
          className={`${
            isOpen ? "block" : "hidden"
          } fixed top-[5rem] right-6 w-24 h-72   bg-[#091057]  text-white transition-all duration-300 ease-in-out md:hidde`}
        >
          <div className="hidden lg:block w-[360px] h-[2206px] border bg-white">
        <div className="w-[220px] h-[352px] mt-[32px] ml-[32px] gap-[32px]  ">
          <p className="sideNavTxt text-[12px] font-semibold text-sideNav mb-6">
            Type
          </p>
          <input
            type="checkbox"
            checked
            name="Sport"
            id="Sport"
            className="mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Sport <span className="text-sideNav"> (10)</span>
            <br />
          </span>
          <input
            type="checkbox"
            checked
            name="#"
            id="#"
            className=" mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            SUV <span className="text-sideNav"> (12)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            MPV <span className="text-sideNav"> (16)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Sedan <span className="text-sideNav"> (20)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Coupe <span className="text-sideNav"> (14)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            Hatchback <span className="text-sideNav"> (14)</span>
            <br />
          </span>
        </div>

        <div className="w-[176px] h-[352px] mt-[32px] ml-[32px] gap-[32px] ">
          <p className="sideNavTxt text-[12px] font-semibold text-sideNav mb-6 ">
            CAPACITY
          </p>

          <input
            type="checkbox"
            checked
            name="#"
            id="#"
            className="mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            2 Person <span className="text-sideNav"> (10)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            4 Person <span className="text-sideNav"> (14)</span>
            <br />
          </span>
          <input type="checkbox" name="#" id="#" className="mb-6  mr-2" />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            6 Person <span className="text-sideNav"> (12)</span>
            <br />
          </span>
          <input
            type="checkbox"
            checked
            name="#"
            id="#"
            className="mb-6  mr-2"
          />
          <span className="text-gray-700  tracking-[-2%] text-[20px]">
            8 Person <span className="text-sideNav"> (16)</span>
            <br />
          </span>
        </div>
        <div className="rang">
          <div className="w-[176px] h-[352px]   ml-[32px] gap-[32px] ">
            <p className="sideNavTxt text-[12px] font-semibold text-sideNav mb-6 ">
              PRICE
            </p>
            <input type="range" className="w-[200px] h-[20px]" />
            <p
              className={`text-[20px] text-[#596780] font-semibold ${inter.className} `}
            >
              Max . $100.00
            </p>
          </div>
        </div>
      
</div>

</div>
      </div>

    </>
  );
}
