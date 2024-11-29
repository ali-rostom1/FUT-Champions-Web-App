

export function Player(name,pos,phy,def,sho){
    this.id = new Date().getTime();
    this.name = name;
    this.pos = pos;
    this.phy = phy;
    this.def = def;
    this.sho = sho;
}

 export class Team {
    constructor() {
        this.players = [];
        this.formation = "4-3-3";
    }
    renderPlayersPage(){
        playerCardsContainer.innerHTML = "";
        for(let el of this.players){
            playerCardsContainer.appendChild(this.createCard(el));
        }
        this.updatePlayersCounter();
        this.delBtnsRender();
        this.editBtnsRender();
    }
    renderPlayersInTerrain(){
        this.players.forEach((el)=>{
            switch(el.pos){
                case "LW":
                    this.createTerrainCardAppend(el,terLW);
                    break;
                case "CB":
                    
                    this.createTerrainCardAppend(el,terCBl);
                default:
                    break;
            }
        })
    }
    createTerrainCardAppend(player,terpos){
        let container = terpos.children[0];
        console.log(container);
        let div = document.createElement('div');
                    div.innerHTML = `
                                    <h3 class="text-md font-semibold text-gray-800 mb-2">${player.name}</h3>
                                <div class="grid grid-cols-3 gap-2 text-sm">
                                    <div class="flex flex-col items-center">
                                        <span class="font-bold text-gray-700">PHY</span>
                                        <span class="text-blue-600">${player.phy}</span>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <span class="font-bold text-gray-700">DEF</span>
                                        <span class="text-blue-600">${player.def}</span>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <span class="font-bold text-gray-700">SHO</span>
                                        <span class="text-blue-600">${player.sho}</span>
                                    </div>
                                </div>
                    `
        if(!container.children[1]){
            container.appendChild(div);
        }
        else{
            container.lastChild.remove();
            container.appendChild(div);
        }
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
            this.renderPlayersPage();
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