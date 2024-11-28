

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
        let player = new Player(name,pos,phy,def,sho);
        let res = myTeam.addPlayer(player); 
        if(res != 1) {
            errorMsg.innerText = res;
            errorMsg.classList.add('text-red-600');
        }else{
            myModal.classList.toggle('invisible');
            document.body.classList.toggle('overflow-hidden');
            resetForm(addForm);
        }
    }
    console.log(myTeam);
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
    if(errorMsg.innerText != "") errorMsg.innerText = "";  
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



function Player(name,pos,phy,def,sho){
    this.id = new Date().getTime();
    this.name = name;
    this.pos = pos;
    this.phy = phy;
    this.def = def;
    this.sho = sho;
    this.createCard = function(){
        let div = document.createElement('div');
        div.classList = 'max-w-sm rounded overflow-hidden shadow-lg bg-black';
        div.innerHTML =`
                <div class="px-6 py-6">
                    <div class="font-bold text-xl mb-2 text-center text-white">J${this.name}</div>
                    <p class="text-white text-center">Position: <span class="font-semibold">${this.pos}</span></p>
                    <p class="text-white text-center">Status: <span class="font-semibold">Main</span></p>
                </div>
            
                <!-- Player Stats -->
                <div class="px-12 py-4 grid grid-cols-3 gap-4 text-white">
                    <!-- Physical Stats -->
                    <div class="text-center" >
                        <h3 class="text-lg font-semibold">PHY</h3>
                        <p class="text-xl">${this.phy}</p>
                    </div>
            
                    <!-- Defend Stats -->
                    <div class="text-center">
                        <h3 class="text-lg font-semibold">DEF</h3>
                        <p class="text-xl">${this.def}</p>
                    </div>
            
                    <!-- Shoot Stats -->
                    <div class="text-center">
                        <h3 class="text-lg font-semibold">SHO</h3>
                        <p class="text-xl">${this.sho}</p>
                    </div>
                </div>
        `;
        return div;
    };
}

class Team {
    constructor() {
        this.players = [];
        this.formation = "4-3-3";
        this.attCount = 0;
        this.defCount = 0;
        this.midCount = 0;
        this.gkCount = 0;
    }
    addPlayer(player){
        this.loadFromLS();
        if(this.players.length >= 11){
            return "Team full";
        }else if(this.players.length > 0){
            for(let el of this.players){
                if(el.pos === player.pos){
                    return "Position already full!";
                }
            }
            this.players.push(player);
            this.saveToLS();
            return 1;
        }else{
            player.createCard();
            this.players.push(player);
            this.saveToLS();
            return 1;
        }
    }
    removePlayer(player){
        this.loadFromLS();
        const length = this.players.length;
        this.players = this.players.filter(el => el.id != player.id); 
        if(length > this.players.length){
            this.saveToLS();
            return 1;
        }else{
            return 0;
        }
    }
    editPlayer(playerID,player){
        this.loadFromLS();
        for(let el of this.players){
            if(el.id == playerID){
                el = player;
                this.saveToLS();
                return 1;
            }
        }
        return 0;
    }
    saveToLS(){
        const data = {
            players : this.players,
            formation : this.formation,
        };
        localStorage.setItem("Team",JSON.stringify(data));
    }
    loadFromLS(){
        const data = JSON.parse(localStorage.getItem("Team"));
        if(data){
            this.players = data.players;
            this.formation = data.formation;
        }
        this.updateCounters();
    }
    updateCounters(){
        for(let el of this.players){
            if(el.pos === 'ATT'){
                this.attCount++;
            }
            else if(el.pos === 'DEF'){
                this.defCount++;
            }
            else if(el.pos === 'MID'){
                this.midCount++;
            }else{
                this.gkCount++;
            }
        }
    }
}
const myTeam = new Team();
console.log(myTeam);





