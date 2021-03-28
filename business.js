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

const guid = localStorage.getItem('guid');
let bizID = 0
let last = 0
let bName, cat, pNum, addy, pCode, MONtime, TUEtime, WEDtime, THUtime, FRItime, SATtime, SUNtime, wSite, tOut, pUp, lat, long, descrip;

firebase.database().ref('user/'+guid).on('value', function(snapshot){
    bizID = snapshot.val().bID;
})
firebase.database().ref('bId').on('value', function(snapshot){
    last = snapshot.val().lastBID;
});

function pullCurr(){
    document.getElementById('bizID').innerHTML = bizID
        firebase.database().ref('business/'+bizID).on('value', function(snapshot){
            document.getElementById('bName').innerHTML = snapshot.val().bName
            document.getElementById('cat').value = snapshot.val().cat
            document.getElementById('pNum').value = snapshot.val().pNum
            document.getElementById('addy').innerHTML = snapshot.val().addy
            document.getElementById('pCode').innerHTML = snapshot.val().pCode
            document.getElementById('MONtime').innerHTML = snapshot.val().MONtime
            document.getElementById('TUEtime').innerHTML = snapshot.val().TUEtime
            document.getElementById('WEDtime').innerHTML = snapshot.val().WEDtime
            document.getElementById('THUtime').innerHTML = snapshot.val().THUtime
            document.getElementById('FRItime').innerHTML = snapshot.val().FRItime
            document.getElementById('SATtime').innerHTML = snapshot.val().SATtime
            document.getElementById('SUNtime').innerHTML = snapshot.val().SUNtime
            document.getElementById('wSite').innerHTML = snapshot.val().wSite
            document.getElementById('lat').innerHTML = snapshot.val().lat
            document.getElementById('long').innerHTML = snapshot.val().long
            document.getElementById('descrip').innerHTML = snapshot.val().descrip
            document.getElementById('tOut').checked = snapshot.val().tOut
            document.getElementById('pUp').checked = snapshot.val().pUp
        })
}

function push(){
    bName = document.getElementById("bName").innerHTML;
    cat = document.getElementById("cat").value;
    pNum = document.getElementById("pNum").value;
    addy = document.getElementById("addy").innerHTML;
    pCode = document.getElementById("pCode").innerHTML;
    MONtime = document.getElementById("MONtime").innerHTML;
    TUEtime = document.getElementById("TUEtime").innerHTML;
    WEDtime = document.getElementById("WEDtime").innerHTML;
    THUtime = document.getElementById("THUtime").innerHTML;
    FRItime = document.getElementById("FRItime").innerHTML;
    SATtime = document.getElementById("SATtime").innerHTML;
    SUNtime = document.getElementById("SUNtime").innerHTML;
    wSite = document.getElementById("wSite").innerHTML;
    tOut = document.getElementById("tOut").checked;
    pUp = document.getElementById("pUp").checked;
    lat = document.getElementById("lat").innerHTML;
    long = document.getElementById("long").innerHTML;
    descrip = document.getElementById("descrip").innerHTML;
    firebase.database().ref('business/'+bizID).set({
        bID: bizID,
		bName: bName,
		cat: cat,
		pNum: pNum,
		addy: addy,
		pCode: pCode,
		MONtime: MONtime,
		TUEtime: TUEtime,
		WEDtime: WEDtime,
		THUtime: THUtime,
		FRItime: FRItime,
		SATtime: SATtime,
		SUNtime: SUNtime,
		wSite: wSite,
		tOut: tOut,
		pUp: pUp,
		lat: lat,
		long: long,
		descrip: descrip
    });
    window.alert("Successfully updated information.")
}

setTimeout(function(){
    if (bizID <= last){
        pullCurr()
    }
},1250);

function logout(){
    firebase.auth().signOut()
    window.location.replace("./map.html")
}