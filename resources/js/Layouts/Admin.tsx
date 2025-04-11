import Header from '@/Components/Admin/Header';
import Sidebar from '@/Components/Admin/Sidebar';
import { useState } from 'react';
interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="bg-white min-h-screen">
                <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <main className="mt-16 md:mt-0">{children}</main>
            </div>
        </>
    );
}
