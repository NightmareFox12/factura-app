import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Menu, Searchbar, useTheme } from 'react-native-paper';

export interface IFilterListItems {
  id: number;
  title: string;
  icon?: string;
}

type SearchClientProps = {
  searchQuery: string;
  filterSelected: number;
  items: IFilterListItems[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterSelected: React.Dispatch<React.SetStateAction<number>>;
};

const SearchComponent = ({
  searchQuery,
  filterSelected,
  items,
  setSearchQuery,
  setFilterSelected,
}: SearchClientProps) => {
  const theme = useTheme();

  //states
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Searchbar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder='Buscar cliente...'
        style={{ flex: 1 }}
        clearIcon='close'
      />
      <Menu
        visible={showFilter}
        onDismiss={() => setShowFilter(false)}
        style={styles.menu}
        anchor={
          <IconButton
            icon={'filter-menu'}
            onPress={() => setShowFilter(true)}
          />
        }
      >
        {items.map((x, y) => (
          <Menu.Item
            key={y}
            title={x.title}
            onPress={() => {
              setFilterSelected(x.id);
              setShowFilter(false);
            }}
            leadingIcon={x.icon}
            style={styles.menuItem}
            titleStyle={{
              fontSize: 14,
              color:
                filterSelected === x.id
                  ? theme.colors.onPrimaryContainer
                  : theme.colors.onBackground,
            }}
            containerStyle={[
              styles.menuItemContainer,
              filterSelected === x.id && {
                backgroundColor: theme.colors.inversePrimary,
              },
            ]}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    marginTop: 40,
    marginStart: -5,
  },
  menuItem: {
    height: 30,
  },
  menuItemContainer: {
    padding: 5,
    borderRadius: 5,
  },
});

export default SearchComponent;
