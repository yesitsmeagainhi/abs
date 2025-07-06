const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

interface BrevoContact {
  email: string;
  attributes?: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    SMS?: string;
    [key: string]: any;
  };
  listIds?: number[];
  updateEnabled?: boolean;
}

interface BrevoResponse {
  id?: number;
  error?: string;
  message?: string;
}

export const createBrevoContact = async (contactData: BrevoContact): Promise<BrevoResponse> => {
  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle specific Brevo API errors
      if (response.status === 400) {
        throw new Error('Invalid contact data provided');
      } else if (response.status === 401) {
        throw new Error('Invalid API key');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`Brevo API Error: ${data?.message || response.statusText}`);
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

// Send welcome email via Brevo
export const sendWelcomeEmail = async (contactEmail: string, contactName: string) => {
  try {
    const emailData = {
      sender: {
        name: "Your Company",
        email: process.env.BREVO_SENDER_EMAIL!
      },
      to: [{ email: contactEmail, name: contactName }],
      subject: "Welcome to our newsletter!",
      htmlContent: `
        <h2>Welcome ${contactName}!</h2>
        <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
        <p>You'll receive updates about our latest news, products, and exclusive offers.</p>
      `
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Email API Error: ${data?.message || response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
};