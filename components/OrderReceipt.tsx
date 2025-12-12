import { formatCurrency, formatDate } from '@/lib/utils/pdf-generator';

interface OrderReceiptProps {
    orderData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        district: string;
        location: string;
        items: Array<{
            id: string;
            name: string;
            price: number;
            quantity: number;
            images: string[];
        }>;
        total: number;
        orderDate: string;
    };
    orderNumber?: string;
}

export default function OrderReceipt({ orderData, orderNumber = `ORD-${Date.now()}` }: OrderReceiptProps) {
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = orderData.total - subtotal;

    return (
        <div id="order-receipt" className="bg-white p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="border-b-4 border-blue-600 pb-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            BlackStone<span className="text-blue-600">BD</span>
                        </h1>
                        <p className="text-gray-600">Premium E-Commerce Platform</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Email: info@blackstonebd.com<br />
                            Phone: +880 1234-567890<br />
                            Dhaka, Bangladesh
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-2">
                            <p className="text-sm font-semibold">ORDER RECEIPT</p>
                        </div>
                        <p className="text-sm text-gray-600">Order #: <span className="font-bold text-gray-900">{orderNumber}</span></p>
                        <p className="text-sm text-gray-600">Date: <span className="font-medium">{formatDate(orderData.orderDate)}</span></p>
                    </div>
                </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 border-b pb-2">Bill To</h3>
                    <p className="font-bold text-gray-900 text-lg">{orderData.firstName} {orderData.lastName}</p>
                    <p className="text-gray-600 mt-1">{orderData.email}</p>
                    <p className="text-gray-600">{orderData.phone}</p>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 border-b pb-2">Ship To</h3>
                    <p className="text-gray-900">{orderData.address}</p>
                    <p className="text-gray-900">{orderData.city}, {orderData.district}</p>
                    <p className="text-gray-600 mt-2">
                        <span className="font-medium">Delivery Zone:</span> {orderData.location === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}
                    </p>
                </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">Order Details</h3>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">#</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Item Description</th>
                            <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Qty</th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Unit Price</th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.items.map((item, index) => (
                            <tr key={item.id} className="border-b border-gray-100">
                                <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                                <td className="py-3 px-4">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">SKU: {item.id}</p>
                                </td>
                                <td className="py-3 px-4 text-center text-gray-900">{item.quantity}</td>
                                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(item.price)}</td>
                                <td className="py-3 px-4 text-right font-medium text-gray-900">
                                    {formatCurrency(item.price * item.quantity)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
                <div className="w-80">
                    <div className="space-y-2">
                        <div className="flex justify-between py-2 text-gray-700">
                            <span>Subtotal:</span>
                            <span className="font-medium">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-gray-700">
                            <span>Shipping Charge:</span>
                            <span className="font-medium">{formatCurrency(shipping)}</span>
                        </div>
                        <div className="flex justify-between py-4 border-t-2 border-gray-300">
                            <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                            <span className="text-lg font-bold text-blue-600">{formatCurrency(orderData.total)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Payment Method</p>
                        <p className="text-gray-900 font-medium">Cash on Delivery (COD)</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700">Payment Status</p>
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Pending
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-200 pt-6">
                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>Thank you for shopping with BlackStoneBD!</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                        This is a computer-generated receipt and does not require a signature.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        For any queries, please contact us at support@blackstonebd.com or call +880 1234-567890
                    </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-400">
                        BlackStoneBD | Redefining Premium E-Commerce | www.blackstonebd.com
                    </p>
                </div>
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 text-9xl font-bold text-gray-400 rotate-0" style={{ marginTop: '200px' }}>
                BlackStoneBD
            </div>
        </div>
    );
}
