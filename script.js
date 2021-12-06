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
  data () {
    return {
      accessToken:'pk.eyJ1IjoidGVhbS1ndXp6aWUiLCJhIjoiY2t2aWFyaXhhY2kyMDJ3bnpvZzJuZTZ5aCJ9.JTDWinEddb4DDs-Rka2G6A',
      test_start_long: 0, // very first start longitude when the site loads
      test_start_lat: 0, // very first start latitude when the site loads
      // tracking status of page displaying
      profilePage: true,
      questListPage: false,
      questDetailsPage: false,
      mapPage: false,
      emote: false,
      questIndex: 0,
      currLevel: 1,
      expPts: 0,
      avatarScreen: false,
      headIndex: 0,
      bodyIndex: 0,
      accIndex: 0,
      // profileQuest: "Start a Quest!",
      startedExists: false,
      startedQuests: [],

      // avatar customization
      avatarUnlockedHeads: ["images/UI_avatar/avatar_blank.png", "images/UI_avatar/avatar_top1.png","images/UI_avatar/avatar_top2.png", "images/UI_avatar/avatar_top3.png"],
      avatarUnlockedBody: ["images/UI_avatar/avatar_blank.png","images/UI_avatar/avatar_body1.png", "images/UI_avatar/avatar_body2.png"],
      avatarUnlockedAcc: ["images/UI_avatar/avatar_blank.png", "images/UI_avatar/avatar_accessory1.png", "images/UI_avatar/avatar_accessory2.png"],

      // map objects
      test_map: "", // map used in Map View -- container id "map"
      quest_map: "", // map used in Quest Details -- container id "questMap"
      curr_quest_marker: "", // individual quest markers used in the map for quest detail view

      //quest object
      questList: [
              {completed: false,
               restarted: false,
               started: false,
               read: false,
               favorited: false,
               index: 0,
               name: "Bob and Betty Beyster Building Bake Off (BBBBB)",
               information: "Head to the Bob and Betty Beyster Building on North Campus and find room 1670! Draw something funny on the board.",
               long: -83.71626555919647,
               lat: 42.29294516616928
             },
              {completed: false,
               started: false,
               restarted: false,
               read: false,
               favorited: false,
               index: 1,
               name: "Thanks U(I) for the Memories",
               information: "Head to the Bob and Betty Beyster Building and go to room 1670. Find an EECS493 IA and high-five them!",
               long: -83.71626555919647,
               lat: 42.29294516616928
            },
              {completed: false,
               started: false,
               restarted: false,
               read: false,
               favorited: false,
               index: 2,
               name: "Art at the UMMA",
               information: "Head to the UMMA (University of Michigan Museum of Art). Go inside and find the famous photoshoot heart installation. Take a photo of yourself in front of it!",
               long: -83.73983681201935,
               lat: 42.27559012188965
            },
              {completed: false,
               started: false,
               restarted: false,
               read: false,
               favorited: false,
               index: 3,
               name: "Diag Dinner",
               information: "Head to the Diag! Locate and catch 3 campus squirrels while avoiding stepping on the M!",
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
    };

    //let Quest = {completed: false, started: false, read: false, favorited: false},
    //TODO: quest object should also include map information (quest location and quest distance from user)
  },

  // preloads all the mapbox stuff
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    this.get_loc() // takes approx. 5 seconds to geolocate -- use loading screen to offset this wait time pls
  }, // mounted

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

    toggleCustom: function() {
      if (this.avatarScreen == true) {
        this.avatarScreen = false;
        return;
      }
      this.avatarScreen = true;

    },

    toggleHead: function(index) {
      console.log("switching hair");
      this.headIndex = index;
    },

    toggleBody: function(index) {
      this.bodyIndex = index;
    },

    toggleAcc: function(index) {
      this.accIndex = index;
    },

    unlockRewards: function(index) {
      console.log("this unlocks a reward")
      if (this.questList[index].restarted) {
        return;
      }

      if (index == 0) {
        this.avatarUnlockedHeads.push("images/UI_avatar/avatar_top4.png");
        return;
      }
      if (index == 1) {
        this.avatarUnlockedBody.push("images/UI_avatar/avatar_body3.png");
        return;
      }
      if (index == 2) {
        this.avatarUnlockedBody.push("images/UI_avatar/avatar_body4.png");
        this.avatarUnlockedHeads.push("images/UI_avatar/avatar_top5.png");
        return;
      }
      if (index == 3) {
        this.avatarUnlockedAcc.push("images/UI_avatar/avatar_accessory3.png");
        this.avatarUnlockedAcc.push("images/UI_avatar/avatar_accessory4.png");
        return;
      }

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
    questRestarted: function(idx) {
      if (this.questList[idx].restarted == true) {
        return true;
      }
      else {
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
      Swal.fire({title: "You've started this quest! Follow the quest instructions and mark completed when you're done!",});
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
      if (this.questList[idx].restarted == true){
        Swal.fire({title: "Congrats, you finished a quest!",});
        return;
      }

      Swal.fire({title: "Congrats, you finished a quest! You've earned 100 EXP Points and a new item for your Avatar!",});
    },

    setRestarted: function(idx) {
      this.questList[idx].read = true;
      this.questList[idx].started = true;
      this.questList[idx].completed = false;
      this.questList[idx].restarted = true;
      // if (this.questList[idx].completed == true){
      //   this.questList[idx].restarted = true;
      // }
    },

    toggleFavorited: function(idx) {
      this.questList[idx].favorited = !this.questList[idx].favorited;
    },

    toggleEmote: function() {
      this.emote = !this.emote;
    },

    // MAPBOX
    get_loc: function() {
      navigator.geolocation.getCurrentPosition((position) => {
        // get initial coords
        this.test_start_lat = position.coords.latitude;
        this.test_start_long = position.coords.longitude;
        console.log(this.test_start_long, this.test_start_lat); //test api with a console log

        // create local copy of map used in Map View
        const test_map = new mapboxgl.Map({
          container: "map",
          style: 'mapbox://styles/team-guzzie/ckviauzayahyg14pcmcsenbvt/draft',
          center: [this.test_start_long, this.test_start_lat],
          zoom: 13,
        });

//         test_map.on('load', function() {
//           test_map.resize()
// }       );

        // add in markers based on info from questList
        for (i = 0; i < this.questList.length; ++i) {
          new mapboxgl.Marker()
            .setLngLat([this.questList[i].long, this.questList[i].lat])
            .setPopup(new mapboxgl.Popup().setHTML("<span>" + this.questList[i].name + "</span>"))
            .addTo(test_map)

        }

        // add geolocation control (not automatic, user must click geolocate button)
        test_map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
          })
        );


        // assign vue object to local copy
        this.test_map = test_map

        // create local copy of map used in Quest Details View
        const quest_map = new mapboxgl.Map({
          container: "questMap",
          style: 'mapbox://styles/team-guzzie/ckviauzayahyg14pcmcsenbvt/draft',
          center: [this.test_start_long, this.test_start_lat],
          zoom: 13,
        })

//         quest_map.on('load', function() {
//           quest_map.resize()
// }       );

        // create a geolocate control that triggers automatically so users don't have to click on the button
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
        })
        quest_map.addControl(geolocate);
        // quest_map.on('load', () => {
        //   geolocate.trigger();
        // });

        // assign vue object to local copy
        this.quest_map = quest_map
      }) // navigator.geolocation API end
    }, // get_loc()

    // helper function to add markers
    add_marker: function(long, lat, sentence) {
      this.curr_quest_marker = ""
      const local_map = this.quest_map

      const local_marker = new mapboxgl.Marker({ closeOnClick: false })
        .setLngLat([long, lat])
        .setPopup(new mapboxgl.Popup().setHTML("<span>" + sentence + "</span>"))
        .addTo(local_map);

      local_map.setCenter([long, lat])
      this.curr_quest_marker = local_marker
      this.quest_map = local_map
    }, // add_marker()

    // add individual marker to map in quest details page
    quest_details_map: function(idx) {
      this.add_marker(this.questList[idx].long, this.questList[idx].lat, this.questList[idx].name);
    }, // quest_details_map()

    openMaps: function (questIndex) {
      // get current location
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        // open in google maps and show a route from current location to destination
        window.open("https://www.google.com/maps/dir/?api=1&origin=" + lat + "%2C" + long +
        "&destination=" + this.questList[questIndex].lat + "%2C" + this.questList[questIndex].long, "_blank");
      })

    }, // openMaps()

    adjust_main_map: function() {
      setTimeout(() => this.test_map.resize(), 10)
    },

    adjust_quest_map: function() {
      setTimeout(() => this.quest_map.resize(), 10)
    },
  } // methods
})

