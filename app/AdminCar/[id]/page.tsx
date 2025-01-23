import Image from "next/image";
import { RiHome5Fill } from "react-icons/ri";
import { IoCarOutline } from "react-icons/io5";
import { TbSettings } from "react-icons/tb";
import { CgInsights } from "react-icons/cg";
import { CiCreditCard1 } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { RiSunFill } from "react-icons/ri";
import { IoMoonOutline } from "react-icons/io5";
import { LogOut } from "lucide-react";
import map from "../../../public/images/Maps.png";
import AdminCar2 from "../../../public/images/Car5.png";
import AdminCar3 from "../../../public/images/Car6.png";
import AdminCar4 from "../../../public/images/Car7.png";
import topCarLeft from "../../../public/images/Top 5 Car left.png";
import topCarRight from "../../../public/images/top5Car sm.png";
import Inputs from "../../component/input";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";

interface Car {
  // _id: string;
  name: string;
  type: string;
  // fuelCapacity: string;
  // transmission: string;
  // seatingCapacity: string;
  pricePerDay: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  // originalPrice?: string;
  tags?: string[];
}

async function getData(id: string): Promise<Car | null> {
  const fetchData = await client.fetch(`*[_type == 'car' && _id == $id][0]`, {
    id,
  });
  return fetchData || null;
}

