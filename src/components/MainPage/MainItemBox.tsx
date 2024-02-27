import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

interface MainItemBoxProps {
  item: MainItem;
}

interface MainItem {
  name: string;
  image: string;
}

function MainItemBox({item}: MainItemBoxProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>{item?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainItemBox;
