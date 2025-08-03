import { getApolloClient } from "@/lib/apollo/client";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import ME_QUERY from "@/lib/graphql/queries/gql";


export async function authenticatedUser(): Promise<User> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const client = getApolloClient({
        Authorization: token ? `JWT ${token}` : "",
    });

    const { data } = await client.query({
        query: ME_QUERY,
        fetchPolicy: "no-cache",
    });
    return data.me;
}