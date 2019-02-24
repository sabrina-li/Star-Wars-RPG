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
    // for (let i=0;i<1;i++){
    //     setTimeout(
    //         function() {
    //           clickbutton();
    //     }, 3000);
    // }
    // setTimeout(
    //     function() {
    //       runtest();
    // }, 3500);
    // for (let i=0;i<3;i++){
    //     setTimeout(
    //         function() {
    //             clickbutton();
    //     }, 4000);
    // }
    



});

function runtest(){
    console.log("test starting to run here")
    $("#luke").click(); 
    // $("#obiwan").click();
    // $("#sidious").click(); 
    $("#maul").click(); 
     
    // 
    // 
    
}

function clickbutton(){
    console.log("attack!")
    $("#attackButton").click(); 
}