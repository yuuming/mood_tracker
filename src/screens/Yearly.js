import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MoodPalette from '../components/MoodPalette';
import _ from 'lodash';
import { toJS } from '../../node_modules/mobx';

@inject('rootStore')
@observer
export default class Yearly extends Component {
  constructor(props) {
    super(props);
    this.rootStore = this.props.rootStore;
    this.diaryStore = this.rootStore.diaryStore;
    this.accountStore = this.rootStore.accountStore;
    this.user = this.accountStore.user;
    this.markedDateArray = [];
    this.year = this.props.year;
    this.dataSource = [];
  }

  componentWillMount() {
    console.log(this.diaryStore.moodCounter);

    // create an obj for datasource
    _.forEach(this.diaryStore.moodCounter[this.year], element => {
      const obj = {
        month: element.month,
        moods: element.moods
      };
      this.dataSource.push(obj);
    });
  }

  // renderYearlyMood = ({ item }) => (
  //   <TouchableOpacity
  //   key={item.id}
  //   onPress={() => {
  //     console.log('hahahahahahah');
  //   }}>
  //     <View style={styles.container}>
  //        <View style={styles.colourPalette}>
  //          {monthSquare('blue', 'May', 'Happy')}
  //        </View>
  //      </View>

  //   </TouchableOpacity>
  // );
  // }

  renderYearlyMood(item) {
    console.log('renderYearlyMood');
    console.log(item);

    return (
      <View
        key={item.item.month}
        style={{
          margin: 10,
          width: '28%',
          height: 130,
          backgroundColor: 'white'
        }}
      >
        <Text>{item.item.month}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          numColumns={3}
          keyExtractor={index => index}
          data={this.dataSource}
          renderItem={item => this.renderYearlyMood(item)}
        />
      </View>
    );
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.colourPalette}>
  //         {monthSquare('blue', 'May', 'Happy')}
  //       </View>
  //     </View>
  //   );
  // }
}

const monthSquare = (color, month, mood) => (
  <View
    style={{
      height: 120,
      width: 90,
      borderWidth: 1,
      borderColor: '#95a8c6'
    }}
  >
    <View style={{ backgroundColor: color, height: 70, width: 90 }} />

    <Text
      style={{
        fontSize: 20,
        fontWeight: '300',
        color: '#3c3642',
        paddingLeft: 5
      }}
    >
      {month}
    </Text>
    <Text
      style={{
        fontSize: 15,
        fontWeight: '100',
        color: '#3c3642',
        paddingLeft: 5
      }}
    >
      {mood}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});
