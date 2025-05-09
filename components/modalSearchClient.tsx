import { Dialog, Portal } from 'react-native-paper';
import SearchComponent from './searchComponent';
import { useState } from 'react';
import ClientTable from './clientTable';

type ModalSearchClientProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalSearchClient = ({
  showModal,
  setShowModal,
}: ModalSearchClientProps) => {
  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<number>(0);

  return (
    <Portal>
      <Dialog visible={showModal} onDismiss={() => setShowModal(false)}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          Buscar cliente
        </Dialog.Title>
        <Dialog.Content>
          <SearchComponent
            inputLabel={''}
            searchQuery={searchQuery}
            filterSelected={filterSelected}
            items={[]}
            setSearchQuery={setSearchQuery}
            setFilterSelected={setFilterSelected}
          />

          <ClientTable
            searchQuery={searchQuery}
            filterSelected={filterSelected}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ModalSearchClient;
