$(document).ready(function (){

    setTimeout(
        function() {
          runtest();
    }, 1000);
    for (let i=0;i<4;i++){
        setTimeout(
            function() {
              clickbutton();
        }, 1500);
    }
    for (let i=0;i<1;i++){
        setTimeout(
            function() {
              clickbutton();
        }, 2000);
    }
    setTimeout(
        function() {
          runtest();
    }, 2500);
    



});

function runtest(){
    console.log("test starting to run here")
    $("#obiwan").click(); 
    $("#luke").click(); 
    //$("#sidious").click(); 
    $("#maul").click(); 
}

function clickbutton(){
    console.log("attack!")
    $("#attackButton").click(); 
}