// THIS IS ALL DEPRECATED SHIT
// import mapboxgl from "mapbox-gl";

// export default {
//   name: "BaseMap",
//   data() {
//     return {
//       accessToken:'pk.eyJ1IjoidGVhbS1ndXp6aWUiLCJhIjoiY2t2aWFyaXhhY2kyMDJ3bnpvZzJuZTZ5aCJ9.JTDWinEddb4DDs-Rka2G6A',
//       test_start_long: 0,
//       test_start_lat: 0,
//     };
//   },
//   mounted() {
//     // this.$nextTick( function() {
//     //
//     // })
//     mapboxgl.accessToken = this.accessToken;
//     this.get_loc();
//     new mapboxgl.Map({
//       container: "mapContainer",
//       style: 'mapbox://styles/team-guzzie/ckviauzayahyg14pcmcsenbvt/draft',
//       center: [this.test_start_long, this.test_start_lat],
//       zoom: 13,
//       // maxBounds: [
//       //   [103.6, 1.1704753],
//       //   [104.1, 1.4754753],
//       // ],
//     });
//   },
//
//   methods: {
//     get_loc: function() {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.test_start_lat = position.coords.latitude;
//         this.test_start_long = position.coords.longitude;
//         console.log(start_long, start_lat); //test api with a console log
//       })
//     }
//   }
// };

