type InvoicesData = {
  id: number;
  number: string;
  client: string;
  amount: string;
  amountWithIVA: string;
  status: string;
};

export const invoicesData: InvoicesData[] = [
  {
    id: 1,
    number: 'F001',
    client: 'Juan Pérez',
    amount: '$120',
    amountWithIVA: '$139.20',
    status: 'Pagado',
  },
  {
    id: 2,
    number: 'F002',
    client: 'María González',
    amount: '$150',
    amountWithIVA: '$174.00',
    status: 'Pagado',
  },
  {
    id: 3,
    number: 'F003',
    client: 'Carlos Rodríguez',
    amount: '$600',
    amountWithIVA: '$696.00',
    status: 'Pagado',
  },
  {
    id: 4,
    number: 'F004',
    client: 'Ana Martínez',
    amount: '$450',
    amountWithIVA: '$522.00',
    status: 'Cancelado',
  },
  {
    id: 5,
    number: 'F005',
    client: 'Gabriel Montana',
    amount: '$250',
    amountWithIVA: '$290.00',
    status: 'Cancelado',
  },
];
