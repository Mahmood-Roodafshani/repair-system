export interface CommissionFormDto {
  id: string | number;
  date?: string;
  decision?: string;
  description?: string;
  assetNumber?: string | number;
  category?: string;
  submitAt?: string;
  submitter?: string;
  personalPay?: number;
} 