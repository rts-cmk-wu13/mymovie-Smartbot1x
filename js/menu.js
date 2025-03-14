/* document.addEventListener('DOMContentLoaded', () => {
  let wrapperMenu = document.querySelector('.wrapper-menu');
  if (wrapperMenu) {
      wrapperMenu.addEventListener('click', function() {
          wrapperMenu.classList.toggle('open');  
          console.log("clicked");
      });
  } else {
      console.error("");
  }
}); */

function BurgerMenu() {
  let wrapperMenu = document.querySelector('.wrapper-menu');
  if (wrapperMenu) {
      wrapperMenu.addEventListener('click', function() {
          wrapperMenu.classList.toggle('open');  
          console.log("clicked");
      });
  } else {
      console.error("not found");
  }
}