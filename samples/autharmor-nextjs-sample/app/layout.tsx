import "@autharmor/autharmor-ui/index.css";
import "bulma/css/bulma.min.css";
import { Navbar } from "./shared/Navbar";

export const metadata = {
    title: "Auth Armor Next.JS Sample"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
