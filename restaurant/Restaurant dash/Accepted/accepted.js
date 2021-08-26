  var uid;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
      console.log("Working")
      start(user)
    } 
    else {
      console.log("someething issue")
    }
  })

function start(user){
    console.log(user.uid)
    var docRef = firebase.firestore().collection("pending").where("id", "==", user.uid).where("status", "==", "accepted")
    docRef.get()
    .then(function(snapshot){
        snapshot.forEach(function(data, index){
            var obj = data.data()
                console.log(obj)
                document.getElementById("div").innerHTML += `
                <div class="col col py-3 px-lg-5" style="border: solid 1px black; border-radius: 10px;" >
                <span class="titel" style="display: block; font-weight: bolder;">${obj.titel}</span>
                <span class="titel" style="display: block; ">Cetegery : ${obj.cetegory}</span>
                <span class="titel" style="display: block; font-weight: bolder;">price : ${obj.price}</span>
                <span class="titel" style="display: block; font-weight: bolder;">User id : ${obj.id}</span>
                <button class="btn btn-sm btn-success " style="float: right;" id="${data.id}" onclick="del(this)"> Delivered</button>
            </div>
           `
            })
    })    
}

function del (i){
    // var db = firebase.firestore();
    db.collection("pending").doc(i.id).update({status: "delivered"});
    swal({
      titel: "Congratulation",
      text: "SuccessFully Delivered",
      icon: "success",
      button: "next",
  })   
  .then((res)=>{
      window.location="./accepted.html"
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


