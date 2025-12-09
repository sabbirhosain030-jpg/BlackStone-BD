'use client';

import { Order } from '@/types';
import { formatDate, formatCurrency } from '@/lib/invoiceUtils';

interface InvoiceProps {
    order: Order;
    invoiceNumber: string;
}

export default function Invoice({ order, invoiceNumber }: InvoiceProps) {
    const companySettings = typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('companySettings') || '{}')
        : {};

    const companyName = companySettings.name || 'BlackStone BD';
    const companyAddress = companySettings.address
        ? `${companySettings.address.street}, ${companySettings.address.city}, ${companySettings.address.postalCode}`
        : '123 Commerce Street, Dhaka 1000, Bangladesh';
    const companyPhone = companySettings.contact?.primaryPhone || '+880 1234-567890';
    const companyEmail = companySettings.contact?.supportEmail || 'support@blackstonebd.com';

    return (
        <div className="bg-white p-8 max-w-4xl mx-auto" id="invoice-content">
            {/* Header */}
            <div className="border-b-4 border-blue-600 pb-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {companyName}
                        </h1>
                        <p className="text-gray-600">{companyAddress}</p>
                        <p className="text-gray-600">{companyPhone}</p>
                        <p className="text-gray-600">{companyEmail}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">INVOICE</h2>
                        <p className="text-gray-600">
                            <span className="font-semibold">Invoice #:</span> {invoiceNumber}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Date:</span> {formatDate(order.createdAt)}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Order #:</span> {order.id}
                        </p>
                    </div>
                </div>
            </div>

            {/* Customer Information */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Bill To:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <p className="text-gray-600">{order.customerEmail}</p>
                    <p className="text-gray-600">{order.customerPhone}</p>
                    <p className="text-gray-600">{order.customerAddress}</p>
                </div>
            </div>

            {/* Order Items Table */}
            <div className="mb-8">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-300">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Quantity</th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Price</th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="py-3 px-4">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </td>
                                <td className="text-center py-3 px-4 text-gray-700">{item.quantity}</td>
                                <td className="text-right py-3 px-4 text-gray-700">
                                    {formatCurrency(item.price)}
                                </td>
                                <td className="text-right py-3 px-4 font-medium text-gray-900">
                                    {formatCurrency(item.price * item.quantity)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
                <div className="w-64">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium text-gray-900">
                            {formatCurrency(order.total - 100)}
                        </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Delivery Charge:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(100)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-t-2 border-gray-300">
                        <span className="text-lg font-bold text-gray-900">Total:</span>
                        <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(order.total)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div className="bg-blue-50 p-4 rounded-lg mb-8">
                <h3 className="font-bold text-gray-900 mb-2">Payment Information</h3>
                <p className="text-gray-700">
                    <span className="font-semibold">Payment Method:</span> Cash on Delivery (COD)
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Status:</span>{' '}
                    <span className="capitalize">{order.status}</span>
                </p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                <p className="mb-2">Thank you for your business!</p>
                <p>For any questions regarding this invoice, please contact us at {companyEmail}</p>
            </div>
        </div>
    );
}
