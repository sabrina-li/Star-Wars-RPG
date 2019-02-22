var charactors = [];
var myCharactor,currentEnemy;

$(document).ready(function (){
    //get all characters from config file
    $.getJSON("config.json",function(ch){
        $.each(ch,function(key){
            charactors.push(key);
        })
    });
    console.log("list of charactors loaded:",charactors);
    $(".charactorList").on("click",this,moveCharactersOnMySelect);
    $("#attackButton").on("click",attackCurrentEnemy);

});

function attackCurrentEnemy(){
    if(typeof currentEnemy !== "undefined"){
        
    }else{
        alert("please select charactors first!");
    }
}






function selectNewEnemy(event){
    let cardId = ($(event.currentTarget).attr("id"));
    console.log(cardId, "is enemy!");
    currentEnemy = new Character(cardId);
    moveCardToDiv(cardId,$("#defender"));
    //unbind the rest
    charactors.splice(charactors.indexOf(cardId),1);
    charactors.forEach(function(each){
        moveCardToDiv(each,$("#enemies"));
    })
}


function moveCharactersOnMySelect(event){
    let cardId = ($(event.currentTarget).attr("id"));
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
        $("#"+each).on("click",this,selectNewEnemy);
    })
}

function moveCardToDiv(cardId,div){
    let card = $('#'+cardId);
    card.detach();
    div.append(card);
    card.unbind('click');
}
