import { UserCircle, MapPin } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-[5px]">
        {/* Left: Logo + Select Address */}
        <div className="flex items-center space-x-8">
          {/* Logo Image (20% larger) */}
          <div className="flex items-center leading-tight">
            <img
              src="https://images.apollo247.in/images/icons/apollo247.svg"
              alt="Apollo247 Logo"
              className="h-10 transform scale-[1.2]"
            />
          </div>

          {/* Select Address */}
          <div className="flex items-center space-x-2 cursor-pointer py-[5px]">
            <MapPin size={20} className="text-black" />
            <span className="text-base text-black font-medium">
              Select Address
            </span>
            <svg
              className="w-3 h-3 text-black mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex flex-grow justify-center px-4">
          <div
            className="relative"
            style={{ width: "calc(100% + 30px)", maxWidth: "478px" }}
          >
            <input
              type="text"
              placeholder="Search for doctors, clinics, specialties..."
              className="w-full border border-gray-300 bg-gray-100 rounded-md px-4 py-[10px] pl-12 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              readOnly
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#555"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7 7 0 111.42-1.42L21 21z"
              />
            </svg>
          </div>
        </div>

        {/* Right: Login Button */}
        <div className="flex items-center py-[5px]">
          <button className="flex items-center border rounded-md px-6 py-[10px] space-x-2 text-[#165d59] border-[#165d59] text-sm font-semibold">
            <span className="font-semibold">Login</span>
            <UserCircle size={22} stroke="#165d59" />
          </button>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="bg-white border-t w-full">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center py-[5px]">
            {[
              "Buy Medicines",
              "Find Doctors",
              "Lab Tests",
              "Circle Membership",
              "Health Record",
              "Diabetes Reversal",
              "Buy Insurance",
            ].map((label, index, arr) => (
              <button
                key={label}
                className={`
            flex-1
            text-center
            text-sm
            font-semibold
            text-black
            hover:text-[#106c89]
            hover:underline
            transition
            py-[5px]
            ${index === 0 ? "pl-4" : ""}
            ${index === arr.length - 1 ? "pr-4" : ""}
          `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
