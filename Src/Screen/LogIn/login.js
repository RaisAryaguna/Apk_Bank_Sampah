import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Login&Register/boxLogReg';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      lihat: true,
      email: '',
      password: '',
      loading: false,
    };
  }
  Masuk = () => {
    console.log('logIn');
    const {email, password} = this.state;
    const url = 'https://sammpah.herokuapp.com/api/login';
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log(resjson);
        const {token, user} = resjson;
        if (token) {
          ToastAndroid.show(
            ' Anda Berasil Masuk',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            // console.log(resJson),
          );
          AsyncStorage.setItem('user', user.id.toString());
          AsyncStorage.setItem('role', user.role_id.toString());
          AsyncStorage.setItem('token', token);
          console.log(' ini role_id ', resjson.user.role_id);
          this.role_id(user.role_id);
          this.setState({loading: false});
          // this.role_id(resjson.user.role_id);
        } else if (resjson.error) {
          alert(resjson.error);
          this.setState({loading: false});
        } else {
          console.log(error);
          this.setState({loading: false});
        }
      })
      .catch((err) => console.log(err), this.setState({loading: false}));
  };
  Lihat = () => {
    this.setState({lihat: !this.state.lihat});
  };
  role_id(role) {
    if (role == 1) {
      this.props.navigation.replace('Rumah', {screen: 'HomeOne'});
    } else if (role == 2) {
      this.props.navigation.replace('Rumah', {screen: 'Home1'});
    } else {
      this.props.navigation.replace('Rumah', {screen: 'Home2'});
    }
  }
  render() {
    return (
      <ScrollView style={styles.utama}>
        <View style={styles.titel}>
          <Image
            style={styles.imageQu}
            source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
          />
          <Text style={styles.teksTitel}> sammpaH </Text>
        </View>
        <View style={styles.box}>
          <View style={styles.inpuQu}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="mail" size={39} color="blue" />
            </View>
            <View style={styles.inputAja}>
              <TextInput
                placeholder="Email"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={(text) => this.setState({email: text})}
              />
            </View>
          </View>
          <View style={styles.inpuQu}>
            <View style={styles.iconQu}>
              <Icon name="lock" size={39} color="red" />
            </View>
            <View style={styles.inputAja}>
              <TextInput
                placeholder="Password"
                value={this.state.password}
                secureTextEntry={this.state.lihat}
                onChangeText={(text) => this.setState({password: text})}
              />
            </View>
            <View style={styles.iconQu}>
              <Icon
                name="visibility"
                size={35}
                color="red"
                onPress={() => this.Lihat()}
              />
            </View>
          </View>
        </View>
        <View style={styles.textAja}>
          <View>
            <Text
              style={styles.textSaya}
              onPress={() => this.props.navigation.navigate('Register')}>
              Buat Akun Baru
            </Text>
          </View>
          <View>
            <Text
              style={{...styles.textSaya, marginLeft: 90}}
              onPress={() => this.props.navigation.navigate('LupPass')}>
              Lupa Password
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.tombolKlik}
          onPress={() => this.Masuk()}>
          {this.state.loading ? (
            <ActivityIndicator size={40} color="red" />
          ) : (
            <Text style={styles.teksLogIn}>Masuk</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Login;
