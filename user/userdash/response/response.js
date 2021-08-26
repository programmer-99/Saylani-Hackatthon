//   var uid;
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       uid = user.uid;
//     // start(uid)
//     console.log("1")
//     } 
//     else {
//         // location.href = "../../index.html"
        
//     }
// })
var uid;
function start(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
      // start(uid)
      console.log("user=>",uid)
      var docRef = firebase.firestore().collection("pending").where("id", "==", uid)
    docRef.get()
    .then(function(snapshot){
        snapshot.forEach(function(data, index){
            var obj = data.data()
                console.log(obj)
                document.getElementById("div").innerHTML += `
                <div class="col col py-3 px-lg-5" style="border: solid 1px black; border-radius: 10px;" >

                <span class="titel" style="display: block; font-weight: bolder;">${obj.titel}</span>
                <span class="titel" style="display: block; ">Cetegery : ${obj.cetegory}</span>
                <span class="titel" style="display: block; ">Deleviery : ${obj.delivery}</span>
                <span class="titel" style="display: block; font-weight: bolder;">price : ${obj.price}</span>
                <span class="titel" style="display: block; font-weight: bolder;">status : ${obj.status}</span>
                <button class="btn btn-sm btn-danger " style="float: right;" id="${data.id}" onclick="del(this)"> DELETE</button>
            </div>
           `
            })
        })
      } 
      else {
          // location.href = "../../index.html"
          }
    })
}

function del (i){
    var db = firebase.firestore();

db.collection("pending").doc(i.id).update({userUid: "delete",status:"delete"});
swal({
    titel: "Congratulation",
    text: "SuccessFully deleted",
    icon: "success",
    button: "next",
})   
.then((res)=>{
    window.location="./response.html"
})

    
    
}















function logout(){
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
        window.location="../userlogin/userLogin.html"
      })
      .catch((error) => {
        // An error happened.
        console.log("There's Some problem to Signout")
      });
}
