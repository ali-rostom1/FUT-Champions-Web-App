

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
});

closeModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    addForm.reset();
});
openModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    nameInput.addEventListener('input', function(){
        if(nameInput.value != "" && nameInput.value.length > 5 && isNaN(nameInput.value)){
            nameInput.classList.add('border-green-600','border-2');
            nameInput.classList.remove('border-red-600');
        }else{
            nameInput.classList.add('border-red-600','border-2');
            nameInput.classList.remove('border-green-600');
        }
    })
});

function Player(name,pos,phy,def,sho){
    this.name = name;
    this.pos = pos;
    this.phy = phy;
    this.def = def;
    this.sho = sho;
    this.createCard = function(){
        let div = document.createElement('div');
        return div;
    };
}
Players = [];
console.log(Players);
addForm.addEventListener('submit',function(event){
    event.preventDefault();
    
    let pos = document.querySelector('input[name="Position"]:checked').value;
    let phy = document.getElementById('PHY').value;
    let def = document.getElementById('DEF').value;
    let sho = document.getElementById('SHO').value;
    let player = new Player(name,pos,phy,def,sho);
    Players.push(player);
})






function noNumberString(string){
    for(let i=0;i<string.length;i++){
        if(!isNaN(string[i])){
            return 0;
        }
    }
    return 1;
}
