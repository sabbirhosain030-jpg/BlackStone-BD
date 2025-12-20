'use client';

import { motion } from 'framer-motion';
import { Grid3x3, List } from 'lucide-react';

interface ProductViewToggleProps {
    viewMode: 'grid' | 'list';
    onViewChange: (mode: 'grid' | 'list') => void;
}

export default function ProductViewToggle({ viewMode, onViewChange }: ProductViewToggleProps) {
    return (
        <div className="flex items-center gap-2 bg-premium-charcoal border border-gray-800 rounded-lg p-1 shadow-sm">
            <motion.button
                onClick={() => onViewChange('grid')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'grid'
                        ? 'bg-premium-gold text-premium-black shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                aria-label="Grid view"
            >
                <Grid3x3 className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
            </motion.button>
            <motion.button
                onClick={() => onViewChange('list')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${viewMode === 'list'
                        ? 'bg-premium-gold text-premium-black shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                aria-label="List view"
            >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
            </motion.button>
        </div>
    );
}
