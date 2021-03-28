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

let b, res

function login(){
    base_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(base_provider).then(function(result){
        res = result
        console.log("Success Google Account Linked")
    }).then(function(){
        biz();
    })
    .catch(function(err){
        console.log(err)
        window.alert("Login Failed, please try again.")
    })
}

function biz(){
    console.log(res)
    if (res.additionalUserInfo.isNewUser == true){
        setTimeout(function(){
        firebase.database().ref('bId').on('value', function(snapshot){
            console.log(snapshot)
            b = snapshot.val().lastBID;
        })
        }, 1250)
        setTimeout(function(){
            b++
            firebase.database().ref('user/'+res.additionalUserInfo.profile.id).set({
                bID: b
            });
            firebase.database().ref('bId').set({
                lastBID: b
            });
            localStorage.setItem('guid', res.additionalUserInfo.profile.id);
            window.location.replace("./business.html")
        }, 2000)
    }
    if (res.additionalUserInfo.isNewUser == false){
        setTimeout(function(){
            localStorage.setItem('guid', res.additionalUserInfo.profile.id);
        }, 1250)
        window.location.replace("./business.html")
    }
}

function logout(){
    firebase.auth().signOut()
    window.location.replace("./map.html")
}