function Selected(){
  var e = document.getElementById("inputGroup");
  var selectValue = e.options[e.selectedIndex].value;
  console.log(selectValue)
    document.getElementById("data").innerHTML = ""
    for(const [key, value] of Object.entries(object)) {
      if(value.city == selectValue){
        object[key] = value;
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
        p2.innerHTML = "平均小时: " + object[key].time + " 小时";
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
}
