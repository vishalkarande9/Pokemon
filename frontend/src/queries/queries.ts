import {gql} from 'apollo-boost';

const getPokemonTypes = gql`
 {
  pokemonTypes:pokemonTypes
}
`
const fetchPokemonList = gql`
    query ($input:PokemonsQueryInput!){
    pokemons(query:$input){
        limit
        offset
        edges:edges{
        name
        types:types
        isFavorite
        image
        id
        }
    }
    }
`

const markFavorite = gql`
    mutation($input:ID!){
        favoritePokemon(id:$input){
            id
            name
            isFavorite
    }
    }
`

const markunFavorite = gql`
    mutation($input:ID!){
        unFavoritePokemon(id:$input){
            id
            name
            isFavorite
    }
    }
`

const fetchPokemonByName = gql`
query ($input: String!) {
  pokemonByName(name: $input) {
	  id
      name
      sound
      image
      types
      weight:weight{
        minimum
        maximum
      }
      height:height{
        minimum
        maximum
      }
      isFavorite
      maxCP
      maxHP
      evolutions:evolutions{
        name
        image
        id
        isFavorite
      }  
  }
}
`

export {getPokemonTypes,fetchPokemonList,markFavorite, markunFavorite, fetchPokemonByName};