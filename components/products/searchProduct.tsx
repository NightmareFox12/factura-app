import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu, Searchbar, useTheme } from 'react-native-paper';

type SearchProductProps = {
  searchQuery: string;
  filterSelected: number;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterSelected: React.Dispatch<React.SetStateAction<number>>;
};

const SearchProduct = ({
  searchQuery,
  filterSelected,
  setSearchQuery,
  setFilterSelected,
}: SearchProductProps) => {
  const theme = useTheme();

  //states
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Searchbar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder='Buscar Cliente...'
        style={{ flex: 1 }}
        clearIcon='close'
      />
      <Menu
        visible={showFilter}
        onDismiss={() => setShowFilter(false)}
        style={{ marginTop: 40 }}
        anchor={
          <IconButton
            icon={'filter-menu'}
            onPress={() => setShowFilter(true)}
          />
        }
      >
        <Menu.Item
          title='DNI'
          onPress={() => {
            setFilterSelected(0);
            setShowFilter(false);
          }}
          leadingIcon={'file-document'}
          style={styles.menuItem}
          titleStyle={{
            fontSize: 14,
            color:
              filterSelected === 0
                ? theme.colors.onPrimaryContainer
                : theme.colors.onBackground,
          }}
          containerStyle={[
            styles.menuItemContainer,
            filterSelected === 0 && {
              backgroundColor: theme.colors.inversePrimary,
            },
          ]}
        />

        <Menu.Item
          title='Nombre'
          onPress={() => {
            setFilterSelected(1);
            setShowFilter(false);
          }}
          leadingIcon={'text'}
          style={styles.menuItem}
          titleStyle={{
            fontSize: 14,
            color:
              filterSelected === 1
                ? theme.colors.onPrimaryContainer
                : theme.colors.onBackground,
          }}
          containerStyle={[
            styles.menuItemContainer,
            filterSelected === 1 && {
              backgroundColor: theme.colors.inversePrimary,
            },
          ]}
        />
        <Menu.Item
          title='Teléfono'
          onPress={() => {
            setFilterSelected(2);
            setShowFilter(false);
          }}
          leadingIcon={'phone'}
          titleStyle={{
            fontSize: 14,
            color:
              filterSelected === 2
                ? theme.colors.onPrimaryContainer
                : theme.colors.onBackground,
          }}
          style={styles.menuItem}
          containerStyle={[
            styles.menuItemContainer,
            filterSelected === 2 && {
              backgroundColor: theme.colors.inversePrimary,
            },
          ]}
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: { marginBottom: 20 },
  menuItem: {
    height: 30,
  },
  menuItemContainer: {
    padding: 5,
    borderRadius: 5,
  },
});

export default SearchProduct;
