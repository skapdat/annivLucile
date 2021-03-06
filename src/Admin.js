
import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import Vimeo from '@u-wave/react-vimeo';

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

  onTiChanged(idVid, e) {
    const {quest} = this.state;
    var nQuest = Object.assign({}, quest);
    nQuest[idVid].title = e.target.value;
    this.setState({
      quest: nQuest
    });
    firebase.database().ref('videos').set(nQuest);
  }


  onVidChanged(idVid, e) {
    const {quest} = this.state;
    var nQuest = Object.assign({}, quest);
    nQuest[idVid].vid = e.target.value;
    this.setState({
      quest: nQuest
    });
    firebase.database().ref('videos').set(nQuest);
  }

  resetSeen() {
    const {quest} = this.state;
    var nQuest = Object.assign({}, quest);
    Object.values(this.state.quest).forEach((vid, i) => {
      nQuest[i].seen = false;
    });
    firebase.database().ref('videos').set(nQuest);
  }

  render() {
    return (
        <main id="adminCt">
          <h2>Admin</h2>
          {
            Object.values(this.state.quest).map((vid, i) => 
              <div key={i}>
                <span>{(i + 1)}</span>
                <input type="text" value={vid.title} onChange={(e) => this.onTiChanged(i, e)}/>
                <input type="text" value={vid.vid} onChange={(e) => this.onVidChanged(i, e)}/>
                <Vimeo
                  video={vid.vid}
                />
              </div>
            )
          }
          <button id="reset" onClick={() => this.resetSeen()}>Reset</button>
        </main>
    );
  }
}

export default Home;