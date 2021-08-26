let AccountSignup=(event)=>{
    console.log(event)
    event.preventDefault();
    var restaurantname=document.getElementById("restaurantname").value
    var email=document.getElementById("email").value
    var country=document.getElementById("country").value
    var city=document.getElementById("city").value
    var password=document.getElementById("password").value 

    
    let userinfo={
       restaurantname:restaurantname,
       email:email,
       country:country,
       city:city,
       password:password,
    }
    console.log(userinfo)

    let from=document.getElementById("submitForm")
    from.classList.add("was-validated")
    if(!from){
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user.uid;
            console.log('user :', user)
            // Add a new document with a generated id.
            return  db.collection("restaurant").doc(userCredential.user.uid).set({
                restaurantname:restaurantname,
                email:email,
                country:country,
                city:city,
                password:password,
                state:"restaurant",
                restaurantid:userCredential.user.uid

              })
              .then((docRef) => {
                console.log("User successfully add")
                swal({
                          title: "SignUp Succescessfully",
                          text: "Contragulation!",
                          icon: "success",
                }).then((value)=>{
                            window.location.href="../RestaurantLogin/RestaurantLogin.html"
                        })
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });     
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error => ",errorMessage)
            
        })


}