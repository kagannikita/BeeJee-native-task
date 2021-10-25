import React from 'react';
import {
  AsyncStorage,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ListItem from './src/components/ListItem';
import axios from 'axios';
import {COLORS, sort} from './src/const/const';
import LoginModal from './src/components/LoginModal';
import AddModal from './src/components/AddModal';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks} from './src/redux/actions';

const App = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [sorting, setSortingValue] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState('');
  React.useEffect(() => {
    const sorts = sorting.split('_');
    axios
      .get(
        `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name&sort_field=${sorts[0]}
        &sort_direction=${sorts[1]}&page=${page}`,
      )
      .then(response => {
        dispatch(getTasks(response.data.message.tasks));
        setLimit(response.data.message.total_task_count);
      })
      .catch(error => console.log(error));
  }, [dispatch, page, sorting]);

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>TODO APP</Text>
        {AsyncStorage.getItem('token') === null && <LoginModal />}
      </View>
      <Picker
        selectedValue={sorting}
        style={{height: 50, width: 350}}
        onValueChange={itemValue => setSortingValue(itemValue)}>
        {sort.map(picker => {
          return (
            <Picker.Item
              key={picker.name}
              label={picker.name}
              value={picker.value}
            />
          );
        })}
      </Picker>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={tasks}
        renderItem={({item}) => <ListItem todo={item} />}
      />
      {page > 1 && (
        <Button
          onPress={() => setPage(page - 1)}
          title="Prev Page"
          color={COLORS.primary}
        />
      )}
      {Math.floor(limit / 3) !== page && (
        <Button
          onPress={() => setPage(page + 1)}
          title="Next Page"
          color={COLORS.primary}
        />
      )}
      <View style={styles.footer} />
      <TouchableOpacity>
        <AddModal />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.primary,
  },
  flatList: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
});
export default App;
