import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

interface AnonymousProps {
    children: React.ReactNode;
}
export default function Anonymous({ children }: AnonymousProps) {
    return(
        <>
            <Navbar />
                <main>{children}</main>
            <Footer />
        </>
    )
}