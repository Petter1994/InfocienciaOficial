'use client'
import {SessionProvider} from "next-auth/react"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import {ThemeProvider} from "next-themes";
import {SnackbarProvider} from 'notistack'
import {Inter} from "next/font/google";
import "../globals.css";

const inter = Inter({subsets: ["latin"]});
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';


export default function RootLayout({
                                       children, session
                                   }: {
    children: React.ReactNode, session?: any
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <SessionProvider session={session}>
                <SnackbarProvider maxSnack={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Lines/>
                        <Header/>

                        {children}

                        <Footer/>
                        <ScrollToTop/>
                    </LocalizationProvider>
                </SnackbarProvider>
            </SessionProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
