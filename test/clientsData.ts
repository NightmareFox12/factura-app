type ClientsData = {
  id: number;
  dni: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export const clientsData: ClientsData[] = [
  { id: 1, dni: '12345678', name: 'Juan Pérez', phone: '0412-1234567', email: 'juan.perez@example.com', address: 'Av. Principal #123' },
  { id: 2, dni: '87654321', name: 'María González', phone: '0414-7654321', email: 'maria.gonzalez@example.com', address: 'Calle Secundaria #456' },
  { id: 3, dni: '23456789', name: 'Carlos Rodríguez', phone: '0426-2345678', email: 'carlos.rodriguez@example.com', address: 'Urbanización Centro #789' },
  { id: 4, dni: '98765432', name: 'Ana Martínez', phone: '0416-8765432', email: 'ana.martinez@example.com', address: 'Residencias Norte #101' },
];
