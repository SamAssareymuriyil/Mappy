mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtYWJyYWhhbSIsImEiOiJja21qdXhyZ20wdjM1Mm9zN2ZoMndncGExIn0.9Q_7Z9ModTw0kgHBUxg08Q';

const firebaseConfig = {
	apiKey: "AIzaSyDB3eWUfNaMDZyp7Sx3_mcg9VYswBVPgns",
	authDomain: "mappy-7fdbf.firebaseapp.com",
	databaseURL: "https://mappy-7fdbf-default-rtdb.firebaseio.com",
	projectId: "mappy-7fdbf",
	storageBucket: "mappy-7fdbf.appspot.com",
	messagingSenderId: "844352059623",
	appId: "1:844352059623:web:b595b27c89bee10d3f4a42"
};
firebase.initializeApp(firebaseConfig);

let b = 100001
let feat = []
let geojson ={
	type: 'FeatureCollection',
	features: feat
}

let mappy;
function mapInfo(){
	firebase.database().ref('bId').on('value', function(snapshot){
		b = snapshot.val().lastBID;
	});
	setTimeout(function() {
		firebase.database().ref('bId').on('value', function(snapshot){
			b = snapshot.val().lastBID;
		});

		for (i = 100001; i < b+1; i++) {
			firebase.database().ref('business/'+i).on('value', function(snapshot){
				b = snapshot.val().lastBID;
				feat.push({
					type: 'Feature',
					geometry:{
						type: 'Point',
						coordinates: [snapshot.val().long, snapshot.val().lat]
					},
					properties:{
						title: snapshot.val().bName,
						category: snapshot.val().cat,
						description: snapshot.val().descrip,
						address: snapshot.val().addy + ", " + snapshot.val().pCode,
						phone: snapshot.val().pNum,
						monTime: snapshot.val().MONtime,
						tueTime: snapshot.val().TUEtime,
						wedTime: snapshot.val().WEDtime,
						thuTime: snapshot.val().THUtime,
						friTime: snapshot.val().FRItime,
						satTime: snapshot.val().SATtime,
						sunTime: snapshot.val().SUNtime,
						takeout: snapshot.val().tOut,
						pickup: snapshot.val().pUp,
						website: snapshot.val().wSite
					}
				})
			});
		}

		geojson = {
			type: 'FeatureCollection',
			features: feat
		}
		console.log(geojson)

		map()
	}, 1200);
}

function map(){

	navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
		enableHighAccuracy: true
	})

	function setupMap(center){
		mappy = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			attributionControl: false,
			center: center,
			zoom: 15
		});

		const nav = new mapboxgl.NavigationControl();
		mappy.addControl(nav, 'bottom-right');

		mappy.addControl(
			new mapboxgl.GeolocateControl({
			positionOptions: {
			enableHighAccuracy: true
			},
			trackUserLocation: true
			})
		);

		let directions = new MapboxDirections({
			accessToken: 'pk.eyJ1Ijoic2FtYWJyYWhhbSIsImEiOiJja21qdXhyZ20wdjM1Mm9zN2ZoMndncGExIn0.9Q_7Z9ModTw0kgHBUxg08Q'
		})
		mappy.addControl(directions, 'top-left');

		geojson.features.forEach(function(marker) {
			let el = document.createElement('div');
			el.className = 'marker';
			new mapboxgl.Marker(el)
				.setLngLat(marker.geometry.coordinates)
				.setPopup(new mapboxgl.Popup({ offset: 25})
				.on('open', function(e) {
					openNav(marker.properties);
				})
				.setHTML())
				.addTo(mappy);
		});
	}

		function successLocation(position){
			setupMap([position.coords.longitude, position.coords.latitude])
		}

		function errorLocation(){
			setupMap([-83.04832860675164, 42.31746449070871])
		}
	}

mapInfo()

