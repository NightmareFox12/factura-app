import { IInvoicesData, IInvoiceStatus } from '@/types/invoice.entity';

export let invoicesData: IInvoicesData[] = [
  {
    id: 1,
    number: 'F001',
    clientID: 1,
    amount: '120',
    amountWithIVA: 139.2,
    status: IInvoiceStatus.Completed,
  },
  {
    id: 2,
    number: 'F002',
    clientID: 1,
    amount: '150',
    amountWithIVA: 174.0,
    status: IInvoiceStatus.Completed,
  },
  {
    id: 3,
    number: 'F003',
    clientID: 2,
    amount: '600',
    amountWithIVA: 696.0,
    status: IInvoiceStatus.Completed,
  },
  {
    id: 4,
    number: 'F004',
    clientID: 3,
    amount: '450',
    amountWithIVA: 522.0,
    status: IInvoiceStatus.Canceled,
  },
  {
    id: 5,
    number: 'F005',
    clientID: 4,
    amount: '250',
    amountWithIVA: 290.0,
    status: IInvoiceStatus.Canceled,
  },
];

export const updateInvoiceData = (newData: IInvoicesData[]) => {
  invoicesData = newData;
};
