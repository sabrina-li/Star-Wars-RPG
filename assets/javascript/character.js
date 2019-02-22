var Characters = {};
Characters["obiwan"] = {
            name:"obiwan",
            hp:120,
            attack:8,
            counterAttack:15
        };
Characters["luke"] = {
            name:"luke",
            hp:100,
            attack:5,
            counterAttack:5
        };
Characters["sidious"] = {
            name:"sidious",
            hp:150,
            attack:6,
            counterAttack:20
        };
Characters["maul"] = {
            name:"maul",
            hp:180,
            attack:4,
            counterAttack:25
        };
 
class Character{
    constructor(ch){
        if (typeof Characters[ch]!== "undefined"){
            this.character = Characters[ch];
        }
        else{
            console.error("invalid charactor: " + ch);
        }
    }
    attack(ch) {
        
    }
}