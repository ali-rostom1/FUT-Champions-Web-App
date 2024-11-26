

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
});

closeModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    resetForm(addForm);
});
openModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    dynamicNameFormValidation(nameInput);
    let radioInputs = document.querySelectorAll('input[name="Position"]');
    dynamicRadioFormValidation(radioContainer,radioInputs);
    dynamicStatsFormValidation(PHY);
    dynamicStatsFormValidation(DEF);
    dynamicStatsFormValidation(SHO);
    
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
    if(inputValidation(nameInput,"5 letters and more only !")) {
        var name = nameInput.value;
    }
    let radioInput = document.querySelector('input[name="Position"]:checked');
    if(radioInputValidation(radioContainer,radioInput,"Check one of the above !")){
        var pos = radioInput.value;
    }
    if(inputValidation(PHY,"1 TO 100 !")) {
        var phy = PHY.value;
    }
    if(inputValidation(DEF,"1 TO 100 !")) {
        var def = DEF.value;
    }
    if(inputValidation(SHO,"1 TO 100 !")) {
        var sho = SHO.value;
    }
    if(name && pos && phy && def && sho){
        var player = new Player(name,pos,phy,def,sho);
        Players.push(player);
    }
    console.log(Players);
})






function noNumberString(string){
    for(let i=0;i<string.length;i++){
        if(string[i] >= '0' && string[i]<= '9'){
            return 0;
        }
    }
    return 1;
}

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

    form.reset();
}


function dynamicNameFormValidation(input){
    input.addEventListener('input', function(){
        if(input.value != "" && input.value.length > 5 && noNumberString(input.value)){
            input.classList.add('border-green-600','border-2','outline-none');
            input.classList.remove('border-red-600');
            if(input.nextElementSibling) input.nextElementSibling.remove();
        }else if(input.value == ""){
            input.classList.remove('border-green-600','border-red-600','outline-none');
        }
        else{
            input.classList.add('border-red-600','border-2','outline-none');
            input.classList.remove('border-green-600');
        }
    });
}
function dynamicRadioFormValidation(container,radioInputs){
    radioInputs.forEach(radio => {
        radio.addEventListener('change',function(){
            if(container.lastChild.classList == 'text-red-600') container.lastChild.remove();
        });
    });
}
function dynamicStatsFormValidation(input){
    input.addEventListener('input', function(){
        if(input.value != "" && parseInt(input.value)<=100){
            input.classList.add('border-green-600','border-2','outline-none');
            input.classList.remove('border-red-600');
            if(input.nextElementSibling) input.nextElementSibling.remove();
        }else if(input.value == ""){
            input.classList.remove('border-green-600','border-red-600','outline-none');
        }
        else{
            input.classList.add('border-red-600','border-2','outline-none');
            input.classList.remove('border-green-600');
        }
    });
}

function inputValidation(input,error){
    if(input.classList.contains('border-green-600')){
        return 1;
    }else{
        if(!input.nextElementSibling){
            let div = document.createElement('div');
            div.classList = 'text-red-600';
            div.innerText = error;
            input.after(div);
        }
        return 0;
    }
}
function radioInputValidation(container,input,error){
    if(input){
        return input.value;
    }else{
        if(container.lastChild.classList!='text-red-600'){
            let div = document.createElement('div');
            div.classList = 'text-red-600';
            div.innerText = error;
            container.appendChild(div);
        }
        return 0;
    }
}