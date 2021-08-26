let arrayObj=[]
let arr_index=[]
var userid;
var cardArray=[]

let show=()=>{
    var currentuser;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //   console.log("user",user)
            db.collection("restaurant").doc(user.uid).get()
            .then((doc)=>{
                    
                      currentuser=doc.data();
                      console.log("Current user is ===>> ",currentuser)
                      document.getElementById("currentusername").innerHTML="Welcome: "+ currentuser.restaurantname
                      userid=currentuser.restaurantid
                      getcard()
                      cardArray.length=0


                      firebase.firestore().collection("restaurant").where("uid", "==", user.uid).get()
                      .then((quary) => {
                        arrayObj.length=0
                        arr_index.length=0
                        quary.forEach((doc) => {
                            arrayObj.push(doc.data())
                            
                        })
                        console.log("ARRAy length ",arrayObj.length)
                    })
                    .catch(er => {
                        console.error("Erorr", er)
                    })
                  })
            .catch((error)=>{
                console.log("error",error)
            })
          }     
      else {
          console.log("no user logged in ")
      }
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
        window.location="../RestaurantLogin/RestaurantLogin.html"
      })
      .catch((error) => {
        // An error happened.
        console.log("There's Some problem to Signout")
      });
}













let getdetail=()=>{

    var image=document.getElementById("image").files[0]
    var productname=document.getElementById("productname").value
    var productdescription=document.getElementById("productdescription").value
    var productprize=document.getElementById("productprize").value
    console.log(image)
    console.log(productname)
    console.log(productdescription)
    console.log(productprize)


    var imageRef=storage.ref().child('images/'+image.name)
    var uploadTask=imageRef.put(image)
    uploadTask.snapshot.ref.getDownloadURL()
        .then(function(url){
            console.log("URL =>",url)

       
            db.collection("Resdata").add({ 
                productname:productname,
                productdescription:productdescription,
                productprize:productprize,
                imageUrl:url,
                userid:userid,                     
              })
              .then((docRef) => {
                console.log("User successfully add")

                swal({
                          title: "Item SuccessFully Added",
                          text: "Contragulation!",
                          icon: "success",
                })

                show()
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });     

            
            })
        }






let getcard=()=>{
    db.collection("Resdata")
    .get()
    .then((querysnapshot)=>{
        querysnapshot.forEach(doc=>{
            cardArray.push(doc.data())
            document.getElementById("disPlayCard").innerHTML=""
        })

        console.log(cardArray)
        cardArray.forEach(function(element,index){
            document.getElementById("disPlayCard").innerHTML+=`
            <div class="col col-sm-12 col-md-3">
            <div class="card">
                <img src="${element.imageUrl}" class="card-img-top img1" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.productname}</h5>
                    <p class="card-text">${element.productdescription}</p>
                    <p class="card-text">${element.productprize}</p>
                    <a href="#" class="btn btn-primary btn1">ADD </a>
                </div>
            </div>
            </div>
            `

        })



    })

}