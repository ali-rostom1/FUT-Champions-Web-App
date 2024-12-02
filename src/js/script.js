import {Team , Player} from './team.js';

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
});

const myteam = new Team();

myteam.loadFromLS();

myteam.renderPlayersInTerrain();

document.querySelectorAll('[id^=ter]').forEach((el)=>{
    let pos = el.id.length > 5 ? el.id.slice(3,5) : el.id.slice(3);
    console.log(pos);
    el.addEventListener('click',() => {
        myModal.classList.toggle('invisible');
        document.body.classList.toggle('overflow-hidden');
        let radioInputs = document.querySelectorAll('input[name=Position]');
        radioInputs.forEach((ele)=>{
            if(ele.value === pos || ele.value === pos + "M"){
                ele.checked = true;
            }
        })
        myteam.dynamicNameFormValidation(nameInput);
        myteam.dynamicStatsFormValidation(PHY);
        myteam.dynamicStatsFormValidation(DEF);
        myteam.dynamicStatsFormValidation(SHO);
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
            player.status = 'Main';
            myteam.addPlayer(player);
            myteam.changePlayerStatus(player);
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
