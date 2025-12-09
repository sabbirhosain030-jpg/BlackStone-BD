export interface CompanySettings {
    name: string;
    address: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    location: {
        lat: number;
        lng: number;
    };
    contact: {
        primaryPhone: string;
        secondaryPhone: string;
        supportEmail: string;
        infoEmail: string;
    };
    businessHours: {
        [key: string]: { open: string; close: string; closed: boolean };
    };
    contactFormEmail: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    timestamp: string;
    status: 'new' | 'read' | 'resolved';
}
