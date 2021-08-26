let AccountSignup=(event)=>{
    console.log(event)
    event.preventDefault();
    let username=document.getElementById("Username").value
    let email=document.getElementById("email").value
    let phone=document.getElementById("phone").value
    let country=document.getElementById("country").value
    let city=document.getElementById("city").value
    var password=document.getElementById("password").value

    
    let userinfo={
       username,
       email,
       phone,
       country,
       city,
       password,
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
            return  db.collection("user").doc(userCredential.user.uid).set({
                username:username,
                email:email,
                phone:phone,
                country:country,
                city:city,
                password:password,
                state:"user",
                userid:userCredential.user.uid                     
              })
              .then((docRef) => {
                console.log("User successfully add")
                swal({
                          title: "SignUp Succescessfully",
                          text: "Contragulation!",
                          icon: "success",
                }).then((value)=>{
                            window.location.href="../userlogin/userLogin.html"
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