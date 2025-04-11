import { useState } from "react";
import Layout from "@/Layouts/Auth";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import Alert from "@/Components/Widget/Alert/Alert";
import { motion } from "framer-motion"

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false); // State untuk toast

    const { data, setData, post, errors, processing, reset } = useForm({
        username: "",
        nama: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        post(route("register"), {
            onSuccess: () => {
                setShowToast(true);
                setIsLoading(false);
                reset();
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <Layout>
            {showToast && <Alert message="Pendaftaran Berhasil!" onClose={() => setShowToast(false)} />}
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen min-h-screen lg:py-0">
                    <motion.div 
                        className="w-full max-w-md mb-5 flex items-center justify-center relative"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        >
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
                    </motion.div>
                    <div className="w-full bg-white rounded-2xl shadow border border-gray-200 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 sm:p-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            >
                                <h1 className="text-2xl font-bold text-gray-900">Daftarkan Akun Anda!</h1>
                            </motion.div>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                >
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-900">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        disabled={processing}
                                        value={data.username}
                                        onChange={(e) => setData("username", e.target.value)}
                                        className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-700 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5`}
                                        placeholder="Username"
                                        required
                                    />
                                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                >
                                    <label htmlFor="nama" className="block text-sm font-medium text-gray-900">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        id="nama"
                                        disabled={processing}
                                        value={data.nama}
                                        onChange={(e) => setData("nama", e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-700 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                        placeholder="Nama Lengkap"
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        disabled={processing}
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-700 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5`}
                                        placeholder="name@company.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                    >
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">Kata Sandi</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        disabled={processing}
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-700 rounded-xl focus:ring-wine focus:border-wine block w-full p-2.5"
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                >
                                    <button
                                        disabled={processing}
                                        type="submit"
                                        className="w-full text-white bg-wine hover:bg-dark-wine font-medium rounded-xl text-md px-5 py-3 text-center">
                                        {isLoading ? "Loading..." : "Daftar"}
                                    </button>
                                </motion.div >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                >    
                                    <p className="text-sm font-light text-gray-500">
                                        Sudah Punya Akun? <a href="/login" className="font-bold text-wine hover:underline">Masuk</a>
                                    </p>
                                </motion.div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
