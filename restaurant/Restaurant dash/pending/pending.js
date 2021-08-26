  var uid;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
         start(user)
    console.log("user id pending => ",uid)
    } 
    else {
        // location.href = "../../index.html"
        console.log("something issue")
        
    }



})

function start(user){
    var docRef = firebase.firestore().collection("pending").where("id", "==", user.uid).where("status", "==", "pending")
    docRef.get()
    .then(function(snapshot){
        snapshot.forEach(function(data, index){
            var obj = data.data()
                console.log(obj)              
                document.getElementById("div").innerHTML += `
                <div class="col col py-3 px-lg-5" style="border: solid 1px black; border-radius: 10px;" >
                <span class="titel title" style="display: block; font-weight: bolder;">Title :${obj.titel}</span>
                <span class="titel" style="display: block; ">Category : ${obj.cetegory}</span>
                <span class="titel" style="display: block; font-weight: bolder;">Price : ${obj.price}</span>
                <span class="titel" style="display: block; font-weight: bolder;">user id : ${obj.id}</span>
                <button class="btn btn-sm btn-warning "  id="${data.id}" onclick="accept(this)"> Accept</button>
            </div>
           `
            })
    })
}

function accept (i){
    var db = firebase.firestore();
    db.collection("pending").doc(i.id).update({status: "accepted"});
    swal({
        titel: "Congratulation",
        text: "SuccessFully Accepted",
        icon: "success",
        button: "next",
    })   
    .then((res)=>{
        window.location="./pending.html"
    })
    
}


function lagout(){
    console.log("working")
    firebase.auth().signOut()
    .then(() => {
        console.log("successFully Signout")
        swal({
            title: "Signout",
            text: "SuccessFully Done ! ",
            icon: "success",
          })
      })
      .then((res)=>{
        window.location="../../../restaurant/RestaurantLogin/RestaurantLogin.html"
      })
      .catch((error) => {
        // An error happened.
        console.log("There's Some problem to Signout")
      });
}


