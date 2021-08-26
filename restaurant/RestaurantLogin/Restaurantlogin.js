let loginAccount=(event)=>{
    event.preventDefault();
    var username=document.getElementById("username").value
    var password=document.getElementById("password").value

   

    let login=document.getElementById("loginForm")
    login.classList.add("was-validated")
    if(!login){
      return
    }

    firebase.auth().signInWithEmailAndPassword(username, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(uid)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    // ...
    swal({
      title: "Login SuccessFull",
      text: "Congratulation!",
      icon: "success",
    }).then((value)=>{
        window.location.href="../Restaurant dash/restaurantdash.html"
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if(!username || !password){
      swal({
        title: "Field Empty",
        text: "Fill the input field",
        icon: "warning",
      })
    }
    else{
      swal({
        title: "Incorrect information",
        text: "Went Something wrong",
        icon: "error",
        button: "Again",
      });
    }
  });

}