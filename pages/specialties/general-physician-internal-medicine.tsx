import { GetServerSideProps } from "next";
import Head from "next/head";
import DoctorCard from "../../components/DoctorCard";
import FilterSidebar from "../../components/FilterSidebar";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Ad from "../../components/Ad";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  available: boolean;
  location: string;
  consultationFee: number;
  languages: string[];
}

interface Props {
  doctors: Doctor[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const GeneralPhysicianPage = ({
  doctors,
  total,
  currentPage,
  totalPages,
}: Props) => {
  const router = useRouter();
  const [page, setPage] = useState(currentPage || 1);
  const [sortValue, setSortValue] = useState(router.query.sort || "");

  const handleFilterChange = (filters: Record<string, string>) => {
    const query = { ...router.query, ...filters, page: "1" };

    // When filters are cleared, we will remove filter keys from the query.
    if (Object.keys(filters).length === 0) {
      delete query.experience;
      delete query.consultationFee;
      delete query.language;
      delete query.apolloDoctor;
    }

    router.push({ pathname: router.pathname, query });
  };

  const handlePageChange = (newPage: number) => {
    const query = { ...router.query, page: String(newPage) };
    router.push({ pathname: router.pathname, query });
    setPage(newPage);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortValue(selectedSort);
    const query = {
      ...router.query,
      sort: selectedSort || undefined,
      page: "1",
    };
    if (!selectedSort) delete query.sort;
    router.push({ pathname: router.pathname, query });
  };

  return (
    <>
      <Head>
        <title>General Physicians | Apollo Clone</title>
        <meta
          name="description"
          content="Find top general physicians with experience, ratings and fees. Book instantly."
        />
      </Head>

      <Navbar />

      <main className="flex bg-white min-h-screen gap-4 p-0">
        {/* Sidebar: 15% - No margin */}
        <div className="w-[15%]">
          <FilterSidebar onChange={handleFilterChange} />
        </div>

        {/* Doctor List: 65% */}
        <div className="w-[67%] min-w-0">
          {" "}
          {/* Add padding only here */}
          <p className="text-sm mb-1 mt-2">
            <span className="text-[#106c89]">Home</span>{" "}
            <span className="text-black font-bold">{">"}</span>{" "}
            <span className="text-[#106c89]">Doctors</span>{" "}
            <span className="text-black font-bold">{">"}</span>{" "}
            <span className="text-[#106c89]">general physicians</span>
          </p>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-2xl font-semibold text-black">
              Consult General Physicians Online – Internal Medicine Specialists
              <br />
              <small className="text-base">({total} doctors)</small>
            </h1>

            <select
              className="appearance-none border border-customGray text-black py-2 px-3 text-base font-medium text-lg relative text-center"
              style={{
                fontSize: "1.2rem", // 1.5x default size
                backgroundImage: "none", // removes the default dropdown arrow
              }}
              value={sortValue}
              onChange={handleSortChange}
            >
              <option
                value=""
                style={{
                  fontSize: "1rem",
                }}
              >
                ↑↓ Relevance
              </option>
              <option
                value="availability"
                style={{
                  fontSize: "1rem",
                }}
              >
                ↑↓ Availability
              </option>
              <option
                value="price-low-high"
                style={{
                  fontSize: "1rem",
                }}
              >
                ↑↓ Price - Low to High
              </option>
              <option
                value="price-high-low"
                style={{
                  fontSize: "1rem",
                }}
              >
                ↑↓ Price - High to Low
              </option>
              <option
                value="experience"
                style={{
                  fontSize: "1rem",
                }}
              >
                ↑↓ Years of Experience
              </option>
              <option
                value="most-liked"
                style={{
                  fontSize: "1rem",
                }}
              >
                ↑↓ Most Liked
              </option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {doctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
          <div className="mt-6 flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${
                  i + 1 === page ? "bg-apolloBlue text-white" : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Ad: 20% */}
        <div className="w-[18%] mt-12">
          <Ad />
        </div>
      </main>
    </>
  );
};

export default GeneralPhysicianPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  // Building the query string from the context.query
  const queryParams = new URLSearchParams();
  for (const key in context.query) {
    const value = context.query[key];
    if (Array.isArray(value)) {
      queryParams.set(key, value.join(","));
    } else if (value !== undefined) {
      queryParams.set(key, String(value));
    }
  }

  // Always set limit
  queryParams.set("limit", "4");

  // If no filters are present (all filters removed), don't pass filter-specific query params
  if (
    !queryParams.has("experience") &&
    !queryParams.has("consultationFee") &&
    !queryParams.has("language") &&
    !queryParams.has("apolloDoctor")
  ) {
    queryParams.delete("experience");
    queryParams.delete("consultationFee");
    queryParams.delete("language");
    queryParams.delete("apolloDoctor");
  }

  // sort will be preserved automatically in the loop above

  const res = await fetch(
    `${baseURL}/api/list-doctor-with-filter?${queryParams.toString()}`
  );
  const data = await res.json();

  return {
    props: {
      doctors: data.data,
      total: data.total,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
    },
  };
};
