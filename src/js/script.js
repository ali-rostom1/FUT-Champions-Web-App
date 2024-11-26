

mobileMenuToggle.addEventListener('click', function (){
    mobileMenu.classList.toggle('hidden');
});

closeModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
    addForm.reset();
});
openModalBtn.addEventListener('click', function(){
    myModal.classList.toggle('invisible');
    document.body.classList.toggle('overflow-hidden');
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

