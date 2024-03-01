import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const EditProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.icone}>
          <TouchableOpacity>
            <Image style={styles.img} />

            <View style={styles.icone}>
              <Text>icone</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.country_container}>
            <Text>Name</Text>
            <View style={styles.btn_date}>
              <TextInput />
            </View>
          </View>

          <View style={styles.country_container}>
            <Text>Email</Text>
            <View style={styles.btn_date}>
              <TextInput />
            </View>
          </View>

          <View style={styles.country_container}>
            <Text>Password</Text>
            <View style={styles.btn_date}>
              <TextInput />
            </View>
          </View>

          <View style={styles.country_container}>
            <Text>Date or Birth</Text>
            <TouchableOpacity style={styles.btn_date}>
              <Text>Select Date or Birth</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.country_container}>
          <Text>Country</Text>
          <View style={styles.country}>
            <TextInput />
          </View>
        </View>

        <TouchableOpacity style={styles.btn_save}>
          <Text style={styles.save}>Save Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 22,
  },
  profile: {
    alignItems: 'center',
    marginVertical: 22,
  },
  img: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
  },
  icone: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  btn_date: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  country_container: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  country: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  btn_save: {
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    color: 'white',
  },
});

export default EditProfile;
