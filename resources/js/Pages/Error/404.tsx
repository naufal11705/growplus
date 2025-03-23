import { FileQuestion } from "lucide-react";
import Layout from "@/Layouts/Auth";

export default function NotFound() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
                <div className="space-y-6 max-w-md">
                    <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground" />
                    <h1 className="text-6xl font-extrabold tracking-tight text-primary">404</h1>
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
                    <a href="/" className="mt-5">
                        <button type="button" className="text-white bg-wine hover:bg-dark-wine  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5">
                            Kembali ke Halaman Utama
                        </button>
                    </a>
                </div>
            </div>
        </Layout>
    )
}