import SearchComponent, { IFilterListItems } from './searchComponent';
import { useState } from 'react';
import ClientTable from './clientTable';
import { Dialog, Portal } from 'react-native-paper';
import { filterClientItems } from '@/app/screens/home/clients';

type ModalSearchClientProps = {
  showModal: boolean;
  selectedClient: number | null;
  setSelectedClient: React.Dispatch<React.SetStateAction<number | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalSearchClient = ({
  showModal,
  selectedClient,
  setShowModal,
  setSelectedClient,
}: ModalSearchClientProps) => {
  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<number>(0);

  return (
    <Portal>
      <Dialog
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        style={{ padding: 0, backgroundColor: '#fff' }}
      >
        <Dialog.Title style={{ textAlign: 'center' }}>
          Buscar cliente
        </Dialog.Title>
        <Dialog.Content>
          <SearchComponent
            inputLabel='Buscar cliente...'
            searchQuery={searchQuery}
            filterSelected={filterSelected}
            items={filterClientItems}
            setSearchQuery={setSearchQuery}
            setFilterSelected={setFilterSelected}
          />

          <ClientTable
            searchQuery={searchQuery}
            filterSelected={filterSelected}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            setShowModal={setShowModal}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ModalSearchClient;
