import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  // State to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Format the current time in HH:MM:SS format
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Format the time to show always two digits (e.g., 09 instead of 9)
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Static user list for display (no database)
  const users = [
    { id: 1, name: "", email: "", role: "" },
    { id: 2, name: "", email: "", role: "" },
    { id: 3, name: "", email: "", role: "" },
  ];

  return (
    <Layout>
      <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md"> {/* White background with subtle shadow */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold"> <span className="font-extrabold">{session?.user?.name}</span></h2>
          <div className="flex items-center bg-white text-black rounded-lg overflow-hidden shadow-md p-2">
            <img src={session?.user?.image} alt="" className="w-12 h-12 rounded-full" />
            <span className="ml-2 text-lg">{session?.user?.name}</span>
          </div>
        </div>
        <p className="mt-4 text-xl"></p>

        {/* Digital Clock UI with Blue Color */}
        <div className="mt-6 text-center">
          <p className="text-2xl font-semibold">Цаг</p>
          <div className="text-6xl font-extrabold mt-2 text-blue-600"> {/* Blue clock color */}
            {formattedTime}
          </div>
        </div>

        {/* Static User List Table */}
       
      </div>
    </Layout>
  );
}
