import Link from "next/link";



const notfoundpage = () => {
    return (
        <div>
            <Link href="/acasa/">Home</Link>
            <h1>404 - Page Not Found</h1>
        </div>
    );
};

export default notfoundpage;