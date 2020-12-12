import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import Vimeo from '@u-wave/react-vimeo';
class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {quest: [], actVid: null};
      const ref = firebase.database().ref('videos');
      ref.once('value', (snapshot) => {
        var dataQuest = [];
        snapshot.forEach(childSnapshot => {
            dataQuest[childSnapshot.key] = childSnapshot.val();
        });
        this.setState({quest: dataQuest});
      });
  }

  onVidClicked(idVid) {
    const {quest} = this.state;
    var nQuest = Object.assign({}, quest);
    nQuest[idVid].seen = true;
    firebase.database().ref('videos').set(nQuest);
    this.setState({
      actVid: quest[idVid],
      quest: nQuest
    });
  }

  render() {
    return (
        <main>
          {
            Object.values(this.state.quest).map((vid, i) => 
              <p key={i} onClick={() => this.onVidClicked(i)}>
              {vid.seen ? "vu" : i}
              </p>
            )
          }
          {
            this.state.actVid && (
            <div id='playCt'>
              <button onClick={() =>this.setState({actVid: null})}>x</button>
              <Vimeo
                video={this.state.actVid.vid}
                autoplay
              />
            </div>
            )
          }
        </main>
    );
  }
}

export default Home;