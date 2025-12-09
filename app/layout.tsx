import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                <AdminProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </AdminProvider>
            </body>
        </html>
    );
}
