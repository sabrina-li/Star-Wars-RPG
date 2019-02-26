
var charactors,charactorsObj = [];
var myCharactor,currentEnemy = null;


$(document).ready(function (){    
    //get all characters from config file and put cards in UI
    init();

});

function init(){
    //TODO dynamically create the cards for the charactores
    charactors = [];
    charactorsObj = [];
    myCharactor,currentEnemy = null;
    $("#attackResult").empty();
    $.getJSON("config.json",function(ch){
        $.each(ch,function(key){
            // console.log(key);
            charactorsObj.push(new Character(key));
            charactors.push(key);
        });
        resetUI();
        $(".charactorCard").on("click",moveCharactersOnMySelect);
        $("#attackButton").on("click",attackCurrentEnemy);
    });
    console.log("list of charactors loaded:",charactorsObj);
}

function resetUI(){
    $.each(charactors,function(idx,value){
        // $("#"+value).css("display","initial");
        // moveCardToDiv(value,".charactorList");
        // $("#"+value).children(".card").css({"background":"#F8F9FA","color":"#343A40"});
        // updateHP(charactorsObj[idx]);
         $("#"+value).remove();
    })
    
    $.each(charactorsObj,function(idx,value){
        
        let mydiv = value.buildCard();
        // console.log($(".charactorList"));
        console.log(mydiv.html());
        $("#charactorList").append(mydiv.html());
    });
    
    
}

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
        message = currentEnemy.displayName + " Attacked you back " + " for " + currentEnemy.counterAttack + " damage." 
        p2.text(message)
        console.log("2:",message);
        $("#attackResult").append(p2);

        myCharactor.doAttack(currentEnemy);
        updateHP(myCharactor);
        
        // console.log("curent enemy: ",currentEnemy.name);

        
        if(myCharactor.isDead()){
            alert("you died");
            console.log("you died!!");
            $("#attackResult").text("You've been defeated... game over!");
            $("#attackButton").off();
            addRestartButton();
            //update the text and restart button appear
        }else if(currentEnemy.isDead()){
            alert("enemy died");
            removeCurrentEnemy();
        }else{
            updateHP(currentEnemy);
        }
    }
}

function addRestartButton(){
    console.log("adding restart button");
    let restartBtn = $("<br><button>");
    restartBtn.text("Restart");
    restartBtn.attr("id","restartBtn");
    $("#attackResult").append(restartBtn);
    // init();
    restartBtn.click(init);
}
function updateHP(charater){
    $("#"+charater.name).children(".card").children(".card-text").text(charater.hp);
       
}


function removeCurrentEnemy(){
    // console.log(charactors);
    $("#"+currentEnemy.name).css("display","none");
    // console.log("enemies left: ",charactors);
    if (charactors.length===0){
        $("#attackResult").text("You've won!! game over!");
        addRestartButton();
        
    }else{
        $("#attackResult").text("You've defeated "+ currentEnemy.displayName + "! You can choost to fight another enemy!");
        currentEnemy=null;
        // console.log(charactors);
        charactors.forEach(function(each){
            // console.log(each);
            $("#"+each).on("click",selectNewEnemy);
        });
            }

    
}



function selectNewEnemy(){
    let cardId = $(this).attr("id");
    console.log(cardId, "is enemy!");
    currentEnemy = new Character(cardId);
    moveCardToDiv(cardId,"#defender");
    $("#"+cardId).children(".card").css({"background":"#343A40","color":"#F8F9FA"});
    //unbind the rest to disable clicking
    charactors.splice(charactors.indexOf(cardId),1);
    charactors.forEach(function(each){
        moveCardToDiv(each,"#enemies");
    })
    $("#attackResult").empty();
}


function moveCharactersOnMySelect(){
    let cardId = $(this).attr("id");
    console.log(cardId, "clicked!");
    myCharactor = new Character(cardId);
    setMyCharactorAndMoveOthers(cardId);

}

function setMyCharactorAndMoveOthers(cardId){
    
    moveCardToDiv(cardId,"#myCharacter");

    charactors.splice(charactors.indexOf(cardId),1);
    charactors.forEach(function(each){
        moveCardToDiv(each,"#enemies");
        //change card to danger once moved to enemy section
        //changeBackgroundColor(card,color);
        $("#"+each).children(".card").css("background","#DB3545");
        //old onclick has been unbinded, then bind new onclick func
        $("#"+each).on("click",selectNewEnemy);
    })
}

function moveCardToDiv(cardId,divId){
    let card = $('#'+cardId);
    let div = $(divId);
    div.append(card);
    card.off();
}
