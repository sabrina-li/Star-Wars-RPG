// var Characters = {};
// Characters["obiwan"] = {
//             name:"obiwan",
//             hp:120,
//             attack:8,
//             counterAttack:15
//         };
// Characters["luke"] = {
//             name:"luke",
//             hp:100,
//             attack:5,
//             counterAttack:5
//         };
// Characters["sidious"] = {
//             name:"sidious",
//             hp:150,
//             attack:6,
//             counterAttack:20
//         };
// Characters["maul"] = {
//             name:"maul",
//             hp:180,
//             attack:4,
//             counterAttack:25
//         };


//get all data from config file
var Characters
$.getJSON("config.json",function(data){Characters = data});
 
class Character{
    constructor(ch){
        if (typeof Characters[ch]!== "undefined"){
            let c= Characters[ch];
            this.name = c.name;
            this.displayName = c.displayName
            this.hp = c.hp;
            this.attack = c.baseAttack;
            this.baseAttack = c.baseAttack;
            this.counterAttack = c.counterAttack
            
             console.log(this.counterAttack,"created");
        }
        else{
            console.error("invalid charactor: " + ch);
        }
    }
    doAttack(enemy) {
        // console.log(this.baseAttack);
        // console.log(this.attack);
        enemy.attacked(this.attack);
        this.attack += this.baseAttack;
        if (enemy.hp >=0){
            this.hp -= enemy.counterAttack;
        }
        // return message;
    }

    attacked(damage){
        this.hp -= damage;
    }

    isDead(){
        return this.hp<=0;
    }
}