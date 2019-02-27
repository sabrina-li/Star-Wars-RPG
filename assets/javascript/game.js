
var charactorsObj = [];
var myCharactor,currentEnemy = null;


$(document).ready(function (){    
    init();

});


//get all characters from config file and put cards in UI
function init(){
    // charactors = [];
    charactorsObj = [];
    myCharactor,currentEnemy = null;

    $("#attackResult").empty();

    $.getJSON("config.json",function(ch){
        $.each(ch,function(key){
            charactorsObj.push(new Character(key));
            // charactors.push(key);
        });
        resetUI();
        $(".charactorCard").on("click",moveCharactersOnMySelect);
        $("#attackButton").on("click",attackCurrentEnemy);
    });
    console.log("list of charactors loaded:",charactorsObj);
}

function resetUI(){
    $.each(charactorsObj,function(idx,value){
        //remove card from previous and add new ones
        $("#"+value.name).remove();
        let mydiv = value.buildCard();
        //console.log(mydiv.html());
        $("#charactorList").append(mydiv.html());
        $("#"+value.name).children(".card").css({"background":"#F8F9FA","color":"#343A40"});
    });
}


function moveCharactersOnMySelect(){
    let cardId = $(this).attr("id");
    console.log(cardId, "clicked!");
    setMyCharactorAndMoveOthers(cardId);
}

//move my selection to my character,  and all other to enemy
function setMyCharactorAndMoveOthers(cardId){
    moveCardToDiv(cardId,"#myCharacter");
    $.each(charactorsObj,function(idx,value){
        if(value.name !== cardId){
            moveCardToDiv(value.name,"#enemies");
            //change card to red once moved to enemy section
            $("#"+value.name).children(".card").css({"background":"#DB3545","color":"#F8F9FA"});
            //old onclick has been unbinded, then bind new onclick func
            $("#"+value.name).on("click",selectNewEnemy);
        }else{
            myCharactor = value;
        }
    });
}

//new enemy clicked, update ui for new enemy
function selectNewEnemy(){
    let cardId = $(this).attr("id");
    console.log(cardId, "is enemy!");
    
    // console.log( charactorsObj);
    moveCardToDiv(cardId,"#defender");
    //change background to black for defender
    $("#"+cardId).children(".card").css({"background":"#343A40","color":"#F8F9FA"});
    //unbind the rest to disable clicking
    $.each(charactorsObj,function(idx,value){
        $("#"+value.name).off();
        if(value.name == cardId){
            currentEnemy = value;
        }
    })
    $("#attackResult").empty();
}

//one round of attach and determin win/lose
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
        message = currentEnemy.displayName + " attacked you back " + " for " + currentEnemy.counterAttack + " damage." 
        p2.text(message)
        console.log("2:",message);
        $("#attackResult").append(p2);

        myCharactor.doAttack(currentEnemy);
        updateHP(myCharactor);
        updateHP(currentEnemy);
        // console.log(currentEnemy.hp);
        
        if(myCharactor.isDead()){
            //update the text and restart button appear
            alert("you died");
            $("#attackResult").text("You've been defeated... game over!");
            $("#attackButton").off();
            addRestartButton();
        }else if(currentEnemy.isDead()){
            // alert("enemy died");
            removeCurrentEnemy();
        }
    }
}

//call update hp after each round
function updateHP(charater){
    $("#"+charater.name).children(".card").children(".card-text").text(charater.hp);
}

//disable attack button
function addRestartButton(){
    $("#attackButton").off();
    let restartBtn = $("<br><button>");
    restartBtn.text("Restart");
    restartBtn.attr("id","restartBtn");
    restartBtn.addClass("btn btn-danger");
    $("#attackResult").append(restartBtn);
    restartBtn.click(init);
}

//current enemy died
function removeCurrentEnemy(){
    $("#"+currentEnemy.name).remove();
    // console.log($("#enemies"));
    if($("#enemies").is(":empty")){
        $("#attackResult").text("You've won!! game over!");
        addRestartButton();        
    }else{
        $("#attackResult").text("You've defeated "+ currentEnemy.displayName + "! You can choose to fight another enemy!");
        currentEnemy=null;
        $.each(charactorsObj,function(idx,value){
            if (value.name!==myCharactor.name){
                $("#"+value.name).on("click",selectNewEnemy);
            }
        });
    }
}


function moveCardToDiv(cardId,divId){
    let card = $('#'+cardId);
    let div = $(divId);
    div.append(card);
    card.off();
}
