// types/brevo.ts
export interface BrevoContact {
  email: string;
  attributes?: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    SMS?: string;
    [key: string]: any;
  };
  listIds?: number[];
  updateEnabled?: boolean;
  emailBlacklisted?: boolean;
  smsBlacklisted?: boolean;
}

export interface BrevoResponse {
  id: number;
  message?: string;
}

export interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}