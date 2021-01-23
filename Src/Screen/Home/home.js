import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Home/BoxHome';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      saldo: '',
      nama: '',
      email: '',
      data: [],
      user: '',
    };
  }
  componentDidMount() {
    console.log('get token');
    AsyncStorage.getItem('token').then((token) => {
      AsyncStorage.getItem('user').then((user) => {
        this.setState({user: user});
        console.log('ini user', this.state.user);
      });
      // console.log(name);
      this.saldoKu(token);
      this.histori(token);
    });
  }
  saldoKu(token) {
    console.log('memuali get saldo');
    const url = 'https://sammpah.herokuapp.com/api/getSaldo';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({saldo: resJson.data, loading: false});
        console.log(resJson.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }
  histori(token) {
    console.log('memulai histori');
    const url = 'https://sammpah.herokuapp.com/api/historyPenjemputan';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({data: resJson.data, loading: false});
        console.log(resJson.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }
  statusBarang(status, id, user_id) {
    console.log(user_id);
    if (status == 0) {
      return (
        <View>
          <Text>Menunggu Konfirmasi</Text>
          <View style={styles.tomKonfrim}>
            <TouchableNativeFeedback
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  user_id: id,
                  id: user_id,
                })
              }>
              <Icon name="message" size={30} />
            </TouchableNativeFeedback>
          </View>
        </View>
      );
    } else if (status == 1) {
      return (
        <View>
          <Text> Menunggu Penjemputan Anda </Text>
          <View style={styles.tomKonfrim}>
            <TouchableNativeFeedback
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  user_id: id,
                  id: user_id,
                })
              }>
              <Icon name="message" size={40} />
            </TouchableNativeFeedback>
          </View>
        </View>
      );
    } else if (status == 3) {
      return (
        <View>
          <Text style={{fontSize: 30, color: 'red'}}> Dibatalkan </Text>
        </View>
      );
    } else if (status == 2) {
      return (
        <View>
          <Text style={{fontSize: 30, color: 'blue'}}> Selesai </Text>
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headers}>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{...styles.boxgambar, marginRight: '68%'}}>
            <Image
              source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
              style={styles.gambar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Kontak')}
            style={styles.IconHead}>
            <Icon name="question-answer" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor: '#00c853'}}>
          <View style={styles.head}>
            <View style={styles.dataKu}>
              <View>
                <Text style={{fontSize: 23}}>Rais Azaria Aryguna</Text>
              </View>
              <View>
                <Text style={{fontSize: 15}}>raisazaria30@gmail.com</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxsaldo}>
              <View style={styles.saldo}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="account-balance-wallet" size={40} />
                  <View style={{justifyContent: 'center'}}>
                    {this.state.saldo == null ? (
                      <Text style={{fontSize: 25}}> Rp.0 </Text>
                    ) : (
                      <Text style={{fontSize: 25}}>Rp.{this.state.saldo}</Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <ScrollView horizontal={true}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Penjemputan')}
                  style={styles.boxFitur}>
                  <Text>penjemputan sampah</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Tabungan')}
                  style={styles.boxFitur}>
                  <Text>buku tabungan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TarikSaldo')}
                  style={styles.boxFitur}>
                  <Text>penaria saldo</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
          <View>
            <View>
              <Text> Riwanyat Penyetoran Sampah </Text>
            </View>
            <View>
              {this.state.data == null ? (
                <View>
                  <Text>Anda tidak memiliki Riwanyat Penyetoran</Text>
                </View>
              ) : (
                <View>
                  {this.state.data.map((val, key) => {
                    return (
                      <View key={key} style={styles.dataMap}>
                        <View>
                          <Text> Alamat Penjemputan = {val.address}</Text>
                        </View>
                        <View>
                          <Text> Keterangan = {val.description}</Text>
                        </View>
                        <View>
                          <Text> Permintaan = {val.created_at}</Text>
                        </View>
                        <View>
                          <Text> Nomer = {val.phone_number}</Text>
                        </View>
                        <View>
                          <Image
                            source={{uri: val.image}}
                            style={styles.imageSampah}
                          />
                        </View>
                        <View style={{margin: 10}}>
                          {this.statusBarang(val.status, (id = 4), val.user_id)}
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
