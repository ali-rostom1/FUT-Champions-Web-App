

export function Player(name,pos,phy,def,sho,imgPath,rating){
    this.id = new Date().getTime();
    this.name = name;
    this.pos = pos;
    this.phy = phy;
    this.def = def;
    this.sho = sho;
    this.imgPath = imgPath;
    this.rating = rating;
    this.status = 'Bench';
    
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
        let CBcount = 0;
        let CMcount = 0;
        let newArr = this.players.filter((el) => el.status ==='Main');
        newArr.forEach((el)=>{
            switch(el.pos){
                case "LW":
                    this.createTerrainCardAppend(el,terLW);
                    break;
                case "CB":
                    if(CBcount=== 0) {
                        this.createTerrainCardAppend(el,terCBl);
                        CBcount++;
                    }else{
                        this.createTerrainCardAppend(el,terCBr);
                    }
                    break;
                case "LB":
                    this.createTerrainCardAppend(el,terLB);
                    break;
                case "RB":
                    this.createTerrainCardAppend(el,terRB);
                    break;
                case "CDM":
                    this.createTerrainCardAppend(el,terCDM);
                    break;
                case "GK":
                    this.createTerrainCardAppend(el,terGK);
                    break;
                case "RW":
                    this.createTerrainCardAppend(el,terRW);
                    break;
                case "CM":
                    if(CMcount === 0){
                        this.createTerrainCardAppend(el,terCMl);
                        CMcount++;
                    }else{
                        this.createTerrainCardAppend(el,terCMr);
                    }
                    break;
                case "ST":
                    this.createTerrainCardAppend(el,terST);
                    break;
                default:
                    break;
            }
        })
    }
    renderBenchPlayers(){
        playersContainer.innerHTML= "";
        this.players.forEach((el)=>{
            if(el.status ==="Bench"){
                playersContainer.appendChild(this.createBenchCard(el));
                let delbtn = document.getElementById(`${el.id}-del`);
                delbtn.onclick = () =>{
                    this.removePlayer(el);
                    this.renderBenchPlayers();
                }
            }
        })
    }
    renderBenchPlayersBasedOnPos(pos){
        playersContainer.innerHTML = "";
        this.players.forEach((el)=>{
            if(el.status ==="Bench" && el.pos=== pos){
                playersContainer.appendChild(this.createBenchCard(el));
            }
        });
    }
    createTerrainCardAppend(player,terpos){
        let container = terpos.children[0];
        let div = document.createElement('div');
                    div.innerHTML = `
                                     <div class="flex justify-center mb-1">
                                    <img class="h-10 w-10 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-300" src=${player.imgPath} alt="${player.name}">
                                </div> 
                                <h3 class="text-xs font-semibold text-gray-800 mb-1 text-center">${player.name}</h3>
                                <span class="absolute top-[3%] left-[10%] font-bold ${player.rating > 90 ? "text-yellow-400": ""}">${player.rating}</span>
                                <div class="grid grid-cols-3 gap-1 text-xs">
                                    <div class="flex flex-col items-center">
                                        <span class="font-semibold text-gray-700">${player.pos==="GK" ? "DIV" : "PHY"}</span>
                                        <span class="text-sm font-bold text-blue-600">${player.phy}</span>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <span class="font-semibold text-gray-700">${player.pos==="GK" ? "HAN" : "DEF"}</span>
                                        <span class="text-sm font-bold text-blue-600">${player.def}</span>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <span class="font-semibold text-gray-700">${player.pos==="GK" ? "SHO" : "SHO"}</span>
                                        <span class="text-sm font-bold text-blue-600">${player.sho}</span>
                                    </div>
                                </div>
                    `
        if(!container.children[1]){
            container.appendChild(div);
        }
        else{
            container.children[1].remove();
            container.appendChild(div);
        }
    }
    addPlayer(player){
        if(this.checkName(player.name)) return 0;
        else{
            this.players.push(player);
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
                    <p class="text-white text-center">Rating: <span class="font-semibold">${player.rating}</span></p>
                    <p class="text-white text-center">Status: <span class="font-semibold">${player.status}</span></p>
                </div>
                <div class="flex justify-center gap-6">
                    <button class="bg-red-500 text-white px-2 rounded-md" id="${player.id}-del">DEL</button>
                    <button class="bg-sky-600 text-white px-2 rounded-md" id="${player.id}-edit">EDIT</button>
                </div>
                <!-- Player Stats -->
                <div class="px-12 py-4 grid grid-cols-3 gap-4 text-white">
                    <!-- Physical Stats -->
                    <div class="text-center" >
                        <h3 class="text-lg font-semibold">${player.pos==="GK" ? "DIV" : "PHY"}</h3>
                        <p class="text-xl">${player.phy}</p>
                    </div>
                
                    <!-- Defend Stats -->
                    <div class="text-center">
                        <h3 class="text-lg font-semibold">${player.pos==="GK" ? "HAN" : "DEF"}</h3>
                        <p class="text-xl">${player.def}</p>
                    </div>
            
                    <!-- Shoot Stats -->
                    <div class="text-center">
                        <h3 class="text-lg font-semibold">${player.pos==="GK" ? "REF" : "SHO"}</h3>
                        <p class="text-xl">${player.sho}</p>
                    </div>
                </div>
        `;
        return div;
    }
    createBenchCard(player) {
        const div = document.createElement('div');
        div.classList = 'w-full md:w-2/3 rounded-lg shadow-md bg-gray-900 flex flex-col items-center mb-4 p-3 space-y-4';
    
        div.innerHTML = `
            <!-- Player Image -->
            <div class="flex-shrink-0">
                <img 
                    src="${player.imgPath}" 
                    alt="Image of ${player.name}" 
                    class="w-20 h-20 rounded-full object-cover border-4 border-gray-700 shadow-sm"
                />
            </div>
    
            <!-- Player Info -->
            <div class="text-center">
                <h3 class="font-bold text-md text-white">${player.name}</h3>
                <p class="text-xs text-gray-400 mt-1">
                    Position: <span class="font-semibold text-white">${player.pos}</span>
                </p>
                <p class="text-xs text-gray-400">
                    Rating: <span class="font-semibold text-white">${player.rating}</span>
                </p>
                <p class="text-xs text-gray-400">
                    Status: <span class="font-semibold text-white">${player.status}</span>
                </p>
            </div>
    
            <!-- Player Stats -->
            <div class="grid grid-cols-3 gap-2 text-center text-xs text-white w-full">
                <!-- Physical Stats -->
                <div class="flex flex-col items-center">
                    <h3 class="font-semibold">${player.pos === "GK" ? "DIV" : "PHY"}</h3>
                    <p class="text-base font-medium">${player.phy}</p>
                </div>
    
                <!-- Defending Stats -->
                <div class="flex flex-col items-center">
                    <h3 class="font-semibold">${player.pos === "GK" ? "HAN" : "DEF"}</h3>
                    <p class="text-base font-medium">${player.def}</p>
                </div>
    
                <!-- Shooting Stats -->
                <div class="flex flex-col items-center">
                    <h3 class="font-semibold">${player.pos === "GK" ? "REF" : "SHO"}</h3>
                    <p class="text-base font-medium">${player.sho}</p>
                </div>
            </div>
    
            <!-- Action Buttons -->
            <div class="flex justify-center w-full">
                <button 
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium shadow-sm transition duration-200"
                    id="${player.id}-del"
                >
                    Delete
                </button>
            </div>
        `;
    
        return div;
    }
    
    
    createOptionsCard(player){
        let div = document.createElement('div');
        div.classList = "bg-white shadow-md rounded-lg border border-gray-200 p-1 w-20 sm:w-20  lg:w-28 hover:scale-105 transition-transform duration-300 ease-in-out h-[50%]";
        div.innerHTML = `
                            <div class="text-sm font-bold text-red-700 text-center">${player.rating}</div>
                            <div class="flex justify-center mb-1">
                                    <img class="h-10 w-10 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-300" src=${player.imgPath} alt="${player.name}">
                                </div> 
                                <h3 class="text-xs font-semibold text-gray-800 mb-1 text-center">${player.name}</h3>
                                <div class="grid grid-cols-3 gap-1 text-xs">
                                    <div class="flex flex-col items-center">
                                        <span class="font-semibold text-gray-700">${player.pos==="GK" ? "DIV" : "PHY"}</span>
                                        <span class="text-sm font-bold text-blue-600">${player.phy}</span>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <span class="font-semibold text-gray-700">${player.pos==="GK" ? "HAN" : "DEF"}</span>
                                        <span class="text-sm font-bold text-blue-600">${player.def}</span>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <span class="font-semibold text-gray-700">${player.pos==="GK" ? "SHO" : "SHO"}</span>
                                        <span class="text-sm font-bold text-blue-600">${player.sho}</span>
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
                this.renderPlayersPage();
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
                this.dynamicNameFormValidation(nameInput2);
                this.dynamicRadioFormValidation(radioContainer,radioInputs);
                this.dynamicStatsFormValidation(PHY2);
                this.dynamicStatsFormValidation(DEF2);
                this.dynamicStatsFormValidation(SHO2);

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
                    if(this.inputNameValidation(nameInput2,"5 letters and more only !")) {
                        var name = nameInput2.value;
                    }
                    let radioInput = document.querySelector('input[name="Position2"]:checked');
                    if(this.radioInputValidation(radioContainer2,radioInput,"Check one of the above !")){
                        var pos = radioInput.value;
                    }
                    if(this.inputStatsValidation(PHY2,"1 TO 100 !")) {
                        var phy = PHY2.value;
                    }
                    if(this.inputStatsValidation(DEF2,"1 TO 100 !")) {
                        var def = DEF2.value;
                    }
                    if(this.inputStatsValidation(SHO2,"1 TO 100 !")) {
                        var sho = SHO2.value;
                    }
                    if(name && pos && phy && def && sho){
                        this.editPlayer(el.id,name,pos,phy,def,sho);
                        this.renderPlayersPage();


                        editModal.classList.toggle('invisible');
                        document.body.classList.toggle('overflow-hidden');
                        this.resetEditForm(editForm);
                    }
                });
            }
        });
    }
    dynamicNameFormValidation(input){
        input.addEventListener('input', () =>{
            if(input.value != "" && input.value.length > 5 && /^[A-Za-z\s]+$/.test(input.value)){
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
    dynamicRadioFormValidation(container,radioInputs){
        radioInputs.forEach(radio => {
            radio.addEventListener('change',function(){
                if(container.lastChild.classList == 'text-red-600') container.lastChild.remove();
            });
        });
    }
    dynamicStatsFormValidation(input){
        input.addEventListener('input', function(){
            if(input.value != "" && parseInt(input.value)<=100 && parseInt(input.value)>0){
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
    
    inputNameValidation(input,error){
        if(/^[A-Za-z\s]+$/.test(input.value)){
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
    inputStatsValidation(input,error){
        if(parseInt(input.value)<=100){
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
    radioInputValidation(container,input,error){
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
    noNumberString(string){
        for(let i=0;i<string.length;i++){
            if(string[i] >= '0' && string[i]<= '9'){
                return 0;
            }
        }
        return 1;
    }
    resetEditForm(form){
        nameInput2.classList.remove('border-green-600','outline-none','border-red-600','border-2'); //name input reset
        if(nameInput2.nextElementSibling) nameInput2.nextElementSibling.remove();
    
        if(radioContainer2.lastChild.classList == 'text-red-600') radioContainer2.lastChild.remove();
    
        PHY2.classList.remove('border-green-600','outline-none','border-red-600','border-2');
        if(PHY2.nextElementSibling) PHY2.nextElementSibling.remove();
    
        DEF2.classList.remove('border-green-600','outline-none','border-red-600','border-2');
        if(DEF2.nextElementSibling) DEF2.nextElementSibling.remove();
    
        SHO2.classList.remove('border-green-600','outline-none','border-red-600','border-2');
        if(SHO2.nextElementSibling) SHO2.nextElementSibling.remove();
        
        errorMsg2.innerText = "";
        form.reset();
    }

    checkName(name){
        for(let el of this.players){
            if(el.name === name) return 1;
        }
        return 0;
    }
    changePlayerStatus(player){
        player.status = player.status==='Main' ? 'Bench' : 'Main';
        this.saveToLS();
    }
    loadJSON(){
        fetch('assets/data/players.json')
            .then(res => res.json())
            .then(data => {
                data.players.forEach((el)=>{
                    let player;
                    if(el.position === 'GK'){
                        player = new Player(el.name,el.position,el.diving,el.handling,el.reflexes,el.photo,el.rating);
                    }else{
                        player = new Player(el.name,el.position,el.physical,el.defending,el.shooting,el.photo,el.rating);
                    }
                    this.addPlayer(player)
                    this.saveToLS();
                    this.renderBenchPlayers();
                    this.renderPlayersInTerrain();
            })
        });
    }
}


