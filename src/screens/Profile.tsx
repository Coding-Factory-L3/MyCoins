import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image, Text} from 'react-native-elements';
import {useAuth} from '../contexts/AuthContext';
import useLocation from '../hooks/useLocation';

const Profile: React.FC = () => {
  const {authData} = useAuth();
  const {currentLocation} = useLocation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background_container}>
        <Image
          source={require('../assets/image/profile.jpeg')}
          style={styles.background_img}
        />
      </View>

      <View style={styles.profile_container}>
        <Image
          source={require('../assets/image/profile_logo.jpeg')}
          style={styles.logo}
        />
        <Text h3>{authData?.username ? authData.username : 'Username'}</Text>
        <Text h4>
          {currentLocation ? currentLocation.city : 'Location not found'}
        </Text>

        <View style={styles.btn_container}>
          <TouchableOpacity style={styles.edit_container}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background_container: {
    width: '100%',
  },
  background_img: {
    height: 228,
    width: '100%',
  },
  profile_container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'visible',
    marginTop: -90,
  },
  logo: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderWidth: 2,
  },
  rs_container: {
    paddingVertical: 8,
    flexDirection: 'row',
  },
  followers_container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  btn_container: {
    flexDirection: 'row',
  },
  edit_container: {
    width: 124,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00F7FF',
    borderRadius: 10,
    marginHorizontal: 2,
  },
});

export default Profile;
