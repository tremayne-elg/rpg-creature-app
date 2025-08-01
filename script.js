const search_input = document.getElementById('search-input');
const search_button = document.getElementById('search-button');

const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const special_attack = document.getElementById('special-attack');
const special_defense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const creature_name = document.getElementById('creature-name');
const creature_id = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const special = document.getElementById('special');
const special_desc = document.getElementById('special-desc');

async function allCreatures() {
  try {
    const response = await fetch('https://rpg-creature-api.freecodecamp.rocks/api/creatures');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching creatures:', error);
    return null;
  }
}

async function searchClick() {
  const value = search_input.value.trim();
  const api = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${
    /^\d+$/.test(value)
      ? value
      : value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }`;
  const data = await specificCreature(api);
  if (!data) {
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    special_attack.textContent = '';
    special_defense.textContent = '';
    speed.textContent = ''
    creature_name.textContent = '';
    creature_id.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.innerHTML = '';
    special.textContent = '';
    special_desc.textContent = '';
    alert('Creature not found');
    return null;
  }
  return data;
}

async function specificCreature(api) {
  try {
    const response = await fetch(api);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching creature:', error);
    return null;
  }
}

async function specificCreatureData() {
  const creature_data = await searchClick();
  if (!creature_data) return;

  const getStat = (name) =>
    creature_data.stats.find((stat) => stat.name === name)?.base_stat || 'N/A';

  hp.textContent = getStat("hp");
  attack.textContent = getStat("attack");
  defense.textContent = getStat("defense");
  special_attack.textContent = getStat("special-attack");
  special_defense.textContent = getStat("special-defense");
  speed.textContent = getStat("speed");

  creature_name.textContent = creature_data.name.toUpperCase();
  creature_id.textContent = `#${creature_data.id}`;
  weight.textContent = `Weight: ${creature_data.weight}`;
  height.textContent = `Height: ${creature_data.height}`;

  types.innerHTML = '';
  creature_data.types.forEach(typeObj => {
    types.innerHTML += `<p class="type-container">${typeObj.name.toUpperCase()}</p>`;
  });

  special.textContent = creature_data.special.name;
  special_desc.textContent = creature_data.special.description;
}

search_button.addEventListener('click', specificCreatureData);
