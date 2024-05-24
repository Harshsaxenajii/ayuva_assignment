"use client";
import { useState } from "react";
import { HiStar, HiThumbDown, HiThumbUp, HiX } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [safetyRating, setSafetyRating] = useState<number>(0);
  const [commRating, setCommRating] = useState<number>(0);
  const [wouldRec, setWouldRec] = useState<boolean>(false); // Default to "No"
  const [praise, setPraise] = useState<string[]>([]);

  const renderStars = (
    maxRating: number,
    rating: number,
    setRating: (rating: number) => void
  ) => {
    return Array.from({ length: maxRating }, (_, index) => (
      <HiStar
        key={index}
        onClick={() => setRating(index + 1)}
        size={30}
        fill={rating > index ? "yellow" : "gray"}
        className="cursor-pointer"
      />
    ));
  };

  const togglePraise = (option: string) => {
    setPraise((prevPraise) => {
      if (prevPraise.includes(option)) {
        return prevPraise.filter((item) => item !== option);
      } else {
        return [...prevPraise, option];
      }
    });
  };

  const praiseOptions = [
    "clean",
    "fast",
    "worthy",
    "kind",
    "inspiring",
    "good",
    "thoughtful",
    "honest",
  ];

  const submitData = () => {
    try {
      console.log([
        {
          safetyRating: safetyRating,
          commRating: commRating,
          wouldRec: wouldRec,
          praise: praise,
        },
      ]);
      toast("Data saved successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center md:h-[100vh]">
      <ToastContainer />
      <div className="md:w-3/12 flex flex-col bg-white h-[100vh] md:h-[85vh] text-black md:rounded-xl p-4 gap-4">
        <div className="flex flex-col gap-2">
          <HiX size={30} className="cursor-pointer" />
          <div className="text-2xl px-1">Leave a review</div>
        </div>
        <div className="px-1 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="text-xl">Safety</div>
            <div className="flex gap-2">
              {renderStars(5, safetyRating, setSafetyRating)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl">Communication</div>
            <div className="flex gap-2">
              {renderStars(5, commRating, setCommRating)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl">Would you recommend</div>
            <div className="flex gap-6 items-center">
              <div
                onClick={() => setWouldRec(true)}
                className="flex items-center cursor-pointer gap-2"
                style={{ color: wouldRec == true ? "yellow" : "gray" }}
              >
                <HiThumbUp size={30} fill={wouldRec ? "yellow" : "gray"} />
                <div>Yes</div>
              </div>
              <div
                onClick={() => setWouldRec(false)}
                className="flex items-center cursor-pointer gap-2"
                style={{ color: wouldRec == false ? "yellow" : "gray" }}
              >
                <HiThumbDown size={30} fill={!wouldRec ? "yellow" : "gray"} />
                <div>No</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl">Praise</div>
            <div className="flex flex-wrap gap-2">
              {praiseOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => togglePraise(option)}
                  className={`px-3 py-1 border rounded-full cursor-pointer ${
                    praise.includes(option) ? "bg-green-300" : "bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => submitData()}
            className="border-[1px] w-full px-4 py-2 rounded-lg bg-green-300 hover:bg-green-500"
          >
            Publish Your Review
          </button>
        </div>
      </div>
    </div>
  );
}
