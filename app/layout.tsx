import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import MarketingModal from "@/components/MarketingModal";
import SessionWrapper from "@/components/SessionWrapper";

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
                <SessionWrapper>
                    <AdminProvider>
                        <CartProvider>
                            <FavoritesProvider>
                                {children}
                                <MarketingModal />
                            </FavoritesProvider>
                        </CartProvider>
                    </AdminProvider>
                </SessionWrapper>
            </body>
        </html>
    );
}
