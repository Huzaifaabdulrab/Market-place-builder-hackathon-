"use client";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { IoHeartSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { BiBell } from "react-icons/bi";
import filter from "../../public/images/filter.png";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const storedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim() || "";
const storedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim() || "";

export default function Navbar() {
  const route = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === storedEmail && password.trim() === storedPassword) {
      route.push("/admin");
    } else {
      alert("Incorrect credentials! Access is restricted to admins only.");
      setShowForm(false);
    }
  };

  return (
    <div className="w-full bg-white h-auto flex flex-wrap items-center justify-between p-4 border-b-2 border-gray-200">
      <div className="w-full flex justify-center md:justify-start md:w-auto">
        <h1 className={`text-[#3563e9] text-2xl md:text-3xl font-bold ${inter.className}`}>MORENT</h1>
      </div>
      
      <div className="relative w-full md:w-[50%] flex items-center mt-4 md:mt-0">
        <CiSearch className="absolute left-4 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Say something here"
          className="w-full pl-12 pr-12 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <Image
          src={filter}
          alt="Filter Icon"
          width={24}
          height={24}
          className="absolute right-4 cursor-pointer"
        />
      </div>
      
      <div className="flex items-center space-x-4 mt-4 md:mt-0 justify-center md:justify-end w-full md:w-auto">
        <Link href="/AdminLayout" className="p-2 border rounded-full hover:bg-gray-100">
          <BiBell className="w-6 h-6" />
        </Link>
        <Link href="/cart" className="p-2 border rounded-full hover:bg-gray-100">
          <IoHeartSharp className="w-6 h-6 text-red-600" />
        </Link>
        <button onClick={() => setShowForm(true)} className="p-2 border rounded-full hover:bg-gray-100">
          <IoMdSettings className="w-6 h-6" />
        </button>
        <div className="rounded-full overflow-hidden border border-gray-300">
          <Link href="/AdminCar">
            <div className="p-2 w-[44px] h-[44px]">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Link>
        </div>
      </div>
      
      {showForm && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-80 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-600">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-600">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:scale-105">Login</button>
                  <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">Close</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
