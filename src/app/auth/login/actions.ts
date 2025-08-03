"use server";

import { getApolloClient } from "@/lib/apollo/client";
import { cookies } from "next/headers";
import LOGIN_USER from "@/lib/graphql/mutations/auth/gql";
import { authenticatedUser } from "@/app/actions";

// Query to get user data after login

export async function loginUserAction(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const client = getApolloClient();

    try {
        // First, authenticate user
        const { data: authData } = await client.mutate({
            mutation: LOGIN_USER,
            variables: { username, password },
        });

        if (authData?.tokenAuth?.token) {
            const token = authData.tokenAuth.token;

            // Save token in cookie for server-side middleware
            (await cookies()).set("token", token, { 
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });

            // Fetch user data with the token
            try {

                const userData = await authenticatedUser();

                console.log("User data after login:", userData);

                if (userData) {
                    return { 
                        success: true, 
                        user: userData,
                        token: token
                    };
                }

            } catch (userError) {
                console.error("Error fetching user data:", userError);
                // Login succeeded but couldn't fetch user data
                return { 
                    success: true, 
                    user: null,
                    token: token
                };
            }

            return { success: true, user: null, token: token };
        }
        return { success: false, error: "Login failed" };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "An unexpected error occurred. Please try again." };
    }
}