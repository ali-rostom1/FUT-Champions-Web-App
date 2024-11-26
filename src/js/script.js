

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
    if(nameInput.classList.contains('border-green-600')){
    }else{
        console.log(nameInput.nextSibling);
        if(!nameInput.nextElementSibling){
            let div = document.createElement('div');
            div.classList = 'text-red-600';
            div.innerText = 'ERROR'
            nameInput.after(div);
        }
    }
    let pos = document.querySelector('input[name="Position"]:checked').value;
    let phy = document.getElementById('PHY').value;
    let def = document.getElementById('DEF').value;
    let sho = document.getElementById('SHO').value;
    let player = new Player(name,pos,phy,def,sho);
    Players.push(player);
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
    nameInput.classList = 'w-full px-4 py-2 border border-gray-300 rounded-md'; //name input reset
    if(nameInput.nextElementSibling) nameInput.nextElementSibling.remove();
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