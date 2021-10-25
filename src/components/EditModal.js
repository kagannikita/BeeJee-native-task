import React from 'react';
import {useDispatch} from 'react-redux';
import {
  Alert,
  AsyncStorage,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../const/const';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import axios from 'axios';
import {editTask} from '../redux/actions';

const EditModal = ({todo}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const [data, setData] = React.useState(todo.text);
  const edit = async () => {
    const formData = new FormData();
    formData.append('token', await AsyncStorage.getItem('token'));
    formData.append('text', data);
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
          dispatch(editTask({id: todo.id, text: data}));
          setModalVisible(false);
          Alert.alert('Данные обновлены');
        } else {
          Alert.alert(response.data.message);
        }
      })
      .catch(error => console.log(error.message));
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('MyModal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="close"
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <View>
              <Text> Edit Task </Text>
              <View>
                <TextInput
                  value={data}
                  onChangeText={event => {
                    setData(event);
                  }}
                  placeholder="Enter text"
                />
                <Button title="Edit" color={COLORS.primary} onPress={edit} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.actionIcon}
        onPress={() => setModalVisible(true)}>
        <Icon name="edit" color="black" size={25} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modalView: {
    width: 300,
    height: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
  },
  buttonOpen: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  buttonClose: {
    width: 50,
    height: 50,
    marginLeft: 500,
    marginHorizontal: 250,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    marginLeft: 25,
    marginVertical: 25,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
export default EditModal;
