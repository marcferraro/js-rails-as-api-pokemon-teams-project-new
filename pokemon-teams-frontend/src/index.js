const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function main(){
    console.log("I wanna be the very best")
    fetchTrainers()
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

    const ulNode = document.createElement('ul')
    // debugger
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

main()