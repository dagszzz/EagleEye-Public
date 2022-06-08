const btn = document.querySelector('.button');
const output = document.querySelector('.output');
let ctr = 0;

const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

 // Ripple Effect JavaScript Code
 let buttons = document.querySelectorAll(".button");

 for (var i = 0; i < buttons.length; i++) {
   buttons[i].addEventListener("click", (e)=>{
     e.preventDefault(); // preventing form submitting

     let overlay = document.createElement('span'); //creating a tag(span)
     overlay.classList.add("overlay"); //adding a class inside the span
     e.target.appendChild(overlay); //adding overlay tag inside the anchor tag at in HTML

     let xValue = e.clientX - e.target.offsetLeft; //by this we get perfect value where we will click
     let yValue = e.clientY - e.target.offsetTop; //by this we get perfect value where we will click

      overlay.style.left = xValue + "px"; //changing the position of the overlay according to our clicks on the button
      overlay.style.top = yValue + "px"; //changing the position of the overlay according to our clicks on the button
 });
 }

 function limitNum(input){
     var limit = /[^0-5]/g;
     input.value = input.value.replace(limit,"");
 }
 



fetch('https://create-eagleeye.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=&username=Joshua@gmail.com&password=passkey&scope=&client_id=&client_secret='
    }).then(res => {
        return res.json();
    }).then(json => {
        console.log(json['access_token']);

        fetch('https://create-eagleeye.herokuapp.com/posts/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + json['access_token']
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log(json);
            outjson(json);
        });
    });

function outjson(val){
    console.log(val);
    let html = '';
    val.forEach((ele,ind) => {
        console.log(ele);
        html += `<div>${ind+1}. ${ele.title} ${ele.content} (${ele.id}) </div>`;
    })
    html += `<small>${JSON.stringify(val)}</small>`;
    output.innerHTML = html;
}

btn.onclick = () => {
    output.innerHTML = 'Connecting...'
    getData();

}