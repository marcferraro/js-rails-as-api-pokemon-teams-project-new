const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function main(){
    console.log("I wanna be the very best")
    fetchTrainers()
    addClickListener()
}

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
}

function renderTrainer(trainer){
    // const container = document.getElementById('trainer-container')
    const main = document.querySelector("main")
    const divNode = document.createElement('div')
    divNode.className = "card"
    divNode.dataset.id = trainer.id

    const pNode = document.createElement('p')
    pNode.innerText = trainer.name

    const buttonNode = document.createElement('button')
    buttonNode.innerText = "Add Pokemon"
    buttonNode.dataset.trainerId = trainer.id
    buttonNode.id = "add-pokemon"

    const ulNode = document.createElement('ul')
    
    trainer.pokemon.forEach(pokemon => {
        const liNode = document.createElement('li')
        liNode.innerText = `${pokemon.nickname} (${pokemon.species})`

        const buttonReleaseNode = document.createElement('button')
        buttonReleaseNode.innerText = 'Release'
        buttonReleaseNode.className = 'release'
        buttonReleaseNode.dataset.pokemonId = pokemon.id
        
        liNode.append(buttonReleaseNode)
        ulNode.append(liNode)
    })

    divNode.append(pNode, buttonNode, ulNode)
    main.append(divNode)
}


function addClickListener(){
    const mainNode = document.querySelector('main')

    mainNode.addEventListener('click', function(e){
        e.preventDefault

        if (e.target.id === "add-pokemon"){
            // console.log("add pokemon")

            const trainerId = {trainer_id: e.target.dataset.trainerId}

            const reqObj = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trainerId)
                
            }

            fetch(POKEMONS_URL, reqObj)
            .then(resp => resp.json())
            .then(pokemon => {
                // debugger
                if (!pokemon.message){
                    const ulNode = e.target.nextElementSibling
                    
                    const liNode = document.createElement('li')
                    liNode.innerText = `${pokemon.nickname} (${pokemon.species})`
            
                    const buttonReleaseNode = document.createElement('button')
                    buttonReleaseNode.innerText = 'Release'
                    buttonReleaseNode.className = 'release'
                    buttonReleaseNode.dataset.pokemonId = pokemon.id
                    
                    liNode.append(buttonReleaseNode)
                    ulNode.append(liNode)

                    // console.log(pokemon)
                }
                else {
                    alert(pokemon.message);
                }
            })
        }
        else if (e.target.className == 'release') {
            // console.log("so long friend")

            reqObj = {
                method: "DELETE"
            }

            fetch(POKEMONS_URL + `/${e.target.dataset.pokemonId}`, reqObj)
            .then(resp => resp.json)
            .then(data => {
                e.target.parentNode.remove()
            })
        }
        
    })
}

main()