export interface IInvoicesData {
  id: number;
  number: string;
  clientID: number;
  amount: string;
  amountWithIVA: number;
  status: IInvoiceStatus;
}

export enum IInvoiceStatus {
  Canceled,
  Completed,
}
