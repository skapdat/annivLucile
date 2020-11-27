import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/database";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {quest: []};
        const ref = firebase.database().ref('videos');
        ref.once('value', (snapshot) => {
        var dataQuest = [];
        snapshot.forEach(childSnapshot => {
            dataQuest[childSnapshot.key] = childSnapshot.val();
        });
        this.setState({quest: dataQuest});
        });
    }
  render() {
    return (
        <main>
          {
            this.state.quest.map((e, i) =>  <p key={i} data-link={e}>{i}</p>)
          }
        </main>
    );
  }
}

export default Home;