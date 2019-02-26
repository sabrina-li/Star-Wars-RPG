

$(document).ready(function (){

    setTimeout(
        function() {
            //select charactors
            runtest1();
           
    }, 2000);
    
    
    setTimeout(
        function() {

            for (let i=0;i<4;i++){
            clickbutton();}
            alert("clicked 4 times");
    }, 2500);
    
    //user dies
    for (let i=0;i<1;i++){
        setTimeout(
            function() {

              clickbutton();
        }, 3000);
    }
    
    //nothing happens
    setTimeout(
        function() {

          runtest2();
    }, 4000);

    //nothing happens
    for (let i=0;i<3;i++){
        setTimeout(
            function() {

                clickbutton();
        }, 5000);
    }

    //restart
    setTimeout(
        function() {

            $("#restartBtn").click(); 
    }, 6000);

    setTimeout(
        function() {
          runtest2();
    }, 6500);
    
    for (let i=0;i<5;i++){
        setTimeout(
            function() {
              clickbutton();
        }, 7000);
    }



});

function runtest1(){
    console.log("test starting to run here")
    $("#luke").click(); 
    // $("#obiwan").click();
    // $("#sidious").click(); 
    $("#maul").click();  
    alert("selected charactors 1");
}
function runtest2(){
    console.log("test starting to run here")
    // $("#sidious").click(); 
     $("#obiwan").click();
     
     $("#luke").click();
    //$("#maul").click();  
    alert("selected charactors 2");
}

function clickbutton(){
    console.log("attack!")
    $("#attackButton").click(); 
}