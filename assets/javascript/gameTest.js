$(document).ready(function (){

    setTimeout(
        function() {
          runtest();
        }, 1000);


});

function runtest(){
    console.log("test starting to run here")
    $("#obiwan").click(); 
    $("#luke").click(); 
    // $("#sidious").click(); 
    // $("#maul").click(); 
}