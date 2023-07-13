export const authOptions = {
    sessionCookie: process.env.SESSION_COOKIE!,
    sessionSecret: process.env.SESSION_SECRET!,
    sessionTtl: parseInt(process.env.SESSION_TTL!)
};
