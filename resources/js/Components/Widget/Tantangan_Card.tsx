import { Fase } from "@/types/fase";
import React from "react";

interface TantanganCardsProps {
  fases: Fase[];
  gridCols?: string;
}

export default function TantanganCards({ fases, gridCols = "xl:grid-cols-4" }: TantanganCardsProps) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-1 w-full sm:grid-cols-2 gap-2">
      {fases.map((fase) => (
        <div
          key={fase.fase_id}
          className="bg-white rounded-2xl border-2 border-gray-100 flex flex-col w-full overflow-hidden h-[500px]"
        >
          <div className="relative">
            <img className="rounded-t-2xl w-full h-32 object-cover" src={fase.banner} alt={fase.judul} />
            <div className="flex-1 bg-gray-200 h-4 relative">
              <div className="bg-pinky h-full transition-all duration-500" style={{ width: `${fase.progress}%` }}></div>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-900">
                {fase.progress}%
              </span>
            </div>
            <div className="absolute top-2 right-2">
              <div className="rounded-full px-2 py-1 text-xs font-medium bg-[#411a2d4b] text-wine">Nutrition</div>
            </div>
            <div className="absolute top-2 left-2">
              <div className={`rounded-full p-1 ${fase.progress === 0 ? "bg-red-100" : fase.progress < 100 ? "bg-yellow-100" : "bg-light-pinky"}`}>
                <svg
                  className={`h-6 w-6 ${fase.progress === 0 ? "text-red-600" : fase.progress < 100 ? "text-yellow-600" : "text-wine"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {fase.progress === 0 ? (
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  ) : fase.progress < 100 ? (
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  ) : (
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  )}
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4 flex-grow">
            <a href="#">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">{fase.judul}</h5>
              <p className="mb-2 text-gray-500">{fase.subjudul}</p>
            </a>
            <div className="overflow-y-auto md:max-h-[180px] lg:max-h-[150px] max-h-[160px] mb-4">
              <ul className="grid gap-2 text-sm w-full space-y-1 text-gray-900 list-disc list-inside">
                {fase.tantangans.map((tantangan, index) => (
                  <li key={index} className="flex items-center gap-2 overflow-hidden list-none border-2 border-gray-100 rounded-xl p-2">
                    <div className="bg-wine w-fit h-fit p-1 rounded-full">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                      </svg>
                    </div>
                    <div className="grid w-full">
                      {tantangan}
                      <span className="text-xs font-semibold text-pinky">+10 Poin</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              {fase.progress > 0 ? (
                <a href={`/tantangan/${fase.fase_id}`} className="group flex items-center justify-center space-x-2 rounded-xl bg-white hover:bg-gray-50 border-gray-100 border-2 py-2.5 w-full">
                  <button className="flex space-x-2">
                    <span className="text-gray-900 text-sm font-semibold">
                      {fase.progress === 100 ? "Share Achievement" : "Selengkapnya"}
                    </span>
                    {fase.progress === 100 ? (
                      <svg
                        className="w-5 h-5 text-gray-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-900 transition-transform duration-300 group-hover:-rotate-45"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    )}
                  </button>
                </a>
              ) : (
                <button className="flex items-center justify-center space-x-2 cursor-not-allowed rounded-xl bg-gray-200 py-2.5 w-full">
                  <svg
                    className="w-5 h-5 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 1-1Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}