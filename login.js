const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: ""
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