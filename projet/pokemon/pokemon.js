// Classe CSS de la carte selon le type principal (noms renvoyés par Tyradex)
const TYPE_CLASSES = {
  "Normal": "normal",
  "Feu": "feu",
  "Eau": "eau",
  "Plante": "plante",
  "Électrik": "electrik",
  "Glace": "glace",
  "Combat": "combat",
  "Poison": "poison",
  "Sol": "sol",
  "Vol": "vol",
  "Psy": "psy",
  "Insecte": "insecte",
  "Roche": "roche",
  "Spectre": "spectre",
  "Dragon": "dragon",
  "Ténèbres": "tenebres",
  "Acier": "acier",
  "Fée": "fee",
};

const STATS = [
  { label: "HP", key: "hp" },
  { label: "ATTACK", key: "atk" },
  { label: "DEFENSE", key: "def" },
  { label: "SPEED", key: "vit" },
];

// Tyradex (API Pokémon en français) : les noms doivent être envoyés sans accents
const normalizeName = (name) =>
  String(name)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const fetchPokemon = async (pokemon) => {
  const res = await fetch(`https://tyradex.app/api/v1/pokemon/${encodeURIComponent(normalizeName(pokemon))}`);
  const data = await res.json();
  if (!res.ok || data.status) return null;
  return data;
};

const buildCard = (data) => {
  const types = data.types || [];
  const mainType = types.length ? TYPE_CLASSES[types[0].name] || "normal" : "normal";
  const nextEvolution = data.evolution && data.evolution.next ? data.evolution.next[0] : null;

  const typesHTML = types
    .map((type) => `<img class="type-icon" src="${type.image}" alt="${type.name}" title="${type.name}" />`)
    .join("");

  const statsHTML = STATS.map(({ label, key }) => {
    const value = data.stats[key];
    const percent = Math.min(100, Math.round((value / 160) * 100));
    return `
      <div class="stat-row">
        <span class="stat-label">${label}</span>
        <span class="stat-value">${value}</span>
        <div class="stat-bar"><div class="stat-fill" style="width:${percent}%"></div></div>
      </div>`;
  }).join("");

  const evolutionHTML = nextEvolution
    ? `<p class="evolution">Évolution <button type="button" class="evolution-link">${nextEvolution.name}</button></p>`
    : "";

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-front card-type-${mainType}">
      <div class="card-header">
        <span class="card-name">${data.name.fr}</span>
        <span class="card-types">${typesHTML}</span>
      </div>
      <div class="img-pokemon">
        <img src="${data.sprites.regular}" alt="${data.name.fr}" />
      </div>
      <div class="stat-pokemon">${statsHTML}</div>
      ${evolutionHTML}
    </div>
  `;

  // Effet 3D qui suit la souris
  card.addEventListener("mousemove", (e) => {
    if (card.classList.contains("card-rotate")) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    card.style.transform = `rotateX(${(y - 0.5) * -20}deg) rotateY(${(x - 0.5) * 20}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

  // Clic sur la carte : rotation
  card.addEventListener("click", () => {
    card.style.transform = "";
    card.classList.toggle("card-rotate");
  });

  // Clic sur l'évolution : remplace la carte par celle de l'évolution
  const evolutionLink = card.querySelector(".evolution-link");
  if (evolutionLink) {
    evolutionLink.addEventListener("click", async (e) => {
      e.stopPropagation();
      const evolution = await fetchPokemon(nextEvolution.pokedex_id);
      if (evolution) card.replaceWith(buildCard(evolution));
    });
  }

  return card;
};

const getData = async (pokemonName) => {
  try {
    const input = document.getElementById("nomPokemon");
    const pokemon = pokemonName || input.value;
    if (!String(pokemon).trim()) return;

    const data = await fetchPokemon(pokemon);
    if (!data) {
      console.log("Pokémon introuvable :", pokemon);
      return;
    }

    // La dernière carte recherchée s'affiche en premier
    document.querySelector(".card-container").prepend(buildCard(data));
  } catch (err) {
    console.log(err);
  }
};
