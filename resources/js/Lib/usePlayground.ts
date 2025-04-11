"use client"

import { useState } from "react"

type Feature = "stunting-risk" | "future-simulation"

interface ChatLogicReturn {
  result: string
  loading: boolean
  error: string | null
  sendPrompt: (prompt: string, feature: Feature) => Promise<void>
}

export const usePlayground = (geminiApiKey: string): ChatLogicReturn => {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendPrompt = async (prompt: string, feature: Feature) => {
    setLoading(true)
    setError(null)

    let fullPrompt = ""

    if (feature === "stunting-risk") {
      fullPrompt = `
        Kamu adalah asisten kesehatan anak yang ahli dalam menilai risiko stunting.
        Berdasarkan informasi berikut, berikan penilaian risiko stunting dengan format yang jelas:

        1. SKOR RISIKO: [Rendah/Sedang/Tinggi]
        2. ANALISIS SINGKAT: (2-3 kalimat penjelasan tentang faktor risiko utama)
        3. REKOMENDASI: (3 poin praktis yang dapat dilakukan orang tua)

        Data anak:
        ${prompt}

        Pastikan jawaban singkat, jelas, dan mudah dipahami oleh orang tua.
      `
    } else if (feature === "future-simulation") {
      fullPrompt = `
        Kamu adalah ahli gizi dan pertumbuhan anak.
        Berdasarkan informasi berikut, berikan proyeksi pertumbuhan anak 2 tahun ke depan dengan format:

        1. PROYEKSI: (Satu kalimat yang dimulai dengan "Dengan pola makan saat ini, anak Anda..." yang menjelaskan risiko atau prospek pertumbuhan)
        2. DAMPAK: (2-3 kalimat tentang dampak pola makan dan aktivitas saat ini terhadap pertumbuhan)
        3. SARAN PERBAIKAN: (3 poin praktis untuk meningkatkan prospek pertumbuhan)

        Data anak:
        ${prompt}

        Pastikan jawaban bersifat informatif namun tidak menakut-nakuti orang tua.
      `
    }

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        },
      )

      const data = await response.json()
      const generated = data.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada hasil yang ditemukan."

      setResult(generated)
    } catch (err) {
      console.error("Error:", err)
      setError("Gagal memproses permintaan.")
    } finally {
      setLoading(false)
    }
  }

  return {
    result,
    loading,
    error,
    sendPrompt,
  }
}
