interface StatisticProps {
    totalPoints: number
    totalProgress: number
    streak: number
  }
  
  export default function ProgressStatus({ totalPoints, totalProgress, streak }: StatisticProps) {
    return (
      <div className="relative w-full lg:w-3/5 mb-8 lg:mb-0 animate-fadeIn">
        <div className="w-full text-sm text-left text-gray-500">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Progress Kamu</h2>
            <div className="ml-auto">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Aktif
              </span>
            </div>
          </div>
  
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4" id="informationProgress">
                <div id="streak" className="text-center p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Streak</h2>
                  <div className="flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800">{streak}</h2>
                    <span className="ml-1 text-xl animate-pulse">🔥</span>
                  </div>
                </div>
  
                <div id="points" className="text-center p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Total Points</h2>
                  <h2 className="text-2xl font-bold text-gray-800">{totalPoints}</h2>
                </div>
  
                <div id="level" className="text-center p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Level</h2>
                  <h2 className="text-2xl font-bold text-gray-800">3</h2>
                </div>
              </div>
  
              <div id="levelBar" className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-semibold text-gray-700">Level Progress</h2>
                  <span className="text-sm font-medium text-gray-500">{totalProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${totalProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Level 3</span>
                  <span>Level 4</span>
                </div>
              </div>
  
              <div id="yourBadge" className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-700">Koleksi Badge</h2>
                  <a href="#" className="text-xs font-medium text-pink-500 hover:text-pink-600 transition-colors">
                    Lihat Semua
                  </a>
                </div>
  
                <div className="grid grid-cols-4 gap-4">
                  {["7 Days", "Nutrition", "Early Bird", "Mindful"].map((badge, index) => (
                    <div key={badge} className="flex flex-col items-center group">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                        {/* Badge icons based on type */}
                        {index === 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 text-pink-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {index === 1 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 text-pink-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {index === 2 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 text-pink-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {index === 3 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 text-pink-500"
                          >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        )}
  
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                      </div>
                      <span className="text-xs text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
  
              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                <a
                  href="/profil"
                  className="inline-flex items-center text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Kunjungi Profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  