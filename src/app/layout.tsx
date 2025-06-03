import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr agenda",
  description: "Gerencie sua clínica de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NuqsAdapter>
            {children}  
          </NuqsAdapter>
        </ReactQueryProvider>
        <Toaster richColors theme="light"/>
      </body>
    </html>
  );
}
