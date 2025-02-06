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
// import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const storedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim() || "";
const storedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim() || "";

export default function Navbar() {
  // const { user } = useUser();
  const route = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Login Function (Fixed)
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
    <div
      id="navbar"
      className="w-full bg-white h-auto flex flex-col md:flex-row items-center justify-between p-4 md:p-8 border-b-2 border-b-[#e7eef6]"
    >
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 w-full md:w-auto">
        <h1 className={`logo ${inter.className} text-[#3563e9] text-[32px]`}>MORENT</h1>
        <div className="relative w-full md:w-[492px]">
          <CiSearch className="w-[24px] h-[24px] absolute top-1/2 left-3 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Say something here"
            className="border-2 border-[#e7eef6] w-full h-[44px] rounded-full p-2 pl-10 pr-12"
          />
          <Image
            src={filter}
            alt="Filter Icon"
            width={24}
            height={24}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-10 mt-4 md:mt-0">
        <Link href="/AdminLayout">
          <div className="w-[44px] h-[44px] flex justify-center items-center border border-[#C3D4E9] rounded-full opacity-80">
            <BiBell className="w-[24px] h-[24px]" />
          </div>
        </Link>

        <Link href="/cart">
          <div className="w-[44px] h-[44px] flex justify-center items-center border border-[#C3D4E9] rounded-full opacity-80">
            <IoHeartSharp className="w-[24px] h-[24px] text-red-700" />
          </div>
        </Link>

        <button onClick={() => setShowForm(true)}>
          <div className="w-[44px] h-[44px] flex justify-center items-center border border-[#C3D4E9] rounded-full opacity-80">
            <IoMdSettings className="w-[24px] h-[24px]" />
          </div>
        </button>

        <div className="rounded-full overflow-hidden border border-[#C3D4E9]">
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
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg w-[300px] shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Login</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm mb-2 text-gray-600">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2 text-gray-600">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded transition-transform transform hover:scale-105"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
