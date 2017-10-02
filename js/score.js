

let users = [];
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
    let el = document.querySelector("#score tbody");
    for(let i=0; i < users.length; i++){
        createRow(el, users[i].id, users[i].firstChoices[0], users[i].secondChoices[0], users[i].goodDoors[0])
    }
};

function createRow(el, id, fDoor, sDoor, gDoor){
    let tr;
    tr = document.createElement("tr");

    addColumn(tr, id);
    addColumn(tr, fDoor);
    addColumn(tr, sDoor);
    addColumn(tr, gDoor);
    addColumn(tr, (fDoor === sDoor ? "Nee" : "Ja"));
    addColumn(tr, (sDoor === gDoor ? "Ja" : "Nee"));

    el.appendChild(tr);
}
function addColumn(el, data){
    td = document.createElement("td");
    td.innerText = data;
    el.appendChild(td);
}

