// import Vue from "vue"
// import VueSimpleAlert from "vue-simple-alert";
// Vue.use(VueSimpleAlert);
var buttonAudio = new Audio("audio/buttonclick.wav");
var endQuestAudio = new Audio("audio/victory.wav");
function playTap() {
  buttonAudio.play()
}
function playEnd() {
  endQuestAudio.play();
}

var test = new Vue({

  el: '#app',
  data: {
    // tracking status of page displaying
    profilePage: true,
    questListPage: false,
    questDetailsPage: false,
    mapPage: false,
    questIndex: 0,
    expPts: 0,
    profileQuest: "Start a Quest!",
    startedQuests: [],
    startedExists: false,

    //quest object
    questList: [
      {completed: false, started: false, read: false, favorited: false, name: "Bob and Betty Beyster Building Bake Off (BBBBB)", information: "Draw something funny on the board in room 1670 BBB"},
      {completed: false, started: false, read: false, favorited: false, name: "Thanks U(I) for the Memories", information: "High-five and thank a 493 IA in room 1670 BBB"},
      {completed: false, started: false, read: false, favorited: false, name: "Art at the UMMA", information: "Take three photos of art pieces you enjoyed"},
      {completed: false, started: false, read: false, favorited: false, name: "Diag Dinner", information: "Catch 3 campus squirrels"},

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
    toggleFavorited: function(idx) {
      this.questList[idx].favorited = !this.questList[idx].favorited;
    },



  } // methods
})



// FOR MAPBOX
mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbS1ndXp6aWUiLCJhIjoiY2t2aWFyaXhhY2kyMDJ3bnpvZzJuZTZ5aCJ9.JTDWinEddb4DDs-Rka2G6A';
	const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/team-guzzie/ckviauzayahyg14pcmcsenbvt/draft', // style URL
	center: [-83.7430, 42.2808], // starting position [lng, lat]
	zoom: 13 // starting zoom
	});

	const popup = new mapboxgl.Popup({ closeOnClick: false })
	.setLngLat([-83.7376137162, 42.2717655796])
	.setHTML('<p>Objective: UMMA</p>')
	.setMaxWidth("50px")
	.addTo(map);
