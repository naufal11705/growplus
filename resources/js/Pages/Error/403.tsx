import { ShieldAlert } from "lucide-react";
import Layout from "@/Layouts/Auth";

export default function InternalServerError() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
                <div className="space-y-6 max-w-md">
                    <ShieldAlert className="h-24 w-24 mx-auto text-amber-500" />
                    <h1 className="text-6xl font-extrabold tracking-tight text-primary">403</h1>
                    <h2 className="text-2xl font-semibold">Access Forbidden</h2>
                    <p className="text-muted-foreground">You don't have permission to access this resource.</p>
                    <button type="button" className="text-white bg-wine hover:bg-dark-wine  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        Kembali ke Halaman Utama
                    </button>
                </div>
            </div>
        </Layout>
    )
}

