import { invoicesData, updateInvoiceData } from '@/dataTest/invoiceData';
import { IInvoiceStatus } from '@/types/invoice.entity';
import { useEffect, useState } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type modalStatusInvoiceProps = {
  invoiceSelected: {
    invoiceID: number | null;
    showModal: boolean;
  };
  setInvoiceSelected: React.Dispatch<
    React.SetStateAction<{
      invoiceID: number | null;
      showModal: boolean;
    }>
  >;
};

const ModalStatusInvoice = ({
  invoiceSelected,
  setInvoiceSelected,
}: modalStatusInvoiceProps) => {
  //states
  const [status, setStatus] = useState<IInvoiceStatus | undefined>(undefined);

  //effects
  useEffect(() => {
    const savedStatus = invoicesData.find(
      (x) => invoiceSelected.invoiceID === x.id
    )?.status;

    if (status === undefined) return;
    setStatus(savedStatus);
  }, [invoiceSelected.invoiceID, status]);

  //functions
  const handleChangeStatus = () => {
    updateInvoiceData(
      invoicesData.map((x) =>
        x.id === invoiceSelected.invoiceID
          ? { ...x, status: IInvoiceStatus.Completed }
          : x
      )
    );
  };

  return (
    <Portal>
      <Dialog
        visible={invoiceSelected.showModal}
        onDismiss={() =>
          setInvoiceSelected({ invoiceID: null, showModal: false })
        }
      >
        <Dialog.Title style={{ textAlign: 'center' }}>
          Cambiar Estado
        </Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium'>
            ¿Esta seguro de cambiar{' '}
            {IInvoiceStatus.Completed === status ? 'cafe' : 'hambre'}?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode='text'
            onPress={() =>
              setInvoiceSelected({ invoiceID: null, showModal: false })
            }
          >
            Cerrar
          </Button>
          <Button onPress={handleChangeStatus} mode='text'>
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default ModalStatusInvoice;
