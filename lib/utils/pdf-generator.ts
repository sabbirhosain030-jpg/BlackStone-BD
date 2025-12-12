import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface OrderReceiptData {
    orderNumber: string;
    orderDate: string;
    customerName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        images: string[];
    }>;
    subtotal: number;
    shipping: number;
    total: number;
    location: string;
}

export async function generatePDF(elementId: string, filename: string = 'order-receipt.pdf'): Promise<void> {
    const element = document.getElementById(elementId);

    if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
    }

    try {
        // Capture the element as canvas
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');

        // Calculate PDF dimensions
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF({
            orientation: imgHeight > imgWidth ? 'portrait' : 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(filename);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

export function formatCurrency(amount: number): string {
    return `৳${amount.toLocaleString()}`;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
