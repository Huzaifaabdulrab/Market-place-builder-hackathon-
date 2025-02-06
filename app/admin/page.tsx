"use client";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

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

// Use these credentials for login (must be prefixed with NEXT_PUBLIC_ so they're available client side)
const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL_DU?.trim() || "";
const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_DU?.trim() || "";

export default function AdminDashboard() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Car management states
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

  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === adminEmail && loginPassword === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  // Fetch car data once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const getCars = async () => {
        try {
          const data = await fetchData();
          setCarData(data);
          setCarCount(data.length);
        } catch (err) {
          setError("Something went wrong: " + err);
        }
      };
      getCars();
    }
  }, [isAuthenticated]);

  // Handle changes for the add/edit car form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setImageFile(files[0]);
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  // Handle add/update car form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedImage = null;
      if (imageFile) {
        const imageAsset = await client.assets.upload("image", imageFile, {
          filename: imageFile.name,
        });
        uploadedImage = imageAsset._id;
      }
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
        // Update the car if _id exists
        await client.patch(car._id).set(carDataToSubmit).commit();
      } else {
        // Create a new car if _id is empty
        await client.create(carDataToSubmit);
        setCarCount(carCount + 1);
      }
      // Reset the form
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
      const updatedCars = await fetchData();
      setCarData(updatedCars);
    } catch (err) {
      console.error("Error submitting car data:", err);
      setError("Something went wrong while adding or updating the car.");
    }
  };

  // Handle deleting a car
  const handleDelete = async (id: string) => {
    try {
      await client.delete(id);
      setCarData(carData.filter((item) => item._id !== id));
      setCarCount(carCount - 1);
    } catch (err) {
      console.error("Error deleting car:", err);
      setError("Something went wrong while deleting the car.");
    }
  };

  // Pre-fill form for editing an existing car
  const handleEdit = (item: Car) => {
    setCar(item);
  };

  // If not authenticated, show the login form
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    );
  }

  // If authenticated, display the dashboard
  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 p-6">
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
                <button onClick={() => handleEdit(item)} className="text-4xl text-blue-600 hover:text-blue-800">
                  <MdEdit />
                </button>
                <button onClick={() => handleDelete(item._id)} className="text-4xl text-red-600 hover:text-red-800">
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Add/Edit Car Form */}
      <div className="w-full md:w-1/3 lg:fixed top-44 right-0 md:right-[100px] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{car._id ? "Edit Car" : "Add New Car"}</h2>
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
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {car._id ? "Update Car" : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
}
