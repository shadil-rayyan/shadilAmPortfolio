import { adminAuth } from "./firebase/firebaseadmin";
import { cookies } from "next/headers";
import { cache } from "react";

export const validateRequest = cache(async () => {
    const sessionCookie = (await cookies()).get("__session")?.value;

    if (!sessionCookie) {
        return { user: null, session: null };
    }

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        return {
            user: {
                id: decodedClaims.uid,
                email: decodedClaims.email,
                username: decodedClaims.email?.split('@')[0] || 'admin',
            },
            session: { id: sessionCookie }
        };
    } catch (error) {
        return { user: null, session: null };
    }
});
