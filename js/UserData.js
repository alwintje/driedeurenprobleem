

class UserData{

    constructor (id){
        this.id = id;
        this.firstChoices = [];
        this.secondChoices = [];
        this.goodDoors = [];
    }
    addFirstChoice(choice){
        this.firstChoices[this.firstChoices.length] = choice;
    }
    addSecondChoice(choice){
        this.secondChoices[this.secondChoices.length] = choice;
    }
    addGoodDoor(door){
        this.goodDoors[this.goodDoors.length] = door;
    }
    getGoodDoor(door){
        return this.goodDoors[this.goodDoors.length-1];
    }
    getId(){
        return this.id;
    }

    getData() {
        return this.id + ":" + JSON.stringify(this.firstChoices) + ":" + JSON.stringify(this.secondChoices);
    }

}