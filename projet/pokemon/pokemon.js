const getData = async (pokemonName) => {
  try {

    let pokemon = pokemonName;
    if(!pokemon){

      let inputPokemon = document.getElementById("nomPokemon");
      pokemon = inputPokemon.value;

    }


    console.log(pokemon);

    const res = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon}`);
    const data = await res.json();


     console.log(data);
     let evolutionName = "";
     if (data.apiEvolutions && data.apiEvolutions.length > 0) {
       evolutionName = data.apiEvolutions[0].name;
       console.log("Évolution:", evolutionName);
     } else {
       console.log("Pas d'évolution");
     }

    const newDiv = document.createElement('div');

    console.log("Taille du array ", data.apiTypes.length);

    for (i = 0; i < data.apiTypes.length; i++) {

/*       let poketype = [];
 */
      /* const count = poketype.push(data.apiTypes[i].name); */

      /* console.log("Poketype  ", poketype); */

      if (data.apiTypes[i].name == "Feu") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-feu',
        
        );
      }


      else if (data.apiTypes[i].name == "Eau") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-eau'
        );
      }

      else if (data.apiTypes[i].name == "Herbe") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-herbe'
        );
      }

      else if (data.apiTypes[i].name == "Électrik") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-elec'
        );
      }

      else if (data.apiTypes[i].name == "Psy") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-psy'
        );
      }

      else if (data.apiTypes[i].name == "Obscure") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-obscure'
        );
      }

      else if (data.apiTypes[i].name == "Dragon") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-dragon'
        );
      }

      else if (data.apiTypes[i].name == "Poison") {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-poison'
        );
      }

      else {

        newDiv.classList.add(
          'block',
          'max-w-[18rem]',
          'rounded-lg',
          'text-left',
          'text-surface',
          'shadow-secondary-1',
          'dark:bg-surface-dark',
          'dark:text-black',
          'mx-auto',
          'my-10',
          'card-front',
          'card-pokemon-normal'
        );
      }


    }


  let evolutionHTML = "";

  if (data.apiEvolutions && data.apiEvolutions.length > 0) {
    evolutionName = data.apiEvolutions[0].name;
    console.log("Évolution:", evolutionName);

    evolutionHTML = `<p style="font-size:12px;">
      Évolution <span id="evolutionName" style="color:#0032de; cursor:pointer;">${evolutionName}</span>
    </p>`;
  } else {
    console.log("Pas d'évolution");
  }


  let typesHTML = "";
data.apiTypes.forEach(type => {
  let emoji = "";

  switch (type.name) {
    case "Feu": emoji = "🔥"; break;
    case "Eau": emoji = "💧"; break;
    case "Plante": emoji = "🌿"; break;
    case "Électrik": emoji = "⚡"; break;
    case "Roche": emoji = "🪨"; break;
    case "Psy": emoji = "🔮"; break;
    case "Ténèbres": emoji = "🌑"; break;
    case "Insecte": emoji = "🐛"; break;
    case "Vol": emoji = "🕊️"; break;
    case "Sol": emoji = "🌍"; break;
    case "Fée": emoji = "✨"; break;
    case "Acier": emoji = "⚙️"; break;
    case "Glace": emoji = "❄️"; break;
    case "Poison": emoji = "☠️"; break;
    case "Dragon": emoji = "🐉"; break;
    case "Combat": emoji = "🥊"; break;
    case "Spectre": emoji = "👻"; break;
    case "Normal": emoji = "🔘"; break;
    default: emoji = "❓";
  }

  typesHTML += `<span title="${type.name}" class="ml-2">${emoji}</span>`;
});





    newDiv.innerHTML = `
        <div class="p-6">
        <div class="mb-1 font-medium leading-tight flex justify-between items-center">
        <span>${data.name}</span>
        <span class="flex gap-1">${typesHTML}</span>
      </div>
        <div class="img-pokemon">
        <img src="${data.image}" alt="${data.name}" />
        </div>
        
        <div class="stat-pokemon my-5 flex flex-row">
        <div class="flex-col ml-2 justify-start mt-2">
          <p>HP</p>
          <p>ATTACK</p>
          <p>DEFENSE</p>
          <p>SPEED</p>
    
        </div>
    
        <div style="margin-left: 4rem;" class="flex-col justify-end italic mt-2">
          <p>${data.stats.HP}</p>
          <p>${data.stats.attack}</p>
          <p>${data.stats.defense}</p>
          <p>${data.stats.speed}</p>
        </div>
    
        
    
       </div>

       ${evolutionHTML}    
    
      </div>





    `;

    const evolutionSpan = newDiv.querySelector('#evolutionName');
    if (evolutionSpan) {
      evolutionSpan.addEventListener('click', () => {
        newDiv.innerHTML= "";
        card.remove();
        getData(evolutionName);

      });
    }
    


    const card = document.createElement("div");
    const contain = document.querySelector('.card-container');
    card.classList.add('card');
    card.setAttribute("id","card")
    contain.appendChild(card);
    card.appendChild(newDiv);


    card.addEventListener('mousemove', (e) => {
      const { offsetWidth: width, offsetHeight: height } = card;
      const { offsetX: x, offsetY: y } = e;

      const rotateX = ((y / height) - 0.5) * -20;
      const rotateY = ((x / width) - 0.5) * 20;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    const cardContainer = document.querySelector('.card-container');
    cardContainer.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    card.addEventListener("click", () =>{

      if(card.classList.contains("card-rotate")){
        card.classList.remove("card-rotate");
      }

      else{
        card.classList.add("card-rotate");
      }
    })

  }

  catch (err) {
    console.log(err);
  }
}


