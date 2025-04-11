import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import { useState } from "react";
import '../../css/user.css';

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
            <div className="bg-white">
                <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <main className="mt-16 md:mt-0">{children}</main>
            </div>
        </>
    );
}
