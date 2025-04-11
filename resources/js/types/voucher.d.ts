export interface Voucher {
    id: string;
    title: string;
    description: string;
    pointsCost: number;
    validity: string;
    expiryDate?: string;
    terms: string[];
    code?: string;
    backgroundColor?: string;
    featured?: boolean;
    provider: string;
    logoUrl?: string;
    providerUrl?: string;
    redeemDate?: string;
}