function openNav(properties) {
	document.getElementById("sidebar").style.width = "25%";
	document.getElementById("sidebar").style.minWidth = "300px";
	document.getElementById("title").innerHTML = properties.title;
	document.getElementById("category").innerHTML = properties.category;
	document.getElementById("description").innerHTML = properties.description;

	if (properties.takeout) {
		document.getElementById("takeout").innerHTML = '<i class="fas fa-check"></i>' + " Takeout";
	}
	else {
		document.getElementById("takeout").innerHTML = '<i class="fas fa-times"></i>' + " Takeout";
	}

	if (properties.pickup) {
		document.getElementById("pickup").innerHTML = '<i class="fas fa-check"></i>' + " Pickup";
	}
	else {
		document.getElementById("pickup").innerHTML = '<i class="fas fa-times"></i>' + " Pickup";
	}

	if (properties.address) {
		document.getElementById("address").innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + properties.address;
	}

	if (properties.website) {
		document.getElementById("website").innerHTML = '<i class="fas fa-globe-americas"></i> ' + properties.website;
		document.getElementById("website").href = properties.website;
	}

	if (properties.phone) {
		document.getElementById("phone").innerHTML = '<i class="fas fa-phone-alt"></i> ' + properties.phone;
		document.getElementById("phone").href = "tel:" + properties.phone;
	}

	document.getElementById("suntime").innerHTML = properties.sunTime;
	document.getElementById("montime").innerHTML = properties.monTime;
	document.getElementById("tuetime").innerHTML = properties.tueTime;
	document.getElementById("wedtime").innerHTML = properties.wedTime;
	document.getElementById("thutime").innerHTML = properties.thuTime;
	document.getElementById("fritime").innerHTML = properties.friTime;
	document.getElementById("sattime").innerHTML = properties.satTime;
}

function closeNav() {
	document.getElementById("sidebar").style.width = "0";
	document.getElementById("sidebar").style.minWidth = "0";
}

let jsoNew = {};
let map2;
function filter() {
    closeNav();
    if (document.getElementById("filter").value != "All"){
        let args = [];
        for (i = 0; i < geojson.features.length; i++) {
            if (geojson.features[i].properties.category === document.getElementById("filter").value) {
                args.push(feat[i]);
            }
        }
        jsoNew = {
            type: 'FeatureCollection',
            features: args
        }
        console.log(jsoNew);
        setTimeout(function(){
            if (mappy){
                mappy.remove();
                mappy = null;
            }
            if (map2){
                map2.remove();
                map2 = null;
            }
            specMap();
        },500);
    }
    else{
        setTimeout(function(){
            if (mappy){
                mappy.remove();
                mappy = null;
            }
            if (map2){
                map2.remove();
                map2 = null;
            }
            mapInfo();
        },500);
    }
}

function specMap(){

	navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
		enableHighAccuracy: true
	})

	function setMap(center){
		map2 = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			attributionControl: false,
			center: center,
			zoom: 15
		});

		const nav = new mapboxgl.NavigationControl();
		map2.addControl(nav, 'bottom-right');

		map2.addControl(
			new mapboxgl.GeolocateControl({
			positionOptions: {
			enableHighAccuracy: true
			},
			trackUserLocation: true
			})
		);

		let directions = new MapboxDirections({
			accessToken: 'pk.eyJ1Ijoic2FtYWJyYWhhbSIsImEiOiJja21qdXhyZ20wdjM1Mm9zN2ZoMndncGExIn0.9Q_7Z9ModTw0kgHBUxg08Q'
		})
		map2.addControl(directions, 'top-left');

		jsoNew.features.forEach(function(marker) {
			let el = document.createElement('div');
			el.className = 'marker';
			new mapboxgl.Marker(el)
				.setLngLat(marker.geometry.coordinates)
				.setPopup(new mapboxgl.Popup({ offset: 25})
				.on('open', function(e) {
					openNav(marker.properties);
				})
				.setHTML())
				.addTo(map2);
		});
	}

		function successLocation(position){
			setMap([position.coords.longitude, position.coords.latitude])
		}

		function errorLocation(){
			setMap([-83.04832860675164, 42.31746449070871])
		}
	}