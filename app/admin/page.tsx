"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useState } from "react";

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

async function fetchData(): Promise<Car[]> {
  return await client.fetch("*[_type == 'car']");
}

export default function AdminDashboard() {
  const [carData, setCarData] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [carCount, setCarCount] = useState<number>(0);
  const [car, setCar] = useState<Car>({
    _id: "",
    name: "",
    type: "",
    fuelCapacity: "",
    transmission: "",
    seatingCapacity: "",
    pricePerDay: "",
    image: { asset: { _ref: "", _type: "image" } },
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchData();
        setCarData(data);
        setCarCount(data.length);
      } catch (error) {
        setError("Something went wrong: " + error);
      }
    };
    getCars();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setImageFile(files[0]);
    } else {
      setCar({ ...car, [name]: value });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      let uploadedImage = null;
  
      // If there's an image, upload it
      if (imageFile) {
        const imageAsset = await client.assets.upload("image", imageFile, {
          filename: imageFile.name,
        });
        uploadedImage = imageAsset._id;
      }
  
      // Prepare car data to send to Sanity
      const carDataToSubmit = {
        _type: "car",
        name: car.name,
        type: car.type,
        fuelCapacity: car.fuelCapacity,
        transmission: car.transmission,
        seatingCapacity: car.seatingCapacity,
        pricePerDay: car.pricePerDay,
        image: uploadedImage
          ? { _type: "image", asset: { _ref: uploadedImage } }
          : car.image,
      };
  
      if (car._id) {
        // Update the car if _id is present
        await client
          .patch(car._id)
          .set(carDataToSubmit)
          .commit();
  
        // No need to increment carCount for update
      } else {
        // Create a new car if no _id
        await client.create(carDataToSubmit);
        setCarCount(carCount + 1); // Increment count only when adding a new car
      }
  
      // Reset form after submission
      setCar({
        _id: "",
        name: "",
        type: "",
        fuelCapacity: "",
        transmission: "",
        seatingCapacity: "",
        pricePerDay: "",
        image: { asset: { _ref: "", _type: "image" } },
      });
      setImageFile(null);
  
      // Refresh the list after adding/updating a car
      const updatedCars = await fetchData();
      setCarData(updatedCars);
    } catch (error) {
      console.error("Error submitting car data:", error);
      setError("Something went wrong while adding or updating the car.");
    }
  };
  

  const handleDelete = async (id: string) => {
    try {
      await client.delete(id);
      setCarData(carData.filter((item) => item._id !== id));
      setCarCount(carCount - 1);
    } catch (error) {
      console.error("Error deleting car:", error);
      setError("Something went wrong while deleting the car.");
    }
  };

  const handleEdit = (item: Car) => {
    setCar(item); // Set the form with the existing car details
  };

  return (<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 p-6">
    <div className="w-full md:w-2/3 ml-0 md:ml-1/3 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Total Cars: {carCount}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-6">
        {carData.map((item) => (
         <div
         key={item._id}
         className="flex flex-wrap items-center gap-6 bg-white p-4 rounded-lg shadow-md w-full max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] h-auto"
       >
         <p className="text-gray-500 font-bold">#{item._id.slice(0, 6)}</p>
         <Image
           src={urlFor(item.image.asset._ref).url()}
           width={200}
           height={200}
           alt={item.name}
           className="rounded"
         />
         <div className="flex flex-col">
           <h2 className="text-lg font-semibold">{item.name}</h2>
           <p className="text-gray-600">{item.type}</p>
           <p className="text-gray-600">Fuel: {item.fuelCapacity}</p>
           <p className="text-gray-600">Transmission: {item.transmission}</p>
           <p className="text-gray-600">Seats: {item.seatingCapacity}</p>
           <p className="text-green-600 font-bold">{item.pricePerDay}</p>
         </div>
         <div className="flex lg:gap-6">
           <button
             onClick={() => handleEdit(item)}
             className="text-4xl text-blue-600 hover:text-blue-800"
           >
             <MdEdit />
           </button>
           <button
             onClick={() => handleDelete(item._id)}
             className="text-4xl text-red-600 hover:text-red-800"
           >
             <MdDelete />
           </button>
         </div>
       </div>
        ))}
      </div>
    </div>
  
    {/* Add/Edit Car Form */}
    <div className="w-full md:w-1/3 lg:fixed top-44 right-0 md:right-[100px] bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {car._id ? "Edit Car" : "Add New Car"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={car.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Car Type"
          value={car.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="fuelCapacity"
          placeholder="Fuel Capacity"
          value={car.fuelCapacity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={car.transmission}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="seatingCapacity"
          placeholder="Seating Capacity"
          value={car.seatingCapacity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="pricePerDay"
          placeholder="Price Per Day"
          value={car.pricePerDay}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {car._id ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  </div>
    );
}
