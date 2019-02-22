$(document).ready(function (){
    var ch = new Character("luke");
    
    $(".col-3").on("click",this,moveMyCharacterToDiv);

});

function moveMyCharacterToDiv(event){
    var cardId = ($(event.currentTarget).attr("id"));
    console.log(cardId);
    //todo move this card to my character div
}