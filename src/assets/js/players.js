import {Team , Player} from 'assets/js/team.js';

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
});
closeEditModalBtn.addEventListener('click', function(){
    editModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    resetEditForm(editForm);
});
closeModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    resetForm(addForm);
});
openModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    myTeam.dynamicNameFormValidation(nameInput);
    let radioInputs = document.querySelectorAll('input[name="Position"]');
    myTeam.dynamicRadioFormValidation(radioContainer,radioInputs);
    myTeam.dynamicStatsFormValidation(PHY);
    myTeam.dynamicStatsFormValidation(DEF);
    myTeam.dynamicStatsFormValidation(SHO);
    
});


addForm.addEventListener('submit',function(event){
    event.preventDefault();
    if(myTeam.inputNameValidation(nameInput,"5 letters and more only !")) {
        var name = nameInput.value;
    }
    let radioInput = document.querySelector('input[name="Position"]:checked');
    if(myTeam.radioInputValidation(radioContainer,radioInput,"Check one of the above !")){
        var pos = radioInput.value;
    }
    if(myTeam.inputStatsValidation(PHY,"1 TO 100 !")) {
        var phy = PHY.value;
    }
    if(myTeam.inputStatsValidation(DEF,"1 TO 100 !")) {
        var def = DEF.value;
    }
    if(myTeam.inputStatsValidation(SHO,"1 TO 100 !")) {
        var sho = SHO.value;
    }
    if(name && pos && phy && def && sho){

        if(!myTeam.checkName(name)) {
            let img = '/src/assets/images/default.jpg';
            let player = new Player(name,pos,phy,def,sho,img);
            
            console.log(myTeam.addPlayer(player));
            myModal.classList.toggle('invisible');
            document.body.classList.toggle('overflow-hidden');
            resetForm(addForm);
            myTeam.renderPlayersPage();
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






const myTeam = new Team();
myTeam.loadFromLS();
myTeam.renderPlayersPage();
console.log(myTeam);


