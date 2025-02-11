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

export default async function CarContent({ params }: { params: { id: string } }) {
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
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        {/* Car Details */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1">
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <Image
                src={imageUrl}
                alt={`${name} Image`}
                className="object-cover w-full h-auto"
                width={600}
                height={400}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-4">
              <Image
                src={imageUrl}
                alt="Thumbnail 1"
                className="object-cover rounded-lg"
                width={100}
                height={100}
              />
              <Image
                src={left1}
                alt="Thumbnail 2"
                className="object-cover rounded-lg"
                width={100}
                height={100}
              />
              <Image
                src={left3}
                alt="Thumbnail 3"
                className="object-cover rounded-lg"
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">{name}</h2>
            <p className="text-gray-600 text-sm lg:text-base mb-4">
              {name} is known for its excellent performance and design, inspired
              by racing standards.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm lg:text-base">
              <div>
                <span className="font-semibold">Type:</span> <span className=" text-blue-700"> {type}</span>
              </div>
              <div>
                <span className="font-semibold">Capacity:</span> <span className=" text-blue-700"> {seatingCapacity}</span>
              </div>
              <div>
                <span className="font-semibold">Steering:</span> <span className=" text-blue-700"> {transmission}</span>
              </div>
              <div>
                <span className="font-semibold">Fuel:</span><span className=" text-blue-700">  {fuelCapacity}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-900">{pricePerDay}</p>
                {originalPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    {originalPrice}
                  </p>
                )}
              </div>
              <Link href={`/payment/${car._id}`}>
                <button className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600">
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        </div>
{/* Reviews Section */}
<div className="mt-8 bg-white p-6 rounded-lg shadow">
  <h3 className="text-xl font-bold mb-6">Reviews</h3>

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
      <h4 className="font-bold text-gray-900 text-[16px] lg:text-[20px]">Alex Stantion</h4>
      <p className="text-sm text-gray-500">CEO at Bukalapak</p>
      <p className="text-gray-700 mt-2 text-[14px] lg:text-[16px]">
        Morent has affordable prices and a wide variety of cars. The service is friendly and professional.
      </p>
      <div className="text-[12px] lg:text-sm text-gray-400 mt-2 flex justify-between items-center">
        <span>20 July 2022</span>
        <span className="text-yellow-500 text-[16px] lg:text-[20px]">★★★★★</span>
      </div>
      
    <hr />
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
      <h4 className="font-bold text-gray-900 text-[16px] lg:text-[20px]">Skylar Dias</h4>
      <p className="text-sm text-gray-500">CEO at Amazon</p>
      <p className="text-gray-700 mt-2 text-[14px] lg:text-[16px]">
        Excellent variety of cars and top-notch service. Highly recommended!
      </p>
      <div className="text-[12px] lg:text-sm text-gray-400 mt-2 flex justify-between items-center">
        <span>20 July 2022</span>
        <span className="text-yellow-500 text-[16px] lg:text-[20px]">★★★★★</span>
      </div>
      <hr />
    </div>
  </div>
</div>


        <CarCarts />
      </div>
    </div>
  );
}
