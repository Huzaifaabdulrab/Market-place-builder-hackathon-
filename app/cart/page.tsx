'use client';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../redux/cartslice"; // Ensure correct import
import { RootState } from "../redux/store";
import Image from "next/image";
import Link from "next/link";
import { BsFuelPumpFill } from "react-icons/bs";
import { LuLoaderPinwheel } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";
import { urlFor } from "@/sanity/lib/image";

// Ensure TypeData is correctly matched with the cart structure
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
}

const AddToCart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart) as Car[]; // Correct the type

  const handleRemove = (_id: string) => {
    dispatch(remove(_id)); // Handle by _id (string)
  };

  return (
    cartItems.length === 0 ? (
      <p className="text-center text-gray-500">Your cart is empty.</p>
    ) : (
      <div className="flex flex-wrap gap-6 justify-center mt-20">
        {cartItems.map((car) => (
          <div
            key={car._id}
            className="w-[304px] h-[340px] bg-white rounded-2xl shadow-md p-4 flex flex-col"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-800 flex flex-col">
                {car.name}
                <span className="text-sm text-gray-500">{car.type}</span>
              </span>
              <IoHeartOutline className="ml-2 text-gray-500 w-[24px] h-[24px]" />
            </div>

            {/* Image */}
            <Image
              src={urlFor(car.image.asset._ref).url()}
              alt={`${car.name} Image`}
              width={232}
              height={132}
              className="mx-auto mt-4 rounded-lg"
              priority
            />

            {/* Specifications */}
            <div className="flex justify-between mt-4 text-sm">
              <span className="flex items-center text-iconsCard gap-1">
                <BsFuelPumpFill className="w-[20px] h-[20px]" /> {car.fuelCapacity}
              </span>
              <span className="flex items-center text-iconsCard gap-1">
                <LuLoaderPinwheel className="w-[20px] h-[20px]" /> {car.transmission}
              </span>
              <span className="flex items-center text-iconsCard gap-1">
                <HiUsers className="w-[20px] h-[20px]" /> {car.seatingCapacity}
              </span>
            </div>

            {/* Price and Rent Now */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-bold text-gray-800">
                {car.pricePerDay}
              </p>
              <Link href={`/product/${car._id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Rent Now
                </button>
              </Link>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(car._id)}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )
  );
};

export default AddToCart;
