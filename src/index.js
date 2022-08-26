import getRandomNumber from "./utils/getRandomNumber.js";
import petsData from "./utils/petsData.js";

const hipodogeImg = '../assets/mokepons_mokepon_hipodoge_attack.png';
const capipepoImg = '../assets/mokepons_mokepon_capipepo_attack.png';
const ratigueyaImg = '../assets/mokepons_mokepon_ratigueya_attack.png';

const optionsContainer = document.querySelector('#optionsContainer');

const btnAttackFire = document.querySelector('#buttonAttackFire');
const btnAttackWater = document.querySelector('#buttonAttackWater');
const btnAttackEarth = document.querySelector('#buttonAttackEarth');

const selectAttackSection = document.querySelector('#selectAttack');

const btnRestartSection = document.querySelector('#restart');

const playerLivesMessage = document.querySelector('#playerLives');
const opponentLivesMessage = document.querySelector('#opponentLives');

const playerPet = document.querySelector('#playerPet');

const opponentPet = document.querySelector('#opponentPet');

const resultMessage = document.querySelector('#result');
const playerAttacks = document.querySelector('#playerAttacks');
const opponentAttacks = document.querySelector('#opponentAttacks');

const petsNodesList = document.getElementsByName('pet');
const btnSelectPet = document.querySelector('#buttonSelectPet');
const btnRestart = document.querySelector('#buttonRestart');

const mokepones = [];
const player = {
  lives: 3,
};
const opponent = {
  lives: 3,
};

class Mokepon {
  constructor(name, image, lives, id) {
    this.name = name;
    this.image = image;
    this.lives = lives;
    this.attacks = [];
    this.id = id;
  }
}

const hipodoge = new Mokepon('Hipodoge', hipodogeImg, 3, 'hipodoge');

const capipepo = new Mokepon('Capipepo', capipepoImg, 3, 'capipepo');

const ratigueya = new Mokepon('Ratigueya', ratigueyaImg, 3, 'ratigueya');

hipodoge.attacks.push(
  { name: '💧', id: 'buttonAttackWater' },
  { name: '💧', id: 'buttonAttackWater' },
  { name: '💧', id: 'buttonAttackWater' },
  { name: '🔥', id: 'buttonAttackFire' },
  { name: '🌱', id: 'buttonAttackEarth' },
);
capipepo.attacks.push(
  { name: '🌱', id: 'buttonAttackEarth' },
  { name: '🌱', id: 'buttonAttackEarth' },
  { name: '🌱', id: 'buttonAttackEarth' },
  { name: '💧', id: 'buttonAttackWater' },
  { name: '🔥', id: 'buttonAttackFire' },
);
ratigueya.attacks.push(
  { name: '🔥', id: 'buttonAttackFire' },
  { name: '🔥', id: 'buttonAttackFire' },
  { name: '🔥', id: 'buttonAttackFire' },
  { name: '🌱', id: 'buttonAttackEarth' },
  { name: '💧', id: 'buttonAttackWater' },
);

mokepones.push(hipodoge, capipepo, ratigueya);

function combat(player, opponent) {

  let result;
  if (player.attack === opponent.attack) {
    result = 'EMPATE';
  }
  else if ((player.attack === 'FUEGO' && opponent.attack === 'TIERRA') || (player.attack === 'AGUA' && opponent.attack === 'FUEGO') || (player.attack === 'TIERRA' && opponent.attack === 'AGUA')) {
    opponent.lives--;
    result = 'GANASTE!!!';
  }
  else {
    player.lives--;
    result = 'PERDISTE :(';
  }
  playerLivesMessage.innerText = player.lives;
  opponentLivesMessage.innerText = opponent.lives;

  return result;
}


// SELECCIONAR MASCOTA DEL USUARIO
function selectPlayerPet(petsNodesList) {  
  const petsList = [...petsNodesList];

  const selectedPet = petsList.find(pet => pet.checked);

  if (selectedPet) {
    playerPet.innerText = selectedPet.id.toUpperCase()
    opponent.name = selectOpponentPet();
    hideAndShowNode(selectAttackSection, 'flex');
    hideAndShowNode(document.querySelector('#selectPet'), 'none');
    return selectedPet.id.toUpperCase();
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
      return 'TIERRA';
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
  const random = getRandomNumber(0, 2);

  const randomPet = petsData.slice(random, random + 1);

  opponentPet.innerText = randomPet[0].name.toUpperCase();
  return randomPet[0].name.toUpperCase();
}


// MOSTRAR MENSAJE
function createMessage() {
  const newPlayerAttack = document.createElement('p'); 
  const newOpponentAttack = document.createElement('p');
  newPlayerAttack.classList.add('status--game__attack');
  newOpponentAttack.classList.add('status--game__attack');

  newPlayerAttack.innerText = player.attack;
  newOpponentAttack.innerText = opponent.attack;

  playerAttacks.appendChild(newPlayerAttack);
  opponentAttacks.appendChild(newOpponentAttack);

  const result = combat(player, opponent);

  if (player.lives > 0 && opponent.lives > 0) {
    resultMessage.innerText = result;
  } else {
    resultMessage.innerText = combatResult();
  }
}


// VERIFICACION DEL RESULTADO DELCOMBATE
function combatResult() {

  if (opponent.lives === 0 || player.lives === 0) {
    btnAttackFire.disabled = true;
    btnAttackWater.disabled = true;
    btnAttackEarth.disabled = true;
    hideAndShowNode(btnRestartSection, 'flex');
  }

  if (opponent.lives === 0) {
    return 'GANASTE!!! 🎉';
  } else if (player.lives === 0) {
    return 'Lo siento, perdiste :(';
  }
}

// REINICIAR JUEGO
function restartGame() {
  location.reload();
}


// FUNCIONES PARA MOSTRAR O DESAPARECER PARTES DE LA UI
function hideAndShowNode(node, display) {
  node.style.display = display;
}


// Template HTML
function MokeponItem(mokepon) {
  return (/*html*/`
    <label for="${mokepon.id}">
      <p>${mokepon.name}</p>
      <img src="${mokepon.image}" alt="${mokepon.image}">
      <input type="radio" name="pet" id="${mokepon.id}"/>
    </label>
  `);
}


// INICIO DEL JUEGO
function startGame() {
  hideAndShowNode(selectAttackSection, 'none');
  hideAndShowNode(btnRestartSection, 'none');

  mokepones.forEach(mokepon => {
    const card = document.createRange()
      .createContextualFragment(MokeponItem(mokepon))
    optionsContainer.append(card);
  })

  petsNodesList.forEach(item => {
    item.parentNode.onclick = () => {
      if(item.checked) {
        item.parentNode.classList.add('selected');
      }
      petsNodesList.forEach(item => {
        if(!item.checked) {
          item.parentNode.classList.remove('selected');
        }
      });
    }
  });

  btnSelectPet.onclick = () => {
    player.name = selectPlayerPet(petsNodesList);
  };

  btnAttackFire.onclick = () => attackPlayer('FUEGO');
  btnAttackWater.onclick = () => attackPlayer('AGUA');
  btnAttackEarth.onclick = () => attackPlayer('TIERRA');

  btnRestart.onclick = restartGame;
}

window.onload = startGame;