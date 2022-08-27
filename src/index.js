import getRandomNumber from "./utils/getRandomNumber.js";
import petsData from "./utils/petsData.js";

const hipodogeImg = '../assets/mokepons_mokepon_hipodoge_attack.png';
const capipepoImg = '../assets/mokepons_mokepon_capipepo_attack.png';
const ratigueyaImg = '../assets/mokepons_mokepon_ratigueya_attack.png';

const optionsContainer = document.querySelector('#optionsContainer');

const ButtonsAttacksContainer = document.querySelector('#ButtonsAttacksContainer');
let btnAttackFire;
let btnAttackWater;
let btnAttackEarth;

let butonAttack;

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

let player;
let opponent;

class Mokepon {
  constructor(name, image, lives) {
    this.name = name;
    this.image = image;
    this.lives = lives;
    this.attacks = [];
  }
}

const hipodoge = new Mokepon('Hipodoge', hipodogeImg, 3);

const capipepo = new Mokepon('Capipepo', capipepoImg, 3);

const ratigueya = new Mokepon('Ratigueya', ratigueyaImg, 3);

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
  else if ((player.attack === '🔥' && opponent.attack === '🌱') || (player.attack === '💧' && opponent.attack === '🔥') || (player.attack === '🌱' && opponent.attack === '💧')) {
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
    const mokepon = mokepones.find(mokepon => mokepon.name === selectedPet.id);
    player = {...mokepon};
    playerPet.innerText = player.name.toUpperCase();
    selectOpponentPet();
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
      return '🔥';
    case 2:
      return '💧';
    default:
      return '🌱';
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
  const random = getRandomNumber(0, mokepones.length - 1);

  const randomPet = mokepones[random];
  opponent = {...randomPet};
  console.log(opponent.attacks)
  opponentPet.innerText = opponent.name.toUpperCase();
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


// Templates HTML
function MokeponItem(mokepon) {
  return (/*html*/`
    <label for=${mokepon.name}>
      <p>${mokepon.name}</p>
      <img src=${mokepon.image} alt=${mokepon.image} />
      <input type="radio" name="pet" id=${mokepon.name} />
    </label>`
  );
}


function showAttacks() {
  const buttons = player.attacks.map(attack => {
    const button = document.createElement('button');
    button.id = attack.id;
    button.classList.add('button-attack');
    button.innerText = attack.name;
    button.onclick = () => attackPlayer(attack.name);
    // falta agregar la validacion para dsabilitar los botones
    return button
  });
  buttons.forEach(button => {
    ButtonsAttacksContainer.append(button)
  })
  console.log(buttons)

  // btnAttackFire = document.querySelector('#buttonAttackFire');
  // btnAttackWater = document.querySelector('#buttonAttackWater');
  // btnAttackEarth = document.querySelector('#buttonAttackEarth');
  // btnAttackFire.onclick = () => attackPlayer('FUEGO');
  // btnAttackWater.onclick = () => attackPlayer('AGUA');
  // btnAttackEarth.onclick = () => attackPlayer('TIERRA');
}
// INICIO DEL JUEGO
(() => {
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
    selectPlayerPet(petsNodesList);
    showAttacks();
  };



  btnRestart.onclick = restartGame;
})();