// // mapbox
// mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbS1ndXp6aWUiLCJhIjoiY2t2aWFyaXhhY2kyMDJ3bnpvZzJuZTZ5aCJ9.JTDWinEddb4DDs-Rka2G6A';
// $(document).ready(function() {
//     console.log( "ready!" );
//     navigator.geolocation.getCurrentPosition((position) => {
//       var start_lat = position.coords.latitude;
//       var start_long = position.coords.longitude;
//       console.log(start_long, start_lat); //test api with a console log
//
//       const map = new mapboxgl.Map({
//         container: 'map', // container ID
//         style: 'mapbox://styles/team-guzzie/ckviauzayahyg14pcmcsenbvt/draft', // style URL
//         center: [start_long, start_lat], // starting position [lng, lat]
//         zoom: 13 // starting zoom
//       });
//
//       const marker = new mapboxgl.Marker({
//         color: "#868BFE"
//       })
//         .setLngLat([start_long, start_lat])
//         .setPopup(new mapboxgl.Popup().setHTML("<span>Current Location!</span>"))
//         .addTo(map);
//
//       const marker_bbb = new mapboxgl.Marker()
//         .setLngLat([-83.71726555919647, 42.29294516616900])
//         .setPopup(new mapboxgl.Popup().setHTML("<span>Bob and Betty Beyster Building Bake Off (BBBBB)</span>"))
//         .addTo(map);
//
//       const marker_bbb2 = new mapboxgl.Marker()
//         .setLngLat([-83.71626555919647, 42.29294516616928])
//         .setPopup(new mapboxgl.Popup().setHTML("<span>Thanks U(I) for the Memories</span>"))
//         .addTo(map);
//
//       const marker_umma = new mapboxgl.Marker()
//         .setLngLat([-83.73983681201935, 42.27559012188965])
//         .setPopup(new mapboxgl.Popup().setHTML("<span>Art at the UMMA!</span>"))
//         .addTo(map);
//
//       const marker_diag = new mapboxgl.Marker()
//         .setLngLat([-83.73821139335631, 42.276892015270626])
//         .setPopup(new mapboxgl.Popup().setHTML("<span>Diag Dinner</span>"))
//         .addTo(map);
//     })
// })
