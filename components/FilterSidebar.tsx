import { useState } from "react";

interface Props {
  onChange: (filters: Record<string, string>) => void;
}

const experienceOptions = ["0-5", "6-10", "11-16", "16+"];
const feeOptions = ["100-500", "500-1000", "1000+"];
const languageOptions = [
  "English",
  "Hindi",
  "Telugu",
  "Punjabi",
  "Bengali",
  "Marathi",
  "Urdu",
  "Gujarati",
  "Tamil",
  "Kannada",
  "Oriya",
];

export default function FilterSidebar({ onChange }: Props) {
  const [experience, setExperience] = useState<string[]>([]);
  const [fees, setFees] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [facility, setFacility] = useState<string[]>([]); // "true" | "false"

  const toggleItem = (
    value: string,
    list: string[],
    setter: (val: string[]) => void
  ) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value));
    } else {
      setter([...list, value]);
    }
  };

  const applyFilters = () => {
    const filters: Record<string, string> = {
      experience: experience.join(","),
      consultationFee: fees.join(","),
      language: languages.join(","),
    };

    if (facility.length) {
      filters.apolloDoctor = facility.join(",");
    }

    onChange(filters);
  };

  const clearFilters = () => {
    setExperience([]);
    setFees([]);
    setLanguages([]);
    setFacility([]);
    onChange({}); // Reset filters in parent, should trigger re-fetch of doctors
  };

  return (
    <div className="w-full border rounded p-4 bg-white shadow-sm text-sm m-0">
      <h4 className="font-semibold mb-2 text-apolloBlue">Filters</h4>

      {/* Experience */}
      <div className="mb-4">
        <p className="font-medium mb-1">Experience (years)</p>
        {experienceOptions.map((opt) => (
          <label key={opt} className="block">
            <input
              type="checkbox"
              value={opt}
              checked={experience.includes(opt)}
              onChange={() => toggleItem(opt, experience, setExperience)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>

      {/* Consultation Fee */}
      <div className="mb-4">
        <p className="font-medium mb-1">Consultation Fee (₹)</p>
        {feeOptions.map((opt) => (
          <label key={opt} className="block">
            <input
              type="checkbox"
              value={opt}
              checked={fees.includes(opt)}
              onChange={() => toggleItem(opt, fees, setFees)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>

      {/* Languages */}
      <div className="mb-4">
        <p className="font-medium mb-1">Languages</p>
        {languageOptions.map((lang) => (
          <label key={lang} className="block">
            <input
              type="checkbox"
              value={lang}
              checked={languages.includes(lang)}
              onChange={() => toggleItem(lang, languages, setLanguages)}
              className="mr-2"
            />
            {lang}
          </label>
        ))}
      </div>

      {/* Facility */}
      <div className="mb-4">
        <p className="font-medium mb-1">Facility</p>
        <label className="block">
          <input
            type="checkbox"
            value="true"
            checked={facility.includes("true")}
            onChange={() => toggleItem("true", facility, setFacility)}
            className="mr-2"
          />
          Apollo Hospital
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="false"
            checked={facility.includes("false")}
            onChange={() => toggleItem("false", facility, setFacility)}
            className="mr-2"
          />
          Other Clinic
        </label>
      </div>

      <button
        onClick={applyFilters}
        className="mt-4 px-3 py-1 bg-apolloBlue text-white rounded w-full"
      >
        Apply Filters
      </button>

      <button
        onClick={clearFilters}
        className="mt-2 px-3 py-1 bg-gray-200 text-gray-800 rounded w-full"
      >
        Clear All Filters
      </button>
    </div>
  );
}
