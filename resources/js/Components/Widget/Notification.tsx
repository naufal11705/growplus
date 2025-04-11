"use client"

import type React from "react"

import type { Imunisasi } from "@/types/imunisasi"
import axios from "axios"
import Pusher from "pusher-js"
import { useEffect, useState } from "react"

interface NotificationProps {
  kecamatan: string
}

const Notification: React.FC<NotificationProps> = ({ kecamatan }: NotificationProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [notifications, setNotifications] = useState<Imunisasi[]>([])
  const [error, setError] = useState<string | null>(null)
  const [hasNewNotifications, setHasNewNotifications] = useState(false)

  useEffect(() => {
    const pusher = new Pusher("4f2eccc31a509bd5e1ad", {
      cluster: "ap1",
      encrypted: true,
    })

    try {
      const channel = pusher.subscribe(`imunisasi.${kecamatan}`)
      console.log(`Subscribing to channel: imunisasi.${kecamatan}`)

      pusher.connection.bind("connected", () => {
        setIsConnected(true)
        setError(null)
        console.log("Connected to Pusher")
      })

      pusher.connection.bind("error", (err: any) => {
        console.error("Pusher connection error:", err)
        setError("Failed to connect to notification service")
        setIsConnected(false)
      })

      channel.bind("App\\Events\\ImunisasiNotification", (data: Imunisasi) => {
        console.log("Received notification:", data)
        setNotifications((prev) => [data, ...prev])
        setHasNewNotifications(true)
      })

      return () => {
        channel.unbind_all()
        pusher.unsubscribe(`imunisasi.${kecamatan}`)
        pusher.disconnect()
      }
    } catch (err) {
      console.error("Error setting up Pusher:", err)
      setError("Failed to initialize notification service")
    }
  }, [kecamatan])

  useEffect(() => {
    const fetchExistingNotifications = async () => {
      try {
        const response = await axios.get(`/imunisasi/${kecamatan}`)
        setNotifications(response.data)
        console.log("Existing notifications:", response.data)
      } catch (error) {
        console.error("Error fetching existing notifications:", error)
      }
    }

    fetchExistingNotifications()
  }, [kecamatan])

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setHasNewNotifications(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      return new Date(dateString).toLocaleDateString("id-ID", options)
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2.5 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md text-gray-500 hover:text-pink-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
        aria-label="Notifications"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-12" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
        </svg>

        {hasNewNotifications && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-500 rounded-full animate-pulse-fast">
            <span className="sr-only">New notifications</span>
          </span>
        )}

        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
            error ? "bg-red-500" : isConnected ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          <span className="sr-only">{error ? "Connection error" : isConnected ? "Connected" : "Connecting"}</span>
        </span>
      </button>

      <div
        className={`absolute right-0 top-full mt-2 w-96 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform origin-top-right z-50 ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Notifikasi</h3>
            <div className="flex items-center space-x-2">
              {error ? (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                  Error
                </span>
              ) : isConnected ? (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Terhubung
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                  Menghubungkan...
                </span>
              )}

              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                {notifications.length} Notifikasi
              </span>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {error && (
            <div className="p-4 bg-red-50 border-b border-red-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada notifikasi</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Anda akan menerima notifikasi imunisasi di sini ketika tersedia.
              </p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                  index === 0 && hasNewNotifications ? "animate-highlight" : ""
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500">
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.5 6h-15v9h15V6Z" />
                        <path
                          fillRule="evenodd"
                          d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{notification.nama}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">Baru</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 mr-1.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-600 flex-1">{notification.alamat}</p>
                      </div>

                      <div className="flex items-start">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 mr-1.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-600">{formatDate(notification.tanggal)}</p>
                      </div>

                      <div className="flex items-start">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 mr-1.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-600">08:00 - 12:00 WIB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-center">
            <button className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors">
              Lihat Semua Notifikasi
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notification

