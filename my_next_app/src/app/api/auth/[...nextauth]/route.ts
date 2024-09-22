import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: ".com",
        clientSecret: "GOCSPCWNvbEBV"

    })
  ]
})

export { handler as GET, handler as POST }