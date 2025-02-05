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
import { useDispatch } from 'react-redux';
import { add } from '../redux/cartslice'
import Loading from "../loading"
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

// Fetch car data from Sanity
async function fetchData(): Promise<Car[]> {
  const data = await client.fetch(`*[_type == 'car']`);
  return data;
}

export default function Data() {
  const [carData, setCarData] = useState<Car[]>([]); 
  const [visibleCars, setVisibleCars] = useState(12);
  const [heartColors, setHeartColors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();

    const getCars = async () => {
      const cars = await fetchData();
      console.log(cars); // Log to check data fetching
      setCarData(cars);
    };

    getCars();
  }, []);

  const handleAdd = (product: Car) => {
    setHeartColors((prev) => ({
      ...prev,
      [product._id]: prev[product._id] === "gray" ? "red" : "gray",
    }));

    // Check if product is valid
    if (!product || !product._id) {
      console.error("Product is invalid:", product);
      return; // Exit early if product is invalid
    }

    const productToAdd = { ...product, product_id: product._id }; // Use _id
    dispatch(add({ ...productToAdd, _id: product._id })); // Ensure id is passed correctly
  };

  // Show more cars handler
  const showMoreCars = () => {
    setVisibleCars((prevVisible) => Math.min(prevVisible + 4, carData.length));
  };

  return (
    <div className="relative w-full min-h-screen p-6">
      {/* Header Section */}
      <div className="flex gap-12 lg:justify-center items-center mb-8 lg:gap-[1079px]">
        <p className="text-lg text-[#90A3BF] font-semibold">Popular Cars</p>
        <p className="text-sm text-blue-600 cursor-pointer hover:underline">
          <Link href="/categories">View All</Link>
        </p>
      </div>

      {/* Car Cards */}
      {carData.length === 0 ? (
        <div><Loading/></div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {carData.slice(0, visibleCars).map((car) => (
            <div
              key={car._id}
              className="w-full sm:w-[304px] md:w-[304px] lg:w-[304px] xl:w-[304px] h-[408px] bg-white rounded-xl shadow-md p-4 flex flex-col"
              data-aos="fade-up"
            >
              {/* Car Name and Type */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold w-full text-gray-800 flex flex-col">
                  {car.name}
                  <span className="text-sm text-gray-500">{car.type}</span>
                </span>
                <button onClick={() => handleAdd(car)}>
                  <IoHeartOutline
                    className={`ml-2 w-[24px] h-[24px] ${heartColors[car._id] === 'red' ? 'text-red-500' : 'text-gray-500'}`}
                  />
                </button>
              </div>

              {/* Car Image */}
              <div className="mb-4">
                <Image
                  src={urlFor(car.image.asset._ref).url()}
                  alt={`${car.name} Image`}
                  width={232}
                  height={132}
                  className="mx-auto mt-10 object-cover"
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
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">Rent Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show More Button */}
      {visibleCars < carData.length && (
        <div className="flex justify-center mt-8">
          <button
            className="w-[156px] h-[44px] bg-blue-600 rounded-[4px] text-white hover:bg-blue-700"
            onClick={showMoreCars}
          >
            Show More Cars
          </button>
        </div>
      )}
    </div>
  );
}
