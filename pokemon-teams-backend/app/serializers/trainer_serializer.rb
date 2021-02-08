class TrainerSerializer < ActiveModel::Serializer
    attributes :name, :id, :pokemon

    def pokemon
        @object.pokemons
    end
end