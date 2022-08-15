import getRandomNumber from "./utils/getRandomNumber.js";
import petsData from "./utils/petsData.js";

const player = {};
const opponent = {};



function combat(player, opponent) {
  if (player.attack === opponent.attack) {
    return 'EMPATE';
  }
  else if ((player.attack === 'FUEGO' && opponent.attack === 'TIERRA') || (player.attack === 'AGUA' && opponent.attack === 'FUEGO') || (player.attack === 'TIERRA' && opponent.attack === 'AGUA')) {
    return 'GANASTE!!!';
  }
  else {
    return 'PERDISTE :(';
  }
}


// SELECCIONAR MASCOTA DEL USUARIO
function selectPlayerPet() {
  const playerPet = document.querySelector('#playerPet');

  const petsNodesList = document.getElementsByName('pet');
  const petsList = [...petsNodesList];

  const selectPet = petsList.find(pet => pet.checked);

  if (selectPet) {
    playerPet.innerText = selectPet.id.toUpperCase()
    opponent.name = selectOpponentPet();
    return selectPet.id.toUpperCase();
  }
  alert('No has seleccionado una mascota');
}


// ATAQUE ALEATORIO DEL OPONENTE
function opponentAttack() {
  const attackRandom = getRandomNumber(1, 3);
  switch (attackRandom) {
    case 1:
      return 'FUEGO';
    case 2:
      return 'AGUA';
    default:
      return 'TIERRA'
  }
}


// ATAQUES DEL JUGADOR
function attackPlayer(attack) {
  player.attack = attack;
  opponent.attack = opponentAttack();
  createMessage();
}


// SELECCIONAR MASCOTA ALEATORIA
function selectOpponentPet() {
  const opponentPet = document.querySelector('#opponentPet');

  const random = getRandomNumber(0, 5);

  const randomPet = petsData.slice(random, random + 1);
  
  opponentPet.innerText = randomPet[0].name.toUpperCase();
  return randomPet[0].name.toUpperCase();
}


// MOSTRAR MENSAJE
function createMessage() {
  const messageContainer = document.querySelector('#messages');

  const result = combat(player, opponent);

  const message = document.createElement('p');
  message.innerText = `Tu mascota atacó con ${player.attack}
    la mascota de tu oponente atacó con ${opponent.attack}
    ${result}
  `
  messageContainer.appendChild(message);
}



// INICIO DEL JUEGO
function startGame() {
  const btnSelectPet = document.querySelector('#buttonSelectPet');
  const btnAttackFire = document.querySelector('#buttonAttackFire');
  const btnAttackWater = document.querySelector('#buttonAttackWater');
  const btnAttackEarth = document.querySelector('#buttonAttackEarth');

  btnSelectPet.onclick = () => player.name = selectPlayerPet();

  btnAttackFire.onclick = () => attackPlayer('FUEGO');
  btnAttackWater.onclick = () => attackPlayer('AGUA');
  btnAttackEarth.onclick = () => attackPlayer('TIERRA');
}

window.onload = startGame;