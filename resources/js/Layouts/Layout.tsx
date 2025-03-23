import { useState } from "react";
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

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
                <main>{children}</main>
            </div>
        </>
    );
}
