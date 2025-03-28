import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma/prisma'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        
        const userFound = await prisma.user.findUnique({
            where: {
                email: credentials.email
            }
        })

        if (!userFound) throw new Error('No user found')

        const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

        if (!matchPassword) throw new Error('Wrong password')

        return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            role:userFound.role || 'USER',
            avatar: userFound.avatar || null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Solución: Verifica primero si session.user existe
      if (session?.user) {
        session.user = {
          ...session.user,
          id: token?.id || user?.id,
          name: token?.name || user?.name || null, // Manejo seguro
          role: token?.role || user?.role || 'USER', // Valor por defecto
          avatar: token?.avatar || user?.avatar || null
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Asegúrate de pasar los campos necesarios al token
      if (user) {
        token.id = user.id;
        token.name = user.name || null;
        token.role = user.role || 'USER';
        token.avatar = user.avatar || null;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt", // o "database" dependiendo de tu configuración
  },
  pages: {
    signIn: "/auth2/login",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
