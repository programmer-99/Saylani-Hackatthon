  var uid;
  function show(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection("user").doc(user.uid).get()
            .then((doc)=>{
                var currentuser=doc.data()
                 uid = user.uid;
          
                console.log("uid is",uid)
                document.getElementById("username").innerHTML=" Welcome "+currentuser.username
                render(uid)

            })
        
          // ...
        }
         else {
          // User is signed out
          // ...
        }

    })
}

 function render(uid){
    firebase.firestore().collection("Resdata").get()
        .then(function(snapshot){
            snapshot.forEach(function(data){
                var obj = data.data()
                var src = obj.imageUrl;
                console.log(obj)
                
                    console.log("user data ki id",data.id)
                    console.log("chal raha hai ")
                    document.getElementById("disPlayCard").innerHTML += `
             

                    <div class="col-sm-12 col-md-3 style="width: 18rem;">
                    <div class="card">
                        <img src="${src}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${obj.productname}</h5>
                            <p class="card-text">${obj.productdescription}</p>
                            <p class="card-text">${obj.productprize}</p>
                            <a href="#" class="btn btn-primary btn1"  id="${data.id}" onclick="order(this)" >Order</a>
                        </div>
                    </div>
                    </div>
                    
               `
                })
        })
 }


 var newobj;
 function order(t){
     console.log("tid is => ",t.id)
     var t=t.id
    var docRef = firebase.firestore().collection("Resdata").doc(t);
    docRef.get().then((doc) => {
        if (doc.exists) {
            var data = doc.data()
            newobj = {
                status: "pending",
                titel: data.productname,
                price: data.productprize,
                cetegory: data.productdescription,
                // delivery: data.delivery,
                id:uid,
                userUid: t,
                resUid: data.userid,
                            // (userid restaurant ki id hai )
            }
            console.log(newobj)
            var db = firebase.firestore().collection("pending");
            db.add(newobj)
            .then(
                () =>{
                    swal({
                        titel: "You ordered has been Submitted",
                        icon: "success",
                        button: "next",
                    })
                }
            )
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
                
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
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
