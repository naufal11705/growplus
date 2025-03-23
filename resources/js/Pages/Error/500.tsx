import { AlertTriangle } from "lucide-react";
import Layout from "@/Layouts/Auth";

export default function InternalServerError() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
                <div className="space-y-6 max-w-md">
                    <AlertTriangle className="h-24 w-24 mx-auto text-destructive" />
                    <h1 className="text-6xl font-extrabold tracking-tight text-primary">500</h1>
                    <h2 className="text-2xl font-semibold">Internal Server Error</h2>
                    <p className="text-muted-foreground mb-5">
                    Sorry, something went wrong on our server. We're working to fix the issue.
                    </p>
                    <a href="/" className="">
                        <button type="button" className="text-white bg-wine hover:bg-dark-wine  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Kembali ke Halaman Utama
                        </button>
                    </a>
                </div>
            </div>
        </Layout>
    )
}