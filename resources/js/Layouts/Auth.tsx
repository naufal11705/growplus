import '../../css/user.css';
interface AuthProps {
    children: React.ReactNode;
}

export default function Auth({ children }: AuthProps) {
    return(
        <div className="bg-white min-h-screen">
            <main>{children}</main>
        </div>
    );
}