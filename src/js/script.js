

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
});
closeEditModalBtn.addEventListener('click', function(){
    editModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    resetForm(editForm);
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
    
    errorMsg.innerText = "";
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
}

class Team {
    constructor() {
        this.players = [];
        this.formation = "4-3-3";
    }
    renderPlayers(){
        playerCardsContainer.innerHTML = "";
        for(let el of this.players){
            playerCardsContainer.appendChild(this.createCard(el));
        }
        this.updatePlayersCounter();
        this.delBtnsRender();
        this.editBtnsRender();
    }
    addPlayer(player){
        this.loadFromLS();
        if(this.players.length >= 11){
            return "Team full";
        }else{
            for(let el of this.players){
                if(el.pos === player.pos){
                    if(el.pos === "CM" && this.getCMCount()<2){
                        this.players.push(player);
                        this.saveToLS();
                        return 1;
                    }else if(el.pos === "CB" && this.getCBCount()<2){
                        this.players.push(player);
                        this.saveToLS();
                        return 1;
                    }
                    return "Position already full!";
                }
            }
            this.players.push(player);
            this.renderPlayers();
            this.saveToLS();
            return 1;
        }
    }
    removePlayer(player){
        const length = this.players.length;
        this.players = this.players.filter(el => el.id != player.id); 
        if(length > this.players.length){
            this.saveToLS();
            return 1;
        }else{
            return 0;
        }
    }
    editPlayer(playerID,name,pos,phy,def,sho){
        this.loadFromLS();
        for(let el of this.players){
            if(el.id == playerID){
                el.name = name;
                el.pos = pos;
                el.phy = phy;
                el.def = def;
                el.sho = sho;
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
    }
    getCMCount(){
        let count=0;
        for(let el of this.players){
            if(el.pos ==="CM"){
                count++;
            }
        }
        return count;
    }
    getCBCount(){
        let count=0;
        for(let el of this.players){
            if(el.pos ==="CB"){
                count++;
            }
        }
        return count;
    }
    updatePlayersCounter(){
        playerCount.innerText = `${this.players.length} Players shown`;
    }
    createCard(player){
        let div = document.createElement('div');
        div.classList = 'max-w-sm rounded overflow-hidden shadow-lg bg-black mb-10';
        div.innerHTML =`
                <div class="px-6 py-6">
                    <div class="font-bold text-xl mb-2 text-center text-white">${player.name}</div>
                    <p class="text-white text-center">Position: <span class="font-semibold">${player.pos}</span></p>
                    <p class="text-white text-center">Status: <span class="font-semibold">Main</span></p>
                </div>
                <div class="flex justify-center gap-6">
                    <button class="bg-red-500 text-white px-2 rounded-md" id="${player.id}-del">DEL</button>
                    <button class="bg-sky-600 text-white px-2 rounded-md" id="${player.id}-edit">EDIT</button>
                </div>
                <!-- Player Stats -->
                <div class="px-12 py-4 grid grid-cols-3 gap-4 text-white">
                    <!-- Physical Stats -->
                    <div class="text-center" >
                        <h3 class="text-lg font-semibold">PHY</h3>
                        <p class="text-xl">${player.phy}</p>
                    </div>
                
                    <!-- Defend Stats -->
                    <div class="text-center">
                        <h3 class="text-lg font-semibold">DEF</h3>
                        <p class="text-xl">${player.def}</p>
                    </div>
            
                    <!-- Shoot Stats -->
                    <div class="text-center">
                        <h3 class="text-lg font-semibold">SHO</h3>
                        <p class="text-xl">${player.sho}</p>
                    </div>
                </div>
        `;
        return div;
    }
    delBtnsRender(){
        this.players.forEach(el => {
            let delbtn = `${el.id}-del` ;
            delbtn = document.getElementById(delbtn);
            delbtn.onclick = () =>{
                this.removePlayer(el);
                this.renderPlayers();
            }
        });
    }
    editBtnsRender(){
        this.players.forEach(el => {
            let editBtn = `${el.id}-edit` ;
            editBtn = document.getElementById(editBtn);
            editBtn.onclick = () => {
                editModal.classList.toggle('invisible');
                document.body.classList.toggle('overflow-hidden');

                let radioInputs = document.querySelectorAll('input[name="Position2"]');
                dynamicNameFormValidation(nameInput2);
                dynamicRadioFormValidation(radioContainer,radioInputs);
                dynamicStatsFormValidation(PHY2);
                dynamicStatsFormValidation(DEF2);
                dynamicStatsFormValidation(SHO2);

                nameInput2.value = el.name;
                radioInputs.forEach(radio => {
                    if(radio.value == el.pos){
                        radio.checked = true;
                    }
                })
                PHY2.value = el.phy;
                DEF2.value = el.def;
                SHO2.value = el.sho;
                
                editForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    console.log("hello")
                    if(inputValidation(nameInput2,"5 letters and more only !")) {
                        var name = nameInput2.value;
                    }
                    let radioInput = document.querySelector('input[name="Position2"]:checked');
                    if(radioInputValidation(radioContainer2,radioInput,"Check one of the above !")){
                        var pos = radioInput.value;
                    }
                    if(inputValidation(PHY2,"1 TO 100 !")) {
                        var phy = PHY2.value;
                    }
                    if(inputValidation(DEF2,"1 TO 100 !")) {
                        var def = DEF2.value;
                    }
                    if(inputValidation(SHO2,"1 TO 100 !")) {
                        var sho = SHO2.value;
                    }
                    if(name && pos && phy && def && sho){
                        this.editPlayer(el.id,name,pos,phy,def,sho);
                        console.log(el);
                        this.renderPlayers();


                        editModal.classList.toggle('invisible');
                        document.body.classList.toggle('overflow-hidden');
                        resetForm(editForm);
                    }
                });
            }
        });
    }
}

const myTeam = new Team();
myTeam.loadFromLS();
myTeam.renderPlayers();
console.log(myTeam);


