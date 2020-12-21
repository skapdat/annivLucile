import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import Vimeo from '@u-wave/react-vimeo';
class Home extends Component {
  randSel = [];
  constructor(props) {
      super(props);
      this.state = {quest: [], actVid: null, isRandom: false};
      const ref = firebase.database().ref('videos');
      ref.once('value', (snapshot) => {
        var dataQuest = [];
        snapshot.forEach(childSnapshot => {
            dataQuest[childSnapshot.key] = childSnapshot.val();
        });
        var isRd = Object.values(dataQuest).reduce((acc, o) => {
          if (o.seen) acc++;
          return acc;
        }, 0);
        this.setState({quest: dataQuest, isRandom: isRd === Object.values(dataQuest).length});
      });
  }

  onVidClicked(idVid) {
    const {quest} = this.state;
    var nQuest = Object.assign({}, quest);
    nQuest[idVid].seen = true;
    firebase.database().ref('videos').set(nQuest);
    var isRd = Object.values(nQuest).reduce((acc, o) => {
      if (o.seen) acc++;
      return acc;
    }, 0);
    this.setState({
      actVid: quest[idVid],
      quest: nQuest,
      isRandom: isRd === Object.values(nQuest).length
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

  randomVid() {
    const {quest} = this.state;
    var selVid = -1;
    if (this.randSel.length === Object.values(quest).length) { this.randSel = [] };
    selVid = Math.floor(Math.random() *  Object.values(quest).length);
    if (this.randSel.indexOf(selVid) > -1) {
      while (this.randSel.indexOf(selVid) > -1) {
        selVid = Math.floor(Math.random() *  Object.values(quest).length);
      }
    }
    this.randSel.push(selVid);
    this.setState({
      actVid: quest[selVid]
    });
  }

  render() {
    var pCol = "";
    return (
        <main id="home">
          {
            this.state.isRandom && <div id="randCt"><button id='random' onClick={() => this.randomVid()}>Au hasard</button></div>
          }
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