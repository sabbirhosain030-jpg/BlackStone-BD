'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface PremiumButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    icon?: LucideIcon;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
}

export default function PremiumButton({
    href,
    onClick,
    children,
    icon: Icon,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
}: PremiumButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white hover:from-gray-900 hover:via-black hover:to-gray-900 border border-gray-700',
        secondary: 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 border border-blue-600',
        outline: 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const content = (
        <>
            {Icon && <Icon className={size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} />}
            <span className="relative z-10">{children}</span>
        </>
    );

    if (href && !disabled) {
        return (
            <Link href={href}>
                <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={combinedClassName}
                >
                    {content}
                </motion.div>
            </Link>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className={combinedClassName}
        >
            {content}
        </motion.button>
    );
}
