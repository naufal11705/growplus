import Layout from "@/Layouts/Auth";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <Layout>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen min-h-screen lg:py-0">
                    <div className="w-full max-w-md mb-5 flex items-center justify-center relative">
                        <a href="/" className="absolute left-0">
                            <button type="button" className="px-5 py-3 text-base font-medium text-center inline-flex items-center text-black border border-gray-200 bg-white rounded-xl hover:bg-gray-50">
                                <svg 
                                    className="w-6 h-6 text-black me-2" 
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
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                                    />
                                </svg>
                                Kembali
                            </button>
                        </a>
                        <a href="#" className="flex items-center text-center justify-center text-2xl font-semibold text-gray-900">
                            Grow+
                        </a>
                    </div>
                    <div className="w-full bg-white rounded-2xl shadow border border-gray-200 md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Selamat Datang Kembali 👋🏽
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        Masukkan Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className={`bg-gray-50 border text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5 ${errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="name@company.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Masukkan Kata Sandi
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className={`bg-gray-50 border text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5 ${errors.password ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-light-pinky"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500">Ingat saya</label>
                                        </div>
                                    </div>
                                    <a href="/forgotPassword" className="text-sm font-medium text-wine hover:underline">
                                        Lupa Kata Sandi?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-wine hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky font-medium rounded-xl text-md px-5 py-3 text-center"
                                    disabled={processing}
                                >
                                    {processing ? "Memproses..." : "Masuk"}
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Belum Punya Akun? <a href="/register" className="font-bold text-wine hover:underline">Daftar</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
