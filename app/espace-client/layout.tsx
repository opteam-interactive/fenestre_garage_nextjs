import Nav from "@/components/Nav"
import AuthWrapper from "@/components/AuthWrapper";
export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AuthWrapper>
                <Nav />
                {children}
            </AuthWrapper>
        </div>
    )
}
