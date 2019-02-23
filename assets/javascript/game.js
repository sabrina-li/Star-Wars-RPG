var charactors = [];
var myCharactor,currentEnemy = null;

$(document).ready(function (){    
    //get all characters from config file
    $.getJSON("config.json",function(ch){
        $.each(ch,function(key){
            charactors.push(key);
        })
    });
    console.log("list of charactors loaded:",charactors);

//TODO dynamically create the cards for the charactores

    $(".charactorList").on("click",moveCharactersOnMySelect);
    $("#attackButton").on("click",attackCurrentEnemy);




});

function attackCurrentEnemy(){
    if( currentEnemy == null ||  myCharactor === null){
        alert("please select charactors first!"); 
    }else{
        $("#attackResult").empty();
        let p1 = $("<p>");
        let p2 = $("<p>");
        let message = "You Attacked " + currentEnemy.displayName + " for " + myCharactor.attack + " damage." 
        p1.text(message)
        $("#attackResult").append(p1);
        console.log("1:",message);
        message = currentEnemy.displayName + " Attacked you back " + " for " + currentEnemy.attack + " damage." 
        p2.text(message)
        console.log("2:",message);
        $("#attackResult").append(p2);

        myCharactor.doAttack(currentEnemy);
        updateHP(myCharactor);
        updateHP(currentEnemy);
        console.log("curent enemy: ",currentEnemy.name);

        //TODO
        if(myCharactor.isDead()){
            alert("you died");
        }else if(currentEnemy.isDead()){
            alert("enemy died");
            removeCurrentEnemy();
        }
    }
}

function updateHP(charater){
    
    $("#"+charater.name).children(".card").children(".card-text").text(charater.hp);
       
}


function removeCurrentEnemy(){
    // console.log(charactors);
    $("#"+currentEnemy.name).remove();
    $("#attackResult").text("You've won this round! Click to select your next Enemy!");
    currentEnemy=null;
    // console.log(charactors);
    charactors.forEach(function(each){
        // console.log(each);
        $("#"+each).on("click",selectNewEnemy);
    });
    
}


//TODO vefiry without event
function selectNewEnemy(){
    let cardId = $(this).attr("id");
    console.log(cardId, "is enemy!");
    currentEnemy = new Character(cardId);
    moveCardToDiv(cardId,$("#defender"));
    $("#"+cardId).children(".card").attr("class",$("#"+cardId).children(".card").attr("class")+" text-light bg-dark");
    //unbind the rest
    charactors.splice(charactors.indexOf(cardId),1);
    charactors.forEach(function(each){
        moveCardToDiv(each,$("#enemies"));
    })
}


function moveCharactersOnMySelect(){
    console.log(this);
    let cardId = $(this).attr("id");
    console.log(cardId, "clicked!");
    myCharactor = new Character(cardId);
    setMyCharactorAndMoveOthers(cardId);

}

function setMyCharactorAndMoveOthers(cardId){
    
    moveCardToDiv(cardId,$("#myCharacter"));

    charactors.splice(charactors.indexOf(cardId),1);
    charactors.forEach(function(each){
        moveCardToDiv(each,$("#enemies"));
        //change card to danger once moved to enemy section
        //changeBackgroundColor(card,color);
        $("#"+each).children(".card").attr("class",$("#"+each).children(".card").attr("class")+" bg-danger");
        //old onclick has been unbinded, then bind new onclick func
        $("#"+each).on("click",selectNewEnemy);
    })
}

function moveCardToDiv(cardId,div){
    let card = $('#'+cardId);
    card.detach();
    div.append(card);
    card.unbind('click');
}
