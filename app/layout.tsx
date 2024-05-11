import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";
import { AppProvider } from "@/context";


const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });   // change font-family to outfit

export const metadata: Metadata = {
  title: "My Task Board",
  description: "Created by Neeraj Parmar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en" className="no-scrollbar">
        <body className={outfit.className + " flex flex-col min-h-screen"}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            limit={3}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <header className="relative z-40">
            <Navbar />
          </header>
          {children}
        </body>
      </html>
    </AppProvider>

  );
}
