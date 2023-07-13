import { readAuthCookie } from "@/lib/auth";
import { LogOutButton } from "./shared/LogOutButton";

export default async function Home() {
    const sessionData = await readAuthCookie();

    const isLoggedIn = sessionData !== null;

    return (
        <section className="section">
            <h1 className="title">Welcome to the AuthArmor Next.JS Sample!</h1>

            {isLoggedIn ? (
                <>
                    <p>Welcome, {sessionData.username}!</p>
                    <LogOutButton className="button is-danger is-light mt-2">Log out</LogOutButton>
                </>
            ) : (
                <p>You are not logged in. Please try one of the methods above to log in.</p>
            )}
        </section>
    );
}
