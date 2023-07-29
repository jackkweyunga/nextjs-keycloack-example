import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        KeycloakProvider({
            // @ts-ignore
            clientId: process.env.KEYCLOAK_ID,
            // @ts-ignore
            clientSecret: process.env.KEYCLOAK_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ],
    callbacks: {
        async jwt({token, account}: { token: any, account: any }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({session, token, user}: { session: any, token: any, user: any }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    }
}

const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}