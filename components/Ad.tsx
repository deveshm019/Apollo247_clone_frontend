export default function Ad() {
  return (
    <div className="bg-[#001f3f] text-white rounded-lg p-4 flex flex-col items-center h-fit">
      <img
        src="https://images.apollo247.in/images/doctor-listing/consult_doctor.png?tr=q-60,f-webp,w-200,dpr-2,c-at_max"
        alt="Consult Doctor"
        className="mb-4 w-full object-contain"
      />
      <h3 className="text-lg font-semibold text-left mb-2 w-full">
        Need to consult the right doctor?
      </h3>
      <p className="text-left text-sm font-medium underline w-full">
        Call +91 9373207340 to book instantly
      </p>
    </div>
  );
}
