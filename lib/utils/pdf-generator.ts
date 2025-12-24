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
        const errorMsg = `Element with id "${elementId}" not found. Please try again.`;
        console.error(errorMsg);
        alert(errorMsg);
        throw new Error(errorMsg);
    }

    try {
        // Show loading indicator (if you want to add one, parent component can track this)
        console.log('Generating PDF...');

        // Capture the element as canvas with high quality settings
        const canvas = await html2canvas(element, {
            scale: 3, // Increased from 2 to 3 for better quality
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/png', 1.0); // Maximum quality

        // Calculate PDF dimensions (A4 size)
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        // Create PDF with proper orientation
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        let position = 0;

        // Add image to first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        // Add new pages if content exceeds one page
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save(filename);
        console.log('PDF generated successfully!');
    } catch (error) {
        const errorMsg = 'Failed to generate PDF. Please ensure your browser allows downloads and try again.';
        console.error('Error generating PDF:', error);
        alert(errorMsg);
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
