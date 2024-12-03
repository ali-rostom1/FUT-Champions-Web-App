import {Team , Player} from './team.js';

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
});

const myteam = new Team();

myteam.loadFromLS();

myteam.renderPlayersInTerrain();

document.querySelectorAll('[id^=ter]').forEach((el)=>{
    let pos="";
    if(el.id[el.id.length-1] === "M"){
            pos = el.id.slice(3,6);
            
    }else pos=el.id.slice(3,5);
    el.addEventListener('click',() => {
        if(!myteam.players.length) return;
        console.log(myteam.players);
        choiceContainer.classList.toggle('invisible');
        document.body.classList.toggle('overflow-hidden');
        let isEmpty = el.children[0].children[1].classList.contains('text-black');
        choiceContainer.children[0].innerHTML = "";
        myteam.players.forEach((ele)=>{
            if(ele.pos === pos && ele.status ==='Bench'){
                let div = choiceContainer.children[0].appendChild(myteam.createOptionsCard(ele));
                div.addEventListener('click',()=>{
                    myteam.changePlayerStatus(ele);
                    if(!isEmpty){
                        let name = el.children[0].children[1].children[1].textContent;
                        console.log(name);
                        myteam.players.forEach((player)=>{
                            player.name === name ? myteam.changePlayerStatus(player) : player ;
                        })
                    }
                    myteam.saveToLS();
                    myteam.renderPlayersInTerrain();
                    myteam.renderBenchPlayers();
                    choiceContainer.classList.toggle('invisible');
                    document.body.classList.toggle('overflow-hidden');
                })
            }
        })
    })
})
closeModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    resetForm(addForm);
});

addForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(myteam.inputValidation(nameInput,"5 letters and more only !")) {
        var name = nameInput.value;
    }
    let radioInput = document.querySelector('input[name="Position"]:checked');
    if(myteam.radioInputValidation(radioContainer,radioInput,"Check one of the above !")){
        var pos = radioInput.value;
    }
    if(myteam.inputValidation(PHY,"1 TO 100 !")) {
        var phy = PHY.value;
    }
    if(myteam.inputValidation(DEF,"1 TO 100 !")) {
        var def = DEF.value;
    }
    if(myteam.inputValidation(SHO,"1 TO 100 !")) {
        var sho = SHO.value;
    }
    if(name && pos && phy && def && sho){

        if(!myteam.checkName(name)) {
            let player = new Player(name,pos,phy,def,sho);
            myteam.addPlayer(player);
            myModal.classList.toggle('invisible');
            document.body.classList.toggle('overflow-hidden');
            resetForm(addForm);

        }else{
            errorMsg.innerText = 'name duplicate !!';
            errorMsg.classList.add('text-red-600');
        }
    }
})
function resetForm(form){
    nameInput.classList.remove('border-green-600','outline-none','border-red-600','border-2'); //name input reset
    if(nameInput.nextElementSibling) nameInput.nextElementSibling.remove();

    if(radioContainer.lastChild.classList == 'text-red-600') radioContainer.lastChild.remove();

    PHY.classList.remove('border-green-600','outline-none','border-red-600','border-2');
    if(PHY.nextElementSibling) PHY.nextElementSibling.remove();

    DEF.classList.remove('border-green-600','outline-none','border-red-600','border-2');
    if(DEF.nextElementSibling) DEF.nextElementSibling.remove();

    SHO.classList.remove('border-green-600','outline-none','border-red-600','border-2');
    if(SHO.nextElementSibling) SHO.nextElementSibling.remove();
    
    errorMsg.innerText = "";
    form.reset();
}

openModalBtn.addEventListener('click', ()=>{
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    resetForm(addForm);
})

console.log(myteam);
myteam.renderBenchPlayers();
myteam.renderPlayersInTerrain();

document.body.addEventListener('click',(event)=>{
            
    if(event.target.id === "choiceContainer"){
        choiceContainer.classList.toggle('invisible');
        document.body.classList.toggle('overflow-hidden');
        choiceContainer.children[0].innerHTML = "";
    }

})
loadPlayers.onclick = () =>{
    myteam.loadJSON();
    console.log(myteam.players);
}

reset.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();
})


toggleBench.onclick = ()=>{
    playersContainer.classList.toggle('invisible');
}