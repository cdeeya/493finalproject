// import Vue from "vue"
// import VueSimpleAlert from "vue-simple-alert";
// Vue.use(VueSimpleAlert);

// AUDIO
var buttonAudio = new Audio("audio/buttonclick.wav");
var endQuestAudio = new Audio("audio/victory.wav");
var resetAudio = new Audio("audio/buttonReset.wav");
function playTap() {
  buttonAudio.play()
}
function playEnd() {
  endQuestAudio.play();
}

function playRestart() {
  resetAudio.play();
}

// VUE
var test = new Vue({
  el: '#app',
  data: {
    // tracking status of page displaying
    profilePage: true,
    questListPage: false,
    questDetailsPage: false,
    mapPage: false,
    emote: false,
    questIndex: 0,
    currLevel: 1,
    expPts: 0,
    // profileQuest: "Start a Quest!",
    startedExists: false,
    startedQuests: [],

    //quest object
    questList: [
            {completed: false,
             started: false,
             read: false,
             favorited: false,
             index: 0,
             name: "Bob and Betty Beyster Building Bake Off (BBBBB)",
             information: "Draw something funny on the board in room 1670 BBB",
             long: -83.71626555919647,
             lat: 42.29294516616928
           },
            {completed: false,
             started: false,
             read: false,
             favorited: false,
             index: 1,
             name: "Thanks U(I) for the Memories",
             information: "High-five and thank a 493 IA in room 1670 BBB",
             long: -83.71626555919647,
             lat: 42.29294516616928
          },
            {completed: false,
             started: false,
             read: false,
             favorited: false,
             index: 2, 
             name: "Art at the UMMA",
             information: "Take three photos of art pieces you enjoyed",
             long: -83.73983681201935,
             lat: 42.27559012188965
          },
            {completed: false,
             started: false,
             read: false,
             favorited: false,
             index: 3,
             name: "Diag Dinner",
             information: "Catch 3 campus squirrels",
             long: -83.73821139335631,
             lat: 42.276892015270626,
           },

          ],
    quest: {
      completed: false,
      started: false,
      read: false,
      favorited: false,
      information: " ",
      name: " ",
    }

    //let Quest = {completed: false, started: false, read: false, favorited: false},
    //TODO: quest object should also include map information (quest location and quest distance from user)
  },
  methods: {

    // TO SWITCH PAGES:
    SwitchProfile: function () {
      console.log("this changes the page to profile page")
      this.profilePage = true;
      this.questListPage = false;
      this.mapPage = false;
      this.questDetailsPage = false;
    },
    SwitchQuests: function() {
      console.log("this changes the page to Quest List page")
      this.questListPage = true;
      this.profilePage = false;
      this.mapPage = false;
      this.questDetailsPage = false;
    },
    SwitchMap: function() {
      console.log("this changes the page to Map View page")
      this.mapPage = true;
      this.questListPage = false;
      this.profilePage = false;
      this.questDetailsPage = false;
    },
    SwitchDetails: function(idx) {
      this.questIndex = idx;
      console.log(this.questIndex);
      console.log("this changes the page to Quest Details page")
      this.questListPage = false;
      this.profilePage = false;
      this.mapPage = false;
      this.questDetailsPage = true;
    },

    SwitchDetailsProfile: function() {
      this.questIndex = this.startedQuests[0].index;
      this.questListPage = false;
      this.profilePage = false;
      this.mapPage = false;
      this.questDetailsPage = true;
    },

    //FILL UP QUEST Info
    //initialize our array with these empty quest objects
    //just straight hard code in the quest information
    // fillQuestInfo: function() {
    //   // TODO: how to initialize quest so v-for works???
    //   //quest #1
    //     this.questList.push = new quest; //look into initializing array with this object
    //     this.questList[0].name = "Bob and Betty Beyster Building Bake Off (BBBBB)";
    //     this.questList[0].information = "Draw something funny on the board in room 1670 BBB";

    //   //quest #2
    //     this.questList.push = new quest;
    //     this.questList[1].name = "Bob and Betty Beyster Building Bake Off (BBBBB)";
    //     this.questList[1].information = "Draw something funny on the board in room 1670 BBB";
    // },

    /*
    checkQuests: function() {
      // console.log("this checks quest bool values")
      for (i = 0; i < this.questList.length; ++i){
      //   // console.log("this is inside checkQuests() for loop")
      //   // TODO: check + change(?) bool values of completed, started, read, favorited
      //   // testing:
      //   // questList[0].completed = true;
        if (this.questList[i].started == true){
          this.questIndex = i;
          this.profileQuest = this.questList[i].name;
          this.profilePage = false;
          this.mapPage = false;
          this.questDetailsPage = true;
          this.questListPage = false;
          break;
        }
        else{
          this.profilePage = false;
          this.mapPage = false;
          this.questDetailsPage = false;
          this.questListPage = true;
        }
      } // for
    },
    */

    // GETTERS
    questCompleted: function(idx) {
      // help please
      // console.log("in questComplete function")
      if (this.questList[idx].completed == true){
        return true;
      }
      else{
        return false;
      }
    },
    questRead: function(idx) {
      if (this.questList[idx].read == true) {
        return true;
      }
      else {
        return false;
      }
    },
    questStarted: function(idx) {
      if (this.questList[idx].started == true) {
        return true;
      }
      else {
        return false;
      }
    },
    questFavorited: function(idx) {
      if (this.questList[idx].favorited == true) {
        return true;
      }
      else {
        return false;
      }
    },
    /* getExp: function() {
      console.log("here")
      console.log(this.expPts);
    }, */

    // SETTERS
    setRead: function(idx) {
      this.questList[idx].read = true;
    },
    setStarted: function(idx) {
      this.questList[idx].started = true;
      this.startedQuests.push(this.questList[idx]);
      console.log(this.startedQuests);
      this.startedExists = true;
    },
    setCompleted: function(idx) {
      this.questList[idx].completed = true;
      this.questList[idx].started = false;

      this.startedQuests = this.startedQuests.filter(e => e.name !== this.questList[idx].name)
      console.log(this.startedQuests);
      if (this.startedQuests.length==0) {
        this.startedExists = false;
      }
      // TODO: do we want to change EXP values later?
      this.expPts += 100;
      // move this to a stylized modal later
      // alert("Congrats, you finished a quest! You've earned 100 EXP Points");
      Swal.fire({title: "Congrats, you finished a quest! You've earned 100 EXP Points",});
    },

    setRestart: function(idx) {
      this.questList[idx].read = true;
      this.questList[idx].started = true;
      this.questList[idx].completed = false;
    },

    toggleFavorited: function(idx) {
      this.questList[idx].favorited = !this.questList[idx].favorited;
    },

    toggleEmote: function() {
      this.emote = !this.emote;
    },


  } // methods
})

// mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbS1ndXp6aWUiLCJhIjoiY2t2aWFyaXhhY2kyMDJ3bnpvZzJuZTZ5aCJ9.JTDWinEddb4DDs-Rka2G6A';
$(document).ready(function() {
    console.log( "ready!" );
    navigator.geolocation.getCurrentPosition((position) => {
      var start_lat = position.coords.latitude;
      var start_long = position.coords.longitude;
      console.log(start_long, start_lat); //test api with a console log

      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/team-guzzie/ckviauzayahyg14pcmcsenbvt/draft', // style URL
        center: [start_long, start_lat], // starting position [lng, lat]
        zoom: 13 // starting zoom
      });

      const marker = new mapboxgl.Marker({
        color: "#868BFE"
      })
        .setLngLat([start_long, start_lat])
        .setPopup(new mapboxgl.Popup().setHTML("<span>Current Location!</span>"))
        .addTo(map);

      const marker_bbb = new mapboxgl.Marker()
        .setLngLat([-83.71726555919647, 42.29294516616900])
        .setPopup(new mapboxgl.Popup().setHTML("<span>Bob and Betty Beyster Building Bake Off (BBBBB)</span>"))
        .addTo(map);

      const marker_bbb2 = new mapboxgl.Marker()
        .setLngLat([-83.71626555919647, 42.29294516616928])
        .setPopup(new mapboxgl.Popup().setHTML("<span>Thanks U(I) for the Memories</span>"))
        .addTo(map);

      const marker_umma = new mapboxgl.Marker()
        .setLngLat([-83.73983681201935, 42.27559012188965])
        .setPopup(new mapboxgl.Popup().setHTML("<span>Art at the UMMA!</span>"))
        .addTo(map);

      const marker_diag = new mapboxgl.Marker()
        .setLngLat([-83.73821139335631, 42.276892015270626])
        .setPopup(new mapboxgl.Popup().setHTML("<span>Diag Dinner</span>"))
        .addTo(map);
    })
})
