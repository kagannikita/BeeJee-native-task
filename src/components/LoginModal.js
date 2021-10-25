import React from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {COLORS} from '../const/const';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const LoginModal = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [data, setData] = React.useState({username: '', password: ''});
  const login = () => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    axios
      .post(
        'https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Name',
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
          await AsyncStorage.setItem('token', response.data.message.token);
          setModalVisible(false);
        } else {
          Alert.alert(response.data.message.password);
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
              <Text> Login Form </Text>
              <View>
                <TextInput
                  placeholder="Enter username"
                  value={data.username}
                  onChangeText={event => {
                    setData({
                      username: event,
                      password: data.password,
                    });
                  }}
                />
                <TextInput
                  secureTextEntry={true}
                  value={data.password}
                  onChangeText={event => {
                    setData({
                      username: data.username,
                      password: event,
                    });
                  }}
                  placeholder="Enter Password"
                />
                <Button title="Login" color={COLORS.primary} onPress={login} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {AsyncStorage.getItem('token') !== null ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Login</Text>
        </Pressable>
      ) : (
        <Text />
      )}
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
    padding: 10,
    elevation: 2,
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
});
export default LoginModal;
