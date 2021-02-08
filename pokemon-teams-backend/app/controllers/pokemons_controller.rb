class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.count < 6
            pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
            render json: pokemon
        end
    end

    def destroy
        byebug
    end

end
