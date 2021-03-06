import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import styles from '../../Components/EditProfile/editProfil';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class EditPass extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      password_change: '',
      token: '',
      loading: false,
      lihat: true,
      lihat1: true,
      visibel: true,
    };
  }

  EditProfil = () => {
    const {password, password_change} = this.state;
    const url = 'https://sammpah.herokuapp.com/api/ganti';
    const data = {
      password: password,
      password_change: password_change,
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        const {status} = resJson;
        if (status == 'Success') {
          ToastAndroid.show(
            ' Password Berasil Di Ubah',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
          );
          this.setState({loading: false});
          // this.props.navigation.navigate('Home');
        } else {
          this.setState({loading: false});
          console.log('error');
          alert('error');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error nya adalah ' + error);
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token != null) {
          this.setState({token: token});
          // console.log(this.state.token);
          // console.log(this.state.data);
        } else {
          console.log('token tidak ada');
        }
      })
      .catch((err) => console.log(err));
  }
  Lihat = () => {
    this.setState({lihat: !this.state.lihat});
  };
  Lihat1 = () => {
    this.setState({lihat1: !this.state.lihat1});
  };
  render() {
    return (
      <View style={styles.utama}>
        <View style={{...styles.head, marginBottom: 50}}>
          <Text style={{fontSize: 35}}> Ubah Password</Text>
        </View>
        <ScrollView refreshControl>
          <View style={styles.box}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  ...styles.boxInpur,
                  marginBottom: 20,
                }}>
                <TextInput
                  style={styles.teksInput}
                  placeholder="Password Lama"
                  // value={this.state.password}
                  secureTextEntry={this.state.lihat}
                  onChangeText={(text) => this.setState({password: text})}
                />

                <Icon
                  style={styles.aikon}
                  name="visibility"
                  size={35}
                  // color="red"
                  onPress={() => this.Lihat()}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.boxInpur}>
                <TextInput
                  style={styles.teksInput}
                  placeholder=" Password Baru"
                  // value={this.state.password_change}
                  secureTextEntry={this.state.lihat1}
                  onChangeText={(text) =>
                    this.setState({password_change: text})
                  }
                />

                <Icon
                  style={styles.aikon}
                  name="visibility"
                  size={35}
                  // color="red"
                  onPress={() => this.Lihat1()}
                />
              </View>
            </View>
          </View>
          <View style={styles.tombol}>
            <TouchableOpacity onPress={() => this.EditProfil()}>
              {this.state.loading ? (
                <ActivityIndicator size={25} color="red" />
              ) : (
                <Text style={{fontSize: 35}}> Simpan</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EditPass;
