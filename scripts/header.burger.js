let menuBtn = document.querySelector('.burger__btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function () {
    menu.classList.toggle('active');
})

let menuActive = document.querySelector('.menu__section');
menuActive.addEventListener('click', function () {
    menu.classList.toggle('active');
})
// function openModal() {
//     document.getElementById("result_window").style.display = "flex"
// }
//
// function closeModal() {
//     document.getElementById("result_window").style.display = "none"
// }

