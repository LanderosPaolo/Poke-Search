document.getElementById('btnSearch').addEventListener('click', () => {
    let pokeDiv = document.getElementById('showPoke');
    let pokeInput = document.getElementById('pokeInput');
    let color;
    let letter;
    if(pokeInput.value === "") {
        alert('Ingresa el nombre de un Pokémon');
        return;
    }
    async function getPoke(pokeName) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
        const res = await fetch(url);
        const responsePoke = await res.json();
        const pokemonImg = responsePoke.sprites.front_default;
        const pokemonName = responsePoke.name;
        const pokemonId = responsePoke.id;
        let pokemonType = responsePoke.types[0].type.name;
        color = colors[pokemonType];
        if(pokemonType === 'fire' || pokemonType === 'poison' || pokemonType === 'water' || pokemonType === 'bug' || pokemonType === 'fighting' || pokemonType === 'psychic' || pokemonType === 'rock' || pokemonType === 'ghost' || pokemonType === 'dragon' || pokemonType === 'dark'){
            letter = '#fff'
        } else {
            letter = '#000'
        }
        let showImg = '';
        showImg += `<h3>${pokemonName}</h3>
                    <p class="type" style="background:${color}; color:${letter}">${pokemonType}</p>
                    <img class="pokeImg" src="${pokemonImg}" alt="poke-${pokeName}">
                    <p class="number">N° Pokédex: ${pokemonId}</p>
                    <h2 class="stats">Base Stats</h2>
                    <canvas id="myChart"></canvas>`
        pokeDiv.innerHTML = showImg;
        pokeInput.value = "";
        const data = responsePoke.stats.map((baseStats) => {
            return baseStats.base_stat;
        })

        const labels = responsePoke.stats.map((statName) => {
            const poder = statName.stat.name.split(" ")[0];
            return poder;
        })  
        
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: "polarArea",
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        "rgba(255, 0, 0, 0.5)",
                        "rgb(0, 255, 0, 0.5)",
                        "rgb(0, 0, 255, 0.5)",
                        "rgb(255, 255, 0, 0.5)",
                        "rgb(128, 0, 128, 0.5)",
                        "rgb(128, 128, 128, 0.5)"
                    ]
                }]
            }
        })
    }
    getPoke(pokeInput.value.toLowerCase())
})