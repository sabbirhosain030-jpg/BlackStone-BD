'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, MapPin, Phone, Mail, Download, FileText } from 'lucide-react';
import { Order } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import Invoice from './Invoice';
import { generateInvoiceNumber, downloadInvoiceAsPDF } from '@/lib/invoiceUtils';

interface OrderDetailsModalProps {
    order: Order;
    onClose: () => void;
    onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export default function OrderDetailsModal({ order, onClose, onUpdateStatus }: OrderDetailsModalProps) {
    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceNumber] = useState(generateInvoiceNumber());

    const statusColors = {
        pending: 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30',
        processing: 'bg-blue-900/30 text-blue-400 border border-blue-500/30',
        shipped: 'bg-indigo-900/30 text-indigo-400 border border-indigo-500/30',
        delivered: 'bg-green-900/30 text-green-400 border border-green-500/30',
        cancelled: 'bg-red-900/30 text-red-400 border border-red-500/30',
    };

    const handleDownloadInvoice = () => {
        downloadInvoiceAsPDF('invoice-content', `invoice-${order.id}.pdf`);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-premium-charcoal border border-gray-800 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-playfair flex items-center gap-3">
                                Order #{order.id}
                                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[order.status]}`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                            <h3 className="font-bold text-premium-gold border-b border-gray-700 pb-2 uppercase tracking-wide text-sm">Customer Details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <span className="font-medium text-white">{order.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    {order.customerEmail}
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    {order.customerPhone}
                                </div>
                                <div className="flex items-start gap-2 text-gray-300">
                                    <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                                    {order.customerAddress}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-premium-gold border-b border-gray-700 pb-2 uppercase tracking-wide text-sm">Order Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Payment Method:</span>
                                    <span className="font-medium text-white uppercase">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Subtotal:</span>
                                    <span className="font-medium text-white">৳ {order.total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2 mt-2">
                                    <span className="text-white">Total:</span>
                                    <span className="text-premium-gold">৳ {order.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-premium-gold border-b border-gray-700 pb-2 mb-4 uppercase tracking-wide text-sm">Order Items</h3>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-black/40 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
                                    <div className="h-16 w-16 bg-gray-900 rounded-md overflow-hidden border border-gray-800 flex-shrink-0 relative">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-white">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-premium-gold">৳ {item.price.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-800">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowInvoice(true)}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                <FileText className="h-4 w-4" />
                                View Invoice
                            </button>
                            <button
                                onClick={handleDownloadInvoice}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-premium-gold text-premium-black font-bold rounded-lg hover:bg-white transition-colors shadow-lg shadow-premium-gold/20"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-400">Update Status:</span>
                            <select
                                value={order.status}
                                onChange={(e) => onUpdateStatus(order.id, e.target.value as any)}
                                className="px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-premium-gold focus:border-transparent text-white"
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Invoice Modal */}
            <AnimatePresence>
                {showInvoice && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                        onClick={() => setShowInvoice(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-premium-charcoal border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="sticky top-0 bg-premium-charcoal border-b border-gray-800 p-4 flex justify-between items-center z-10">
                                <h3 className="text-xl font-bold text-white font-playfair">Invoice Preview</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleDownloadInvoice}
                                        className="flex items-center gap-2 px-4 py-2 bg-premium-gold text-premium-black font-bold rounded-lg hover:bg-white transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => setShowInvoice(false)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-8 flex justify-center bg-gray-900/50">
                                {/* Invoice Component Wrapper for Print Simulation */}
                                <div className="shadow-2xl">
                                    <Invoice order={order} invoiceNumber={invoiceNumber} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
