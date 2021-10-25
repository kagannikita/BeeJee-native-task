import {
  Alert,
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
import React from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/actions';

const AddModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const [data, setData] = React.useState({username: '', email: '', text: ''});
  const add = () => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('text', data.text);
    axios
      .post(
        'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Name',
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
      .then(async response => {
        if (response.data.status === 'ok') {
          dispatch(
            addTask({
              username: data.username,
              email: data.email,
              text: data.text,
            }),
          );
          setModalVisible(false);
          Alert.alert('Данные добавлены');
        } else {
          if (response.data.message.username !== undefined) {
            Alert.alert('Username: ' + response.data.message.username);
          }
          if (response.data.message.email !== undefined) {
            Alert.alert('Email: ' + response.data.message.email);
          }
          if (response.data.message.text !== undefined) {
            Alert.alert('Text: ' + response.data.message.text);
          }
        }
      })
      .catch(error => console.log(error));
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
              <Text> Add a task </Text>
              <View>
                <TextInput
                  placeholder="Enter username"
                  value={data.username}
                  onChangeText={event => {
                    setData({
                      username: event,
                      email: data.email,
                      text: data.text,
                    });
                  }}
                />
                <TextInput
                  value={data.email}
                  onChangeText={event => {
                    setData({
                      username: data.username,
                      email: event,
                      text: data.text,
                    });
                  }}
                  placeholder="Enter email"
                />
                <TextInput
                  value={data.text}
                  onChangeText={event => {
                    setData({
                      username: data.username,
                      email: data.email,
                      text: event,
                    });
                  }}
                  placeholder="Enter text"
                />
                <Button title="Add" color={COLORS.primary} onPress={add} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.iconContainer]}
        onPress={() => setModalVisible(true)}>
        <Icon name="add" color={COLORS.white} size={30} />
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
});
export default AddModal;
