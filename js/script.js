let users = [];
let user;
let chosenDoor = null;
let doors;
let openedDoor = null;
let finished = false;
let winningVideo;
let firstTime = true;

window.onload = function(){

    // Check if localStorage is supported
    if (typeof(localStorage) === "undefined"){
        alert("Web storage not supported");
        return;
        // Sorry! No Web Storage support..
    }

    // Full screen mode
    let e = document.getElementById("game");
    let fullscreen = document.getElementById("fullscreen");
    fullscreen.onclick = function(){

        if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
            RunPrefixMethod(document, "CancelFullScreen");
        }
        else {
            RunPrefixMethod(e, "RequestFullScreen");
        }
    };

    winningVideo = document.createElement("video");
    winningVideo.controls = false;
    winningVideo.autoplay = true;
    winningVideo.loop = true;

    let source = document.createElement("source");
        source.src = "video/money.mp4";
        source.type = "video/mp4";
    winningVideo.appendChild(source);

    // Remove saved data
    // localStorage.removeItem("data");


    // Check for data
    let data = localStorage.getItem("data");
    if ( data !== null ){
        users = JSON.parse(data);
    }

    // Create new user with id
    user = new UserData(users.length+111);

    // Show user number
    document.getElementById("number").innerText = user.getId();

    start();

    // open a door
    let nextBtn = document.getElementById("next");
    nextBtn.onclick = function(){
        if(chosenDoor !== null){
            if(openedDoor === null){
                user.addFirstChoice(chosenDoor);
                let rand;
                do{
                    rand = Math.floor(Math.random()*3);
                }while(rand === user.getGoodDoor() || rand === chosenDoor);

                doors[rand].parentNode.setAttribute("class", "frame open");
                openedDoor = rand;
            }else if(!finished){
                user.addSecondChoice(chosenDoor);
                doors[chosenDoor].parentNode.setAttribute("class", "frame open");
                if(firstTime){
                    users[users.length] = user;
                }else{
                    users[users.length-1] = user;
                }
                localStorage.setItem("data", JSON.stringify(users));

                finished = true;
            }else{
                reset();
            }
        }
    };

    // New player
    let newBtn = document.getElementById("new");
    newBtn.onclick = function(){
        window.location.href = document.location.href;
    };

};

let pfx = ["webkit", "moz", "ms", "o", ""];
function RunPrefixMethod(obj, method) {

    let p = 0, m, t;
    while (p < pfx.length && !obj[m]) {
        m = method;
        if (pfx[p] === "") {
            m = m.substr(0,1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = typeof obj[m];
        if (t !== "undefined") {
            pfx = [pfx[p]];
            return (t === "function" ? obj[m]() : obj[m]);
        }
        p++;
    }

}

function start(){

    // Set values to null
    chosenDoor = null;
    openedDoor = null;
    finished = false;

    // Set good door between 0 and 3
    user.addGoodDoor(Math.floor(Math.random()*3));

    // Start playing
    let playBtn = document.getElementById("startBtn");
    playBtn.onclick = function(){
        let start = document.querySelector(".start");
        start.style.top = "100%";
    };

    // User may choose a door
    doors = document.querySelectorAll(".door");
    let goodDoor = doors[user.getGoodDoor()].parentNode.querySelector(".behind");

    goodDoor.appendChild(winningVideo);


    for(let i=0; i < doors.length; i++){
        doors[i].dataset.num = i;
        doors[i].onclick = function(){
            // user.addFirstChoice(this.dataset.num);
            if(this.dataset.num !== openedDoor){
                let selected = document.querySelector(".selected");
                if(selected){
                    selected.setAttribute("class", "door");
                }
                chosenDoor = Number.parseInt(this.dataset.num);
                this.setAttribute("class", "door selected");
            }
        };
    }
}


function reset(){

    firstTime = false;

    // Reset classes
    for(let i=0; i < doors.length; i++){
        doors[i].parentNode.setAttribute("class", "frame");
        doors[i].setAttribute("class", "door");
    }

    // Remove video when won.
    winningVideo.parentNode.removeChild(winningVideo);
    setTimeout("start()", 500);
    // start();
}