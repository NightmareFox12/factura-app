import { useState } from 'react';
import SearchComponent from './searchComponent';
import { filterProductItems } from '@/app/screens/home/products';
import { Dialog, Portal, useTheme } from 'react-native-paper';
import ProductTable from './productTable';

type ModalSearchProductProps = {
  showModal: boolean;
  selectedProduct: number | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<number | null>>;
};

const ModalSearchProduct = ({
  showModal,
  selectedProduct,
  setShowModal,
  setSelectedProduct,
}: ModalSearchProductProps) => {
  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<number>(0);

  return (
    <Portal>
      <Dialog
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        style={{ backgroundColor: '#fff' }}
      >
        <Dialog.Title>Buscar Producto</Dialog.Title>
        <Dialog.Content>
          <SearchComponent
            inputLabel='Buscar producto...'
            searchQuery={searchQuery}
            filterSelected={filterSelected}
            items={filterProductItems}
            setSearchQuery={setSearchQuery}
            setFilterSelected={setFilterSelected}
          />

          <ProductTable
            filterSelected={filterSelected}
            searchQuery={searchQuery}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            setShowModal={setShowModal}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ModalSearchProduct;
