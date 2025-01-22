'use client';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { IoHeartOutline } from 'react-icons/io5';
import { BsFuelPumpFill } from 'react-icons/bs';
import { LuLoaderPinwheel } from 'react-icons/lu';
import { HiUsers } from 'react-icons/hi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

// Define the Car interface for type safety
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
  originalPrice?: string; // Optional field in case it's not always present
  tags?: string[]; // Optional array for additional tags
}

// Fetch car data from Sanity
async function fetchData(): Promise<Car[]> {
  const data = await client.fetch(`*[_type == 'car']`);
  return data;
}

export default function CarCarts() {
  const [carData, setCarData] = useState<Car[]>([]); // State for storing car data
  const [visibleCars, setVisibleCars] = useState(6); // State for visible car count (initial 6)
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch data and initialize AOS on component mount
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();

    const getCars = async () => {
      try {
        const cars = await fetchData();
        setCarData(cars);
      } catch (err) {
        setError('Failed to fetch car data.');
      }
    };

    getCars();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="relative w-full min-h-screen p-6 mt-20">
      {/* Header Section */}
      <div className="flex gap-[50px] lg:justify-center items-center mb-8 lg:gap-[1079px]">
        <p className="text-lg text-[#90A3BF] font-semibold">Popular Cars</p>
        <p className="text-sm text-blue-600 cursor-pointer hover:underline">
          <Link href="/categories">View All</Link>
        </p>
      </div>

      {/* Car Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {carData.slice(0, visibleCars).map((car) => (
          <div
            key={car._id}
            className="w-[304px] h-[408px] bg-white rounded-lg shadow-md p-4 flex flex-col"
            data-aos="fade-up"
          >
            {/* Car Name and Type */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold w-full text-gray-800 flex flex-col">
                {car.name}
                <span className="text-sm text-gray-500">{car.type}</span>
              </span>
              <IoHeartOutline className="ml-2 text-gray-500 w-[24px] h-[24px]" />
            </div>

            {/* Car Image */}
            <div className="mb-4">
              <Image
                src={urlFor(car.image.asset._ref).url()}
                alt={`${car.name} Image`}
                width={232}
                height={132}
                className="mx-auto mt-10"
                priority // To optimize loading of images
              />
            </div>

            {/* Car Specifications */}
            <div className="flex justify-between mt-14">
              <span className="flex items-center text-iconsCard gap-1 text-[14px] font-medium">
                <BsFuelPumpFill className="w-[24px] h-[24px]" /> {car.fuelCapacity}
              </span>
              <span className="flex items-center text-iconsCard gap-1 text-[14px] font-medium">
                <LuLoaderPinwheel className="w-[24px] h-[24px]" /> {car.transmission}
              </span>
              <span className="flex items-center text-iconsCard gap-1 text-[14px] font-medium">
                <HiUsers className="w-[24px] h-[24px]" /> {car.seatingCapacity}
              </span>
            </div>

            {/* Car Price and Rent Button */}
            <div className="flex justify-between items-center mt-7">
              <p className="text-xl font-semibold text-gray-800">
                {car.pricePerDay}
              </p>
              <Link href={`/product/${car._id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
    </div>
  );
}
