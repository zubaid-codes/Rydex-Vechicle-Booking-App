import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import InitUser from "@/InitUser";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RYDEX- Smart Vehicle Booking Platform",
  description:
    "Rydex is a modern and user-friendly vehicle booking platform designed to make transportation fast, reliable, and hassle-free. It allows users to seamlessly book cars, bikes, or other vehicles anytime, anywhere with just a few clicks. The platform focuses on convenience, affordability, and real-time availability, ensuring that users get the best ride options based on their needs. With an intuitive interface and smart features, Rydex simplifies the entire booking experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <ReduxProvider><InitUser/>{children}</ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
