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

  getBgCol(pCol = "") {
    const bgColT = [
      "#009E9A",
      "#41D9BE",
      "#FFCC1D",
      "#FF8614",
      "#F23F14"
    ];
    var nCol = pCol;
    while (nCol === pCol) {
      nCol = bgColT[Math.floor(Math.random() * 5)];
    }
    return nCol;
  }
  render() {
    var pCol = "";
    return (
        <main id="home">
          {
            Object.values(this.state.quest).map((vid, i) => {
              pCol = this.getBgCol(pCol);
              return (
                <p key={i} onClick={() => this.onVidClicked(i)} className={vid.seen ? "seen" : ""} style={{backgroundColor: pCol}}>
                {vid.seen ? <span style={{color: pCol}}>{vid.title}</span> : (i + 1)}
                </p>
              )
            })
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