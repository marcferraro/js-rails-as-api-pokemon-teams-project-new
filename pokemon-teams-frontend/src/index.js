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
    const container = document.getElementById('trainer-container')
    
    const divNode = document.createElement('div')
    divNode.className="card"
    divNode.dataset.id=trainer.id
}

main()