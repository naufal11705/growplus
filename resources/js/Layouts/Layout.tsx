import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return(
        <>
            <div className="bg-white min-h-screen">
                <Header />  
                <Sidebar />
                <main>{children}</main>
            </div>
        </>
    );
}