type InvoicesData = {
  id: number;
  number: string;
  client: string;
  amount: string;
  status: string;
};

export const invoicesData: InvoicesData[] = [
  {
    id: 1,
    number: 'F001',
    client: 'Juan Pérez',
    amount: '$120',
    status: 'Pagado',
  },
  {
    id: 2,
    number: 'F002',
    client: 'María González',
    amount: '$150',
    status: 'Pagado',
  },
  {
    id: 3,
    number: 'F003',
    client: 'Carlos Rodríguez',
    amount: '$600',
    status: 'Pagado',
  },
  {
    id: 4,
    number: 'F004',
    client: 'Ana Martínez',
    amount: '$450',
    status: 'Cancelado',
  },
];
