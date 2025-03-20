import Layout from "@/Layouts/Auth";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("login"));
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <Layout>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen min-h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        Grow+
                    </a>
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
                                        className={`bg-gray-50 border text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5 ${
                                            errors.email ? "border-red-500" : "border-gray-300"
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
                                        className={`bg-gray-50 border text-gray-900 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5 ${
                                            errors.password ? "border-red-500" : "border-gray-300"
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
                                <button onClick={handleClick} disabled={isLoading} type="submit" className="w-full text-white bg-wine hover:bg-dark-wine focus:ring-4 focus:outline-none focus:ring-light-pinky font-medium rounded-xl text-md px-5 py-3 text-center">
                                    {isLoading ? (
                                        <>
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 mb-[2px] text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        "Masuk"
                                    )}
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
