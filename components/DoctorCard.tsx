interface Props {
  doctor: {
    name: string;
    specialty: string;
    experience: number;
    available: number;
    location: string;
    consultationFee: number;
    apolloDoctor: boolean;
    degree: string;
    profilePic?: string;
  };
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <div className="flex border rounded-lg shadow-sm bg-white p-4 hover:shadow-md transition">
      {/* Left Section - 50% */}
      <div className="flex w-1/2">
        <div className="flex-shrink-0 w-20 h-20 bg-apolloGray rounded overflow-hidden">
          <img
            src={doctor.profilePic || "https://via.placeholder.com/80"}
            alt="Doctor Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4 flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-black">{doctor.name}</h3>
          <p className="text-sm text-customGray">{doctor.specialty}</p>
          <p className="text-sm font-semibold text-[#6b45c6]">
            {doctor.experience} YEARS
            <span className="mx-2 text-gray-500 text-base align-middle inline-block">
              •
            </span>
            {doctor.degree}
          </p>
          <p className="text-sm text-customGray">
            {doctor.apolloDoctor
              ? "Apollo 24|7 Virtual Clinic"
              : doctor.location}
          </p>
        </div>
      </div>

      {/* Right Section - 50% */}
      <div className="w-1/2 flex flex-col justify-end pl-4">
        <div className="flex flex-col items-center w-full">
          <p className="flex items-center justify-center text-sm font-semibold text-black">
            <span className="text-xl">₹{doctor.consultationFee}</span>
            <span className="mx-2 text-customGray">|</span>
            <small className="text-cashBack">Circle 50 Cashback</small>
          </p>

          <button className="mt-2 w-full py-[10px] text-sm font-medium text-[#106c89] bg-white border border-apolloBlue rounded text-center hover:bg-[#f0faff] flex flex-col items-center">
            <span>Consult Online</span>
            <span className="text-xs text-gray-500 mt-1">
              Available in {doctor.available} minutes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
