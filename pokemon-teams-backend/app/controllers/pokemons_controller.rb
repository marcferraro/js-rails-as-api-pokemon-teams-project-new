class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.count < 6
            pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
            render json: pokemon
        else
            render json: {message: "Already have 6 pokemon."}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy

        render json: {message: 'success'}
    end

end
