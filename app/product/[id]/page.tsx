import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image"; 
import Link from "next/link";
import left1 from "../../../public/images/view1.png";
import left3 from "../../../public/images/View 3.png";
import profile1 from "../../../public/images/Profill.png";
import profile2 from "../../../public/images/Profill2.png";
import SideBar from "@/app/component/sidebar";
import CarCarts from "@/app/component/rentCarCats";

interface Car {
  _id: string;
  name: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  originalPrice?: string;
  tags?: string[];
}

async function getData(id: string): Promise<Car | null> {
  const fetchData = await client.fetch(`*[_type == 'car' && _id == $id][0]`, {
    id,
  });
  return fetchData || null;
}

export default async function CarContent({
  params,
}: {
  params: { id: string };
}) {
  const car = await getData(params.id);

  if (!car) {
    notFound();
  }

  const {
    name,
    type,
    fuelCapacity,
    transmission,
    seatingCapacity,
    pricePerDay,
    image,
    originalPrice,
  } = car;

  const imageUrl = image?.asset?._ref
    ? urlFor(image.asset._ref).url()
    : "/images/fallback.png";

  return (
    <>
      <div className="w-full h-full top-[124px] flex">
        <SideBar />
        <div>
          <div className="lg:w-auto w-[362px] flex flex-wrap justify-center items-center">
            <div className="lg:ml-40 screenLeft lg:w-[1140px] lg:h-full lg:flex flex-col">
              {/* Large Image */}
              <div className="flex flex-col lg:flex-row p-6 rounded-lg">
                {/* Left Section */}
                <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
                  {/* Large Image */}
                  <div className="bg-white w-full h-auto lg:w-[492px] lg:h-[360px] mb-6 ml-4">
                    
                    <Image
                      src={imageUrl}
                      alt={`${name} Image`}
                      className="mt-44 object-fill rounded-lg"
                      width={402}
                      height={22}
                    />
                  </div>

                  {/* Small Images */}
                  <div className="flex gap-5 w-[328px] h-[64px] lg:w-full lg:mr-[7.5%] ml-2">
                    <div className="lg:w-[148px] lg:h-[124px] w-[96px] h-[96px]">
                      <Image
                        src={imageUrl}
                        alt="Small Image 1"
                        width={148}
                        height={124}
                        objectFit="cover"
                        className="w-full h-full object-fill rounded-lg"
                      />
                    </div>
                    <div className="lg:w-[148px] lg:h-[124px] w-[96px] h-[96px]">
                      <Image
                        src={left1}
                        alt="Small Image 2"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="lg:w-[148px] lg:h-[124px] w-[96px] h-[96px]">
                      <Image
                        src={left3}
                        alt="Small Image 3"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[328px] h-[408px] lg:ml-1 ml-auto mt-20 lg:mt-0 lg:w-[492px] lg:h-auto bg-white shadow-md rounded-lg p-6">
                  {/* Title */}
                  <h3 className="text-[28px] lg:text-[34px] font-bold text-gray-900 mb-2">
                    {name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <p className="text-yellow-500 text-[20px] font-semibold">
                      ★★★★☆
                    </p>
                    <span className="text-gray-600 text-[14px] ml-2">
                      440+ Reviews
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 lg:text-[20px] text-[12px] mb-6">
                    {name} has become the embodiment of {name}’s outstanding
                    performance, inspired by the most unforgiving proving
                    ground, the “race track”.
                  </p>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-600 text-[10px] lg:text-[20px] mb-8">
                    <div>
                      <span className="font-bold text-labelTxt">Type Car:</span>
                      {type}
                    </div>
                    <div>
                      <span className="font-bold text-labelTxt">Capacity:</span>{" "}
                      {seatingCapacity}
                    </div>
                    <div>
                      <span className="font-bold text-labelTxt">Steering:</span>{" "}
                      {transmission}
                    </div>
                    <div>
                      <span className="font-bold text-labelTxt">Gasoline:</span>{" "}
                      {fuelCapacity}
                    </div>
                  </div>
{/* Pricing and Button */}
<div className="flex   items-start sm:items-center justify-between">
  {/* Price Details */}
  <div className="flex flex-col">
    <span className="text-[20px] lg:text-[24px] font-bold text-gray-900">
      {pricePerDay}
    </span>
    <p className="text-[18px]  text-gray-500 line-through">{originalPrice}</p>
  </div>

  {/* Rent Now Button */}
  <div className="mt-4 sm:mt-0 sm:ml-auto">
    <Link href={`/payment/${car._id}`}>
      <button className="w-full sm:w-auto h-[56px] bg-blue-500 text-white text-[16px] font-medium px-6 py-3 rounded-2xl shadow hover:bg-blue-600">
        Rent Now
      </button>
    </Link>
  </div>
</div>
</div>
</div>

            </div>

            <div className="bg-white lg:w-[1016px] lg:h-auto w-[328px] ml-5 h-auto lg:ml-20 mt-[92px] rounded-lg shadow-md p-4 lg:p-10">
              {/* Header */}
              <div className="flex items-center text-[20px] font-semibold mb-6">
                Reviews
                <span className="ml-2 w-[44px] text-white text-center h-[38px] rounded-[4px] p-1 bg-btnBg">
                  13
                </span>
              </div>

              {/* Review 1 */}
              <div className="w-full flex flex-col lg:flex-row items-start gap-4 mb-8">
                {/* Profile Picture */}
                <Image
                  src={profile1}
                  alt="Alex Stantion"
                  className="w-12 h-12 rounded-full object-cover"
                />
                {/* Review Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-[16px] lg:text-[20px]">
                    Alex Stantion
                  </h4>
                  <p className="text-sm text-gray-500">CEO at Bukalapak</p>
                  <p className="text-gray-700 mt-2 text-[14px] lg:text-[16px]">
                    We are greatly helped by the services of the MORENT
                    Application. Morent has low prices and also a wide variety
                    of cars with good and comfortable facilities. In addition,
                    the service provided by the officers is also very friendly
                    and very polite.
                  </p>
                  <div className="text-[12px] lg:text-sm text-gray-400 mt-2 flex justify-between items-center">
                    <span>20 July 2022</span>
                    <span className="text-yellow-500 text-[16px] lg:text-[20px]">
                      ★★★★★
                    </span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="w-full flex flex-col lg:flex-row items-start gap-4 mb-8">
                {/* Profile Picture */}
                <Image
                  src={profile2}
                  alt="Skylar Dias"
                  className="w-12 h-12 rounded-full object-cover"
                />
                {/* Review Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-[16px] lg:text-[20px]">
                    Skylar Dias
                  </h4>
                  <p className="text-sm text-gray-500">CEO at Amazon</p>
                  <p className="text-gray-700 mt-2 text-[14px] lg:text-[16px]">
                    We are greatly helped by the services of the MORENT
                    Application. Morent has low prices and also a wide variety
                    of cars with good and comfortable facilities. In addition,
                    the service provided by the officers is also very friendly
                    and very polite.
                  </p>
                  <div className="text-[12px] lg:text-sm text-gray-400 mt-2 flex justify-between items-center">
                    <span>20 July 2022</span>
                    <span className="text-yellow-500 text-[16px] lg:text-[20px]">
                      ★★★★★
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CarCarts />
          </div>
        </div>
      </div>
    </>
  );
}
