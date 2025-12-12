/**
 * Framer Motion Configuration for Production
 * 
 * This configuration ensures animations work properly on Vercel and other
 * production environments while respecting user preferences for reduced motion.
 */

export const animationConfig = {
    // Respect user's motion preferences
    reducedMotion: 'user',

    // Default animation variants for consistent behavior
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 }
    },

    slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.4 }
    },

    slideIn: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.4 }
    },

    scale: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.3 }
    },

    // Stagger children animation
    staggerContainer: {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    },

    staggerItem: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    }
};

// Production-safe layout animation config
export const layoutAnimationConfig = {
    layout: true,
    transition: {
        layout: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    }
};

// Hover and tap animations
export const interactionConfig = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
};

export default animationConfig;
