import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
    title: "BlackStone BD",
    description: "Premium E-commerce Experience",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-premium-black text-white`}>
                <AdminProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </AdminProvider>
            </body>
        </html>
    );
}
