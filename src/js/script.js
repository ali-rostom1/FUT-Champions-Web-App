import {Team , Player} from './team.js';

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
});

const myteam = new Team();

myteam.loadFromLS();

myteam.renderPlayersInTerrain();