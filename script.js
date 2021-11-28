var test = new Vue({
  el: '#app',
  data: {
    profilePage: true,
    questListPage: false,
    mapPage: false,
  },
  methods: {

    SwitchProfile: function () {
      console.log("this changes the page to profile page")
      this.profilePage = true;
      this.questListPage = false;
      this.mapPage = false;
    },

    SwitchQuests: function() {
      console.log("this changes the page to Quest List page")
      this.questListPage = true;
      this.profilePage = false;
      this.mapPage = false;
    },

    SwitchMap: function() {
      console.log("this changes the page to Map View page")
      this.mapPage = true;
      this.questListPage = false;
      this.profilePage = false;
    }
    

  }
})

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
  
  