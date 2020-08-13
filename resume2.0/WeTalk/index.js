let currentTalkToUID = "";
let currentTalkToEmail = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(displayName)
    console.log(email)
    $('#loginModal').modal('hide')
    $('#signInModal').modal('hide')
    localStorage.setItem('user', JSON.stringify(user));
    friend_list_listener(user)
    friend_request_listener(user)
    message_listener(uid)
    // ...
  } else {
    console.log("Did not login")
    // User is signed out.
    // ...
  }
});

function friend_list_listener(user){
  // console.log(user.uid);
  let friend_list = document.getElementById("friend_list")
  db.collection("friendship/"+user.uid+"/friend")
    .onSnapshot(function(querySnapshot) {
      //console.log(querySnapshot.docChanges())
        querySnapshot.docChanges().forEach(function(change) {
          //console.log(change.doc.data())
          if (change.type === "added") {
              localStorage.setItem(change.doc.data().uid, change.doc.data().email)
              var li = document.createElement("li")
              li.setAttribute("class", "list-group-item p-0")
              var div = document.createElement("div")
              div.setAttribute("class", "p-2")
              div.innerHTML = change.doc.data().email
              div.setAttribute("id", change.doc.data().uid)
              li.addEventListener("click", function(e){
                let id = e.target.id
                console.log(id)
                currentTalkToUID = id
                currentTalkToEmail = localStorage.getItem(id)
                $("#message_box").show()

                document.getElementById("message_name").innerHTML = currentTalkToEmail
                updateMessageBox()
              })
              li.appendChild(div)
              friend_list.appendChild(li)
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });
}


function friend_request_listener(user){
  // console.log(user.uid);
  let friend_list = document.getElementById("friend_list")
  //监听自己的那个组
  db.collection("friendship_pending/"+user.uid+"/send_from")
    .onSnapshot(function(querySnapshot) {
      //console.log(querySnapshot.docChanges())
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              var li = document.createElement("li")
              li.setAttribute("class", "list-group-item")
              var div = document.createElement("div")
              var span = document.createElement("span")
              span.innerHTML = change.doc.data().email+"想加你为好友"
              div.setAttribute("id", change.doc.data().uid)
              li.addEventListener("click", function(e){
                $("#friendRequestModal").modal()
                document.getElementById("friend_request_name").innerHTML = change.doc.data().email;
                document.getElementById("request_uid").value = change.doc.data().uid
                document.getElementById("request_email").value = change.doc.data().email
              })
              li.appendChild(div)
              div.appendChild(span)
              friend_list.appendChild(li)
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("一个好友的申请处理了: ", change.doc.data());
                let uid = change.doc.data().uid
                let child = document.getElementById(uid)
                child.parentNode.parentNode.removeChild(child.parentNode);
            }
        });
    });
}


function message_listener(uid){
  console.log(uid);
  let currentUser = JSON.parse(user)
  let messageBox = document.getElementById("message");
  // console.log(friend_uid)
  db.collection("users/"+uid+"/chat/")
    .onSnapshot(function(querySnapshot) {
      //console.log(querySnapshot.docChanges())
        querySnapshot.docChanges().forEach(function(change) {
          //console.log(change.doc.data())
          if (change.type === "added") {

            if (localStorage.getItem("message") === null) {
              let temp = {}
              localStorage.setItem("message", JSON.stringify(temp))
              console.log(localStorage.getItem("message"));
            }
            //localStorage.setItem("message",)
            let message = JSON.parse(localStorage.getItem("message"))
            let message_object = change.doc.data()
            let message_id = change.doc.id
            message[message_id] = message_object
            localStorage.setItem("message", JSON.stringify(message))
            message = JSON.parse(localStorage.getItem("message"))
            console.log(message_object)
            //实时更新
            if(
              (message_object.receiverUID == currentUser.uid && message_object.senderUID == currentTalkToUID)
              ||(message_object.receiverUID == currentTalkToUID && message_object.senderUID == currentUser.uid))
            {
              if(message_object.senderUID == currentUser.uid){
                var message_div = document.createElement("div")
                var message_p = document.createElement("p")
                message_div.setAttribute("class", "p-2 mb-2 bg-success text-white")
                message_p.setAttribute("class", "float-right")
                message_p.innerHTML = message_object.message
                message_div.appendChild(message_p)
                messageBox.appendChild(message_div)
              }
              else if(message_object.senderUID == currentTalkToUID){
                var message_div = document.createElement("div")
                var message_p = document.createElement("p")
                message_div.setAttribute("class", "p-2 mb-2 bg-light text-dark")
                message_p.setAttribute("class", "float-left")
                message_p.innerHTML = message_object.message
                message_div.appendChild(message_p)
                messageBox.appendChild(message_div)
              }
              messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
            }
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });
}



document.getElementById("signup").addEventListener("click", function(){
  const email = document.getElementById("signup_username").value
  const password = document.getElementById("signup_password").value
  console.log("用户名: " + email)
  console.log("密码: " + password)
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    document.getElementById("signup_message").innerHTML = error.message
    // ...
  }).then(function(mes){
    console.log(mes)
    if(mes != undefined){
      writeUserData(mes.user.uid,"还没起名",email,"/")
    }
  })
});


document.getElementById("login").addEventListener("click", function(){
  const email = document.getElementById("login_username").value
  const password = document.getElementById("login_password").value
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  }).then(function(mes){
    console.log(mes)
    if(mes != undefined){
      location.reload()
    }
    else{
      document.getElementById('login_message').innerHTML = "用户名或者密码错误"
    }
  });
  console.log("用户名: " + email)
  console.log("密码: " + password)
});



function add_search_friend_element(email, uid) {
  // create a new div element
  var newDiv = document.createElement("div");
  // and give it some content
  var span = document.createElement("span");
  span.innerHTML = email;
  var button = document.createElement("button");
  button.innerHTML = "添加"
  button.setAttribute("class", "badge badge-pill badge-info")
  button.setAttribute("id", email)
  button.addEventListener("click", function(){
      let currentUser = JSON.parse(user)
      let friend_email = email
      db.collection("friendship_pending").doc(uid).collection("send_from").doc(currentUser.uid).set({
          email: currentUser.email,
          uid: currentUser.uid
      })
      .then(function(){
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  })
  newDiv.appendChild(span);
  newDiv.appendChild(button);
  document.getElementById('search_friend_list').appendChild(newDiv)
}




function writeUserData(userId, name, email, imageUrl) {
  console.log(userId)
  // Add a new document in collection "cities"
  db.collection("users").doc(userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
  })
  .then(function() {
      console.log("Document successfully written!");
      location.reload()
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

}




//所有聆听器


let logoutUI = document.getElementById("logout")
if(logoutUI){
  logoutUI.addEventListener("click", function(){
    console.log("logout")
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      localStorage.removeItem("user")
      location.reload()
    }).catch(function(error) {
      // An error happened.
    });
  });
}

let profileUI = document.getElementById("profile")
if(profileUI){
  profileUI.addEventListener("click", function(){
    console.log("profile")
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
      console.log("alreday login")
    }
    else{}
  });
}


let searchButton = document.getElementById("search_friend_button")
if(searchButton){
  searchButton.addEventListener("click", function(){
    let friend_email = document.getElementById("search_friend_input").value
    console.log(friend_email)
    document.getElementById("search_friend_input").value = ""
    document.getElementById("search_friend_input").innerHTML = ""
    db.collection("users").where("email", "==", friend_email)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let email = doc.data().email
            let uid = doc.id
            add_search_friend_element(email, uid)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  });
}

let confirmRequestButton = document.getElementById("confirm_request")
if(confirmRequestButton){
  confirmRequestButton.addEventListener("click", function(){
    let requestUid = document.getElementById("request_uid").value
    let requestEmail = document.getElementById("request_email").value
    let currentUser = JSON.parse(user)
    let currentUserUid = currentUser.uid
    let currentUserEmail = currentUser.email
    console.log("通过")
    console.log(requestUid)
    console.log(currentUserUid)
    db.collection("friendship").doc(requestUid).collection("friend").doc(currentUserUid).set({
        email: currentUserEmail,
        uid: currentUserUid
    })
    .then(function(){
        console.log("Document successfully written!");
        db.collection('friendship_pending/'+currentUserUid+"/send_from/").doc(requestUid)
          .delete().then(function() {
              console.log("Document successfully deleted!");
              $('#friendRequestModal').modal('hide')
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    })
    db.collection("friendship").doc(currentUserUid).collection("friend").doc(requestUid).set({
        email: requestEmail,
        uid: requestUid
    })
    .then(function(){
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  });
}



let rejectRequestButton = document.getElementById("reject_request")
if(rejectRequestButton){
  rejectRequestButton.addEventListener("click", function(){
    let requestUid = document.getElementById("request_uid").value
    let requestEmail = document.getElementById("request_email").value
    let currentUser = JSON.parse(user)
    let currentUserUid = currentUser.uid
    let currentUserEmail = currentUser.email
    console.log("拒绝")
    console.log(requestUid)
    db.collection('friendship_pending/'+currentUserUid+"/send_from/").doc(requestUid)
      .delete().then(function() {
          console.log("Document successfully deleted!");
          $('#friendRequestModal').modal('hide')
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  });
}

function updateMessageBox(){
  console.log(currentTalkToUID)
  let messageBox = document.getElementById("message");
  messageBox.innerHTML = ""
  let message = JSON.parse(localStorage.getItem("message"))
  let currentUser = JSON.parse(user)
  let uid = currentUser.uid
  console.log(message);
  message_array = Object.values(message)
  console.log(message_array)
  console.log(uid)
  let filter = message_array.filter(e => e.receiverUID === uid && e.senderUID === currentTalkToUID ||e.receiverUID === currentTalkToUID && e.senderUID === uid)
  console.log(filter)
  filter.forEach((message_object) => {
    if(message_object.senderUID == currentUser.uid){
      var message_div = document.createElement("div")
      var message_p = document.createElement("p")
      message_div.setAttribute("class", "p-2 mb-2 bg-success text-white")
      message_p.setAttribute("class", "float-right")
      message_p.innerHTML = message_object.message
      message_div.appendChild(message_p)
      messageBox.appendChild(message_div)
    }
    else if(message_object.senderUID == currentTalkToUID){
      var message_div = document.createElement("div")
      var message_p = document.createElement("p")
      message_div.setAttribute("class", "p-2 mb-2 bg-light text-dark")
      message_p.setAttribute("class", "float-left")
      message_p.innerHTML = message_object.message
      message_div.appendChild(message_p)
      messageBox.appendChild(message_div)
    }
  });
  messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
}


let sendMessageButton = document.getElementById("send_message")
if(sendMessageButton){
  sendMessageButton.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        sendMessage()
      }
  });
}

//发送消息
function sendMessage(){
  let currentUser = JSON.parse(user)
  let currentUserUid = currentUser.uid
  let currentUserEmail = currentUser.email
  let message = document.getElementById("send_message").value
  console.log(message)
  document.getElementById("send_message").value = ""
  document.getElementById("send_message").innerHTML = ""
  console.log(currentUserUid)
  console.log(currentTalkToUID)
  db.collection("users").doc(currentUserUid)
  .collection("chat").add({
      message: message,
      senderUID: currentUserUid,
      senderEmail: currentUserEmail,
      seen: true,
      receiverUID: currentTalkToUID
  })
  .then(function(){
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

  db.collection("users").doc(currentTalkToUID)
  .collection("chat").add({
      message: message,
      senderUID: currentUserUid,
      senderEmail: currentUserEmail,
      seen: true,
      receiverUID: currentTalkToUID
  })
  .then(function(){
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

function VideoChat(){
  let currentUser = JSON.parse(user)
  let currentUserUid = currentUser.uid
  db.collection("users").doc(currentUserUid)
  .collection(currentTalkToUID).add({
      end: false
  })
  .then(function(docRef){
      console.log(docRef.id)
      console.log("Document successfully written!");
      window.location = "http://localhost:3000/room/" + docRef.id
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}
