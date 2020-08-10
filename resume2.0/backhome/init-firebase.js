var firebaseConfig = {
    apiKey: "AIzaSyC_7YTQ6sm_6mnfmDF6EtJBPVGRxcsbDAo",
    authDomain: "backhome-284701.firebaseapp.com",
    databaseURL: "https://backhome-284701.firebaseio.com",
    projectId: "backhome-284701",
    storageBucket: "backhome-284701.appspot.com",
    messagingSenderId: "1076168828777",
    appId: "1:1076168828777:web:33eecd44dada98c76bfff8",
    measurementId: "G-V2HCKWH7PM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var database = firebase.database();
  var object = {}
  var cityObject = {}
  function readDatabase(){
    var starCountRef = firebase.database().ref('data');
    var data = document.getElementById('data');
    starCountRef.on('value', function(snapshot) {
      console.log(snapshot.val())
      for(const [key, value] of Object.entries(snapshot.val())) {
        var length = Object.keys(value).length - 2
        var totalhours = 0
        for(const [key1, value1] of Object.entries(value)) {
          if(key1 != "city" && key1 != "url"){
            var int = parseInt(value1.hours)
            totalhours += int
          }
        }
        var hours = totalhours/length
        console.log(hours)
        console.log(totalhours)
        console.log(length)
        if(key in object){
          //Do nothing, at least for now
          if(object[key].time != hours){
            document.getElementById(key).innerHTML = "平均小时: " + hours + " 小时";
            object[key].time = hours
          }
        }
        else
        {
          console.log(value)
          object[key] = value;
          console.log(hours)
          object[key].time = hours
          var city = value.city
          var url = value.url
          var card = document.createElement("div");
          card.setAttribute('class', 'card');
          var body = document.createElement("div");
          body.setAttribute('class', 'card-body');
          var cityInfo = document.createElement("a");
          cityInfo.setAttribute('class', 'card-text');
          cityInfo.innerHTML = key;
          var att = document.createAttribute("href");        // Create a "href" attribute
          att.value = url;            // Set the value of the href attribute
          cityInfo.setAttributeNode(att);
          var cityBadge = document.createElement("button");
          cityBadge.setAttribute('class', 'badge badge-secondary');
          cityBadge.innerHTML = city;
          var p2 = document.createElement("p");
          p2.setAttribute('class', 'card-text');
          p2.setAttribute('id', key);
          p2.innerHTML = "平均小时: " + hours + " 小时";
          var commentDiv = document.createElement("div");
          commentDiv.setAttribute('class', 'card-text');
          var p3 = document.createElement("p");
          p3.innerHTML = "消息是否准确"
          var button1 = document.createElement("button");
          button1.innerHTML = "准确"
          button1.setAttribute('class', 'btn btn-secondary');
          var button2 = document.createElement("button");
          button2.innerHTML = "不准确"
          button2.setAttribute('class', 'btn btn-warning');
          card.appendChild(body);
          body.appendChild(cityInfo);
          body.appendChild(cityBadge);
          body.appendChild(p2);
          body.appendChild(p3);
          body.appendChild(commentDiv);
          commentDiv.appendChild(button1);
          commentDiv.appendChild(button2);
          data.appendChild(card);
        }
      }
    });
  }

  function readCity(){
    var starCountRef = firebase.database().ref('city');
    var inputGroup = document.getElementById('inputGroup');
    starCountRef.on('value', function(snapshot) {
      console.log(snapshot.val())

      for(const [key, value] of Object.entries(snapshot.val())) {
        if(key in cityObject){
          //Do nothing, at least for now
        }
        else{
          cityObject[key] = value;
          var option = document.createElement("option");
          option.innerHTML = key
          option.setAttribute('value', key);
          inputGroup.appendChild(option)
        }
      }
    });
  }

readDatabase()
readCity()
