

let users = [];
let showAll = false;
let percentChanged = 0;

let percentGoodChanged = 0;
let percentGoodNotChanged = 0;

let percentGoodChangedOfChanged = 0;
let percentGoodNotChangedOfNotChanged = 0;

let percentWrongChanged = 0;
let percentWrongNotChanged = 0;

let percentBetterCouldChange = 0;
let percentBetterCouldNotChange = 0;


window.onload = function(){

    // Check if localStorage is supported
    if (typeof(localStorage) === "undefined"){
        alert("Web storage not supported");
        return;
        // Sorry! No Web Storage support..
    }

    let data = localStorage.getItem("data");
    if ( data !== null ){
        users = JSON.parse(data);
        console.log(users);
    }

    let toggle = document.getElementById("toggle");
    toggle.innerHTML = showAll ? "Show 1 per user" : "Show all";
    toggle.onclick = function() {
        showAll = !showAll;
        toggle.innerHTML = showAll ? "Show 1 per user" : "Show all";
        parseData();
    };
    parseData();
};
function parseData(){
    let el = document.querySelector("#score tbody");
    // Clear body
    el.innerHTML = "";
    let changed = 0;
    let changedGood = 0;
    let notChangedGood = 0;
    let changedWrong = 0;
    let notChangedWrong = 0;
    let totalAttempts = 0;
    // Show all or not
    if(showAll){

        // Showing all scores
        for(let i=0; i < users.length; i++){
            for(let j=0; j < users[i].secondChoices.length; j++){
                totalAttempts++;

                // Have changed
                if( users[i].firstChoices[j] !== users[i].secondChoices[j] ){
                    changed++;

                    // Got the right door
                    if( users[i].secondChoices[j] === users[i].goodDoors[j] ){
                        changedGood++;
                    }else{
                        changedWrong++;
                    }
                }else{
                    // Got the right door
                    if( users[i].secondChoices[j] === users[i].goodDoors[j] ){
                        notChangedGood++;
                    }else{
                        notChangedWrong++;
                    }
                }

                createRow(el, users[i].id, users[i].firstChoices[j], users[i].secondChoices[j], users[i].goodDoors[j]);
            }
        }
    }else{
        totalAttempts = users.length;

        // Showing only the first per users
        for(let i=0; i < users.length; i++){

            // Have changed
            if( users[i].firstChoices[0] !== users[i].secondChoices[0] ){
                changed++;

                // Got the right door
                if( users[i].secondChoices[0] === users[i].goodDoors[0] ){
                    changedGood++;
                }else{
                    changedWrong++;
                }
            }else{
                // Got the right door
                if( users[i].secondChoices[0] === users[i].goodDoors[0] ){
                    notChangedGood++;
                }else{
                    notChangedWrong++;
                }
            }

            createRow(el, users[i].id, users[i].firstChoices[0], users[i].secondChoices[0], users[i].goodDoors[0]);
        }
    }

    // Calculate percentages
    percentChanged = changed / totalAttempts * 100;
    percentGoodChanged = changedGood / totalAttempts * 100;
    percentGoodNotChanged = notChangedGood / totalAttempts * 100;
    percentGoodChangedOfChanged = changedGood / changed * 100;
    percentGoodNotChangedOfNotChanged = notChangedGood / ( totalAttempts - changed ) * 100;
    percentWrongChanged = changedWrong / totalAttempts * 100;
    percentWrongNotChanged = notChangedWrong / totalAttempts * 100;
    percentBetterCouldChange = changedGood / ( changedGood + changedWrong ) * 100;
    percentBetterCouldNotChange = notChangedGood / ( changedGood + changedWrong ) * 100;

    document.querySelector("#percentChanged").innerText = parseInt( percentChanged + 0.5 );
    document.querySelector("#percentGoodChanged").innerText = parseInt( percentGoodChanged + 0.5 );
    document.querySelector("#percentGoodNotChanged").innerText = parseInt( percentGoodNotChanged + 0.5 );
    document.querySelector("#percentGoodChangedOfChanged").innerText = parseInt( percentGoodChangedOfChanged + 0.5 );
    document.querySelector("#percentGoodNotChangedOfNotChanged").innerText = parseInt( percentGoodNotChangedOfNotChanged + 0.5 );
    // document.querySelector("#percentWrongChanged").innerText = parseInt( percentWrongChanged + 0.5 );
    // document.querySelector("#percentWrongNotChanged").innerText = parseInt( percentWrongNotChanged + 0.5 );
    // document.querySelector("#percentBetterCouldChange").innerText = parseInt( percentBetterCouldChange + 0.5 );
    // document.querySelector("#percentBetterCouldNotChange").innerText = parseInt( percentBetterCouldNotChange + 0.5 );


    // console.log(changed + "/" + totalAttempts + " * " + 100);
    // console.log(percentChanged + "% changed");
    // console.log(percentGoodChanged + "% changed and got it right");
    // console.log(percentGoodNotChanged + "% not changed and got it right");
    // console.log(percentWrongChanged + "% changed and got it wrong");
    // console.log(percentWrongNotChanged + "% not changed and got it wrong");
    // console.log(percentBetterCouldChange + "% changed and got it right of all right attempts");
    // console.log(percentBetterCouldNotChange + "% changed and got it right of all right attempts");
}

function createRow(el, id, fDoor, sDoor, gDoor){
    let tr;
    tr = document.createElement("tr");

    addColumn(tr, id);
    addColumn(tr, fDoor+1);
    addColumn(tr, sDoor+1);
    addColumn(tr, gDoor+1);
    addColumn(tr, (fDoor === sDoor ? "Nee" : "Ja"));
    addColumn(tr, (sDoor === gDoor ? "Ja" : "Nee"));

    el.appendChild(tr);
}
function addColumn(el, data){
    td = document.createElement("td");
    td.innerText = data;
    el.appendChild(td);
}

