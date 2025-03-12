import Navbar from "@/Components/Navbar";

interface AnonymousProps {
    children: React.ReactNode;
}
export default function Anonymous({ children }: AnonymousProps) {
    return(
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}