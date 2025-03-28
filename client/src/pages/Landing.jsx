import React, { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import { getTrips } from "../api/trip";
import { useDebouce } from "../hooks/debouce";

const Landing = () => {
  const [keyword, setKeyword] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const debouncedKeyword = useDebouce(keyword, 500);

  useEffect(() => {
    const fetchTrips = async (keyword = "") => {
      setLoading(true);
      setError(false);

      try {
        const response = await getTrips(keyword);
        setTrips(response);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips(debouncedKeyword);
  }, [debouncedKeyword]);

  return (
    <div className="px-24 container pb-24 mx-auto">
      <header>
        <h1 className="text-[50px] font-bold text-blue-400 text-center mt-4">
          เที่ยวไหนดี
        </h1>
        <div className="flex flex-col mb-6">
          <label htmlFor="search" className="font-semibold">
            ค้นหาที่เที่ยว
          </label>
          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            id="search"
            className="self-center border-b border-gray-300 w-full text-center focus:outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </header>

      <main className="w-full flex flex-col gap-6">
        {loading && <div className="text-center">กำลังค้นหา...</div>}
        {error && (
          <div className="text-center">พบปัญหาขัดข้อง กรุณาลองใหม่อีกครั้ง</div>
        )}
        {!loading &&
          !error &&
          trips?.length > 0 &&
          trips.map((trip) => (
            <TripCard key={trip.eid} {...trip} className="w-full" />
          ))}
        {!loading && !error && trips?.length === 0 && (
          <div className="text-center">ไม่เจอที่เที่ยวที่คุณต้องการ</div>
        )}
      </main>
    </div>
  );
};

export default Landing;