export default async function AdminCar({
  params,
}: {
  params: { id: string };
}) {
  const car = await getData(params.id);

  if (!car) {
    notFound();
  }

  const { 
    // _id,
    name ,
    type,
    // fuelCapacity,
    // transmission,
    // seatingCapacity,
    pricePerDay,
    image,
    // originalPrice,
  } = car;

  const imageUrl = image?.asset?._ref
    ? urlFor(image.asset._ref).url()
    : "/images/fallback.png";


const obj=[
    {
      id:1,
      name : name,
      image : imageUrl,
      brand : "Sport Car",
      day : "Today",
      price : pricePerDay
    },
    {
      id:2,
      name : "Nisa GT -R",
      image : AdminCar2,
      brand : "Sport Car",
      day : "25 July",
      price : 80.00
    },
    {
      id:3,
      name : "Tesla Model 3",
      image : AdminCar3,
      brand : "Electric",
      day : "30 July",
      price :  80.00
    },
    {
      id:4,
      name : "Rolls-Royce",
      image : AdminCar4,
      brand : "Sedan",
      day : "1 August",
      price : 80.00
    }
  ]
  
  return (
    <>
    <div className="AdminCar lg:w-[1440px]   lg:h-[900px] h-[1273px] bg-screenBg lg:flex">
        <div className="w-[286px] h-[900px] bg-white lg:block hidden ">
          <p className="text-[#94A7CB] text-[12px] font-semibold text-justify  ml-[24px] mt-[44px]">
            MAIN MENU
          </p>
          <div className="w-[200px] h-[56px] ml-[16px] flex bg-btnBg text-white rounded-[10px] mt-[24px] justify-start items-center gap-2 pl-4">
            <RiHome5Fill /> <span className="text-[16px]">Dashboard</span>
          </div>
          <div className="w-[116px] h-[28px] text-lablelTxt flex gap-[12px] mt-[24px] ml-[24px]">
            <IoCarOutline /> <span>Car Rent</span>
          </div>
          <div className="w-[116px] h-[28px] text-lablelTxt flex gap-[12px] mt-[24px] ml-[24px]">
            <CgInsights /> <span>Insight</span>
          </div>
          <div className="w-[116px] h-[28px] text-lablelTxt flex gap-[12px] mt-[24px] ml-[24px]">
            <CiCreditCard1 /> <span>Reimburse</span>
          </div>
          <div className="w-[116px] h-[28px] text-lablelTxt flex gap-[12px] mt-[24px] ml-[24px]">
            <IoChatboxEllipsesOutline /> <span>Inbox</span>
          </div>
          <div className="w-[116px] h-[28px] text-lablelTxt flex gap-[12px] mt-[24px] ml-[24px]">
            <LuCalendarDays /> <span>Calender</span>
          </div>
          <p className="text-[#94A7CB] text-[12px] font-semibold text-justify  ml-[24px] mt-[45%]">
            PREFERENCES
          </p>
          <div className="w-[212px] h-[56px] ml-[16px] flex text-lablelTxt rounded-[10px] mt-[24px] justify-start items-center gap-2 pl-4">
            <TbSettings /> <span className="text-[16px]">Setting</span>
          </div>
          <div className="w-[212px] h-[56px] ml-[16px] flex  text-lablelTxt rounded-[10px] mt-[24px] justify-start items-center gap-2 pl-4">
            <IoIosHelpCircleOutline />{" "}
            <span className="text-[16px]">Help & Center</span>
          </div>
          <div className="w-[212px] h-[56px] ml-[16px] flex text-lablelTxt rounded-[10px] mt-[24px] justify-start items-center gap-2 pl-4">
            <CiDark /> <span className="text-[16px]">Dark Mode</span>{" "}
            <div className="text-white bg-btnBg rounded-full">
              <RiSunFill />
            </div>
            <IoMoonOutline />
          </div>
          <div className="gap-[12px] ml-[32px]  flex text-lablelTxt mt-[30%]">
            {" "}
            <LogOut /> Log Out
          </div>
        </div>
        {/* Second Section */}
        <div className=" lg:w-[534px] lg:h-[866px] w-[372px] h-[1272px] bg-white mt-[32px] lg:ml-[108px] rounded-[10px]">
          <p className="mt-[24px] ml-[24px] font-bold text-[20px]">
            {" "}
            Details Rental
          </p>
          <Image
            src={map}
            alt="Map Image"
            className="lg:w-[445px] w-[395px] h-[272px] mt-[24px] lg:ml-[23px] rounded-[10px]"
          />
          
<Inputs/>
          <div className=" w-[352px] h-[73px]  mt-[24px] ml-[24px] flex ">
            <div className="w-[132] h-[72px]">
              <Image
                src={imageUrl}
                width={142}
                height={72}
                alt="Card Image"
                className="rounded-md mt-10"
              />
            </div>
            <h1 className="text-[24px] font-bold text-black pl-[24px] pt-[24px]">
            {name}
              <div className="text-[16px] text-lablelTxt mt-[12px] font-medium">
                {type} Car
              </div>
            </h1>
          </div>
             <hr className=" items-center text-center m-[11px] mt-[24px]" />
            <div className="totalRental justify-around flex lg:mt-">
              <span className="lg:text-[20px] text-[16px]  mt-3 lg:mr-24 font-semibold text-black">
                Total Rental Price
              </span>
              <span className="lg:text-[32px] mt-2  text-[20px] font-bold text-black">
                {pricePerDay}
              </span>
            </div>
            <p className="text-[14px]  text-gray-500 ml-12">
              Overall price rental
            </p>
          </div>
        <div className="w-[524px] h-[836px]  mt-[32px] lg:ml-[108px]  rounded-[10px]">
          <div className="w-[524px] h-[320px]   lg:flex   ml-8 lg:ml-0">
            {/* <Image src={RentalCar} alt="5 rental Car Image"/> */}

            <Image src={topCarLeft} alt="5 rental Car Image" width={314} />
            <Image src={topCarRight} alt="5 rental Car Image" width={314} />
          </div>

          <div className="lg:w-[524px] w-[358px] h-[480px] mt-[100%]  ml-2 lg:mt-[32px] rounded-[10px] bg-white">
            <div className="flex lg:justify-center items-center pt-4 ml-4  mb-8 lg:gap-x-64 gap-x-24">
              <p className="text-lg font-bold">Recent Transaction</p>
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                <a href="/categories">View All</a>
              </p>
            </div>
            <div className="'lg:w-[476px]  w-[358px] h-[376px] ">
              {
              obj.map((val)=>(
              <div key={val.id} className="lg:w-[476px] w-[348px]  h-[70px] flex ml-1 lg:ml-10 justify-around bg-white mt-[14px]">
                <Image src={val.image} alt={val.name} width={132} height={70}/>
                
                <div className="w-[108px] h-[48px] lg:ml-4 ml-5 mt-4">
                  <h1 className="text-[16px] font-bold">{val.name}</h1>
                  <p className="text-lablelTxt text-[12px] font-semibold">
                    {val.brand}
                  </p>
                </div>
                <div className="w-[108px] h-[48px] ml-7 lg:ml-[154px] mt-4">
                  <h1 className="text-12px] font-medium ">{val.day}</h1>
                  <p className="text[16px] font-bold">${val.price}</p>
                </div>
              </div>
              ))
             }
          </div>
        </div>
      </div>        
        </div>
    </>
  );
}
// 394