

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
})