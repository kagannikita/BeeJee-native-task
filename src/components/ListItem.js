import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {COLORS} from '../const/const';
import EditModal from './EditModal';
import axios from 'axios';
import {markTask} from '../redux/actions';
import {useDispatch} from 'react-redux';

const ListItem = ({todo}) => {
  const dispatch = useDispatch();
  function mark_status() {
    if (todo.status === 0) {
      return 10;
    }
    if (todo.status === 10) {
      return 0;
    }
    if (todo.status === 1) {
      return 11;
    }
    if (todo.status === 11) {
      return 1;
    }
  }
  const mark = async () => {
    if ((await AsyncStorage.getItem('token')) !== null) {
      console.log('Old status', todo.status);
      const newStatus = mark_status();
      const formData = new FormData();
      formData.append('token', await AsyncStorage.getItem('token'));
      formData.append('status', newStatus);
      console.log(newStatus);
      axios
        .post(
          `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${todo.id}?developer=Name`,
          formData,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
            },
          },
        )
        .then(response => {
          if (response.data.status === 'ok') {
            dispatch(markTask({id: todo.id, status: mark_status}));
          } else {
            Alert.alert(response.data.message);
          }
        })
        .catch(error => console.log(error.message));
    }
  };
  return (
    <View style={styles.listItem}>
      <View style={{flex: 1}}>
        <Text style={[styles.textItem]}>Username: {todo.username}</Text>
        <Text style={[styles.textItem]}>Email: {todo.email}</Text>
        <Text style={[styles.textItem]}>Text: {todo.text}</Text>
      </View>
      {todo.status > 9 ? (
        <TouchableOpacity>
          <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
            <Icon name="done" size={20} color="black" onPress={mark} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <View style={[styles.actionIcon, {backgroundColor: 'red'}]}>
            <Icon name="close" size={20} color="black" onPress={mark} />
          </View>
        </TouchableOpacity>
      )}
      {AsyncStorage.getItem('token') !== null && (
        <TouchableOpacity>
          <EditModal todo={todo} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  textItem: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.primary,
  },
  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginLeft: 5,
    borderRadius: 3,
  },
});
export default ListItem;
