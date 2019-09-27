import gql from 'graphql-tag';
import * as React from 'react';
// import * as ApolloReactCommon from '@apollo/react-common';
// import * as ApolloReactComponents from '@apollo/react-components';
// import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export type Attack = {
   __typename?: 'Attack',
  name: Scalars['String'],
  type: Scalars['String'],
  damage: Scalars['Int'],
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  favoritePokemon?: Maybe<Pokemon>,
  unFavoritePokemon?: Maybe<Pokemon>,
};


export type MutationFavoritePokemonArgs = {
  id: Scalars['ID']
};


export type MutationUnFavoritePokemonArgs = {
  id: Scalars['ID']
};

export type Pokemon = {
   __typename?: 'Pokemon',
  id: Scalars['ID'],
  number: Scalars['Int'],
  name: Scalars['String'],
  weight: PokemonDimension,
  height: PokemonDimension,
  classification: Scalars['String'],
  types: Array<Scalars['String']>,
  resistant: Array<Scalars['String']>,
  attacks: PokemonAttack,
  weaknesses: Array<Scalars['String']>,
  fleeRate: Scalars['Float'],
  maxCP: Scalars['Int'],
  evolutions: Array<Pokemon>,
  evolutionRequirements?: Maybe<PokemonEvolutionRequirement>,
  maxHP: Scalars['Int'],
  image: Scalars['String'],
  sound: Scalars['String'],
  isFavorite: Scalars['Boolean'],
};

export type PokemonAttack = {
   __typename?: 'PokemonAttack',
  fast: Array<Attack>,
  special: Array<Attack>,
};

export type PokemonConnection = {
   __typename?: 'PokemonConnection',
  limit: Scalars['Int'],
  offset: Scalars['Int'],
  count: Scalars['Int'],
  edges: Array<Pokemon>,
};

export type PokemonDimension = {
   __typename?: 'PokemonDimension',
  minimum: Scalars['String'],
  maximum: Scalars['String'],
};

export type PokemonEvolutionRequirement = {
   __typename?: 'PokemonEvolutionRequirement',
  amount: Scalars['Int'],
  name: Scalars['String'],
};

export type PokemonFilterInput = {
  type?: Maybe<Scalars['String']>,
  isFavorite?: Maybe<Scalars['Boolean']>,
};

export type PokemonsQueryInput = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>,
  filter?: Maybe<PokemonFilterInput>,
};

export type Query = {
   __typename?: 'Query',
  pokemons: PokemonConnection,
  pokemonByName?: Maybe<Pokemon>,
  pokemonById?: Maybe<Pokemon>,
  pokemonTypes: Array<Scalars['String']>,
};


export type QueryPokemonsArgs = {
  query: PokemonsQueryInput
};


export type QueryPokemonByNameArgs = {
  name: Scalars['String']
};


export type QueryPokemonByIdArgs = {
  id: Scalars['ID']
};

export type Root = {
   __typename?: 'Root',
  query: Query,
};

export type FetchPokemonbyNameQueryVariables = {
  input: Scalars['String']
};


export type FetchPokemonbyNameQuery = (
  { __typename?: 'Query' }
  & { pokemonByName: Maybe<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'id' | 'name' | 'sound' | 'image' | 'types' | 'isFavorite' | 'maxCP' | 'maxHP'>
    & { weight: (
      { __typename?: 'PokemonDimension' }
      & Pick<PokemonDimension, 'minimum' | 'maximum'>
    ), height: (
      { __typename?: 'PokemonDimension' }
      & Pick<PokemonDimension, 'minimum' | 'maximum'>
    ), evolutions: Array<(
      { __typename?: 'Pokemon' }
      & Pick<Pokemon, 'name' | 'image' | 'id' | 'isFavorite'>
    )> }
  )> }
);

export type FetchPokemonQueryVariables = {
  input: PokemonsQueryInput
};


export type FetchPokemonQuery = (
  { __typename?: 'Query' }
  & { pokemons: (
    { __typename?: 'PokemonConnection' }
    & Pick<PokemonConnection, 'limit' | 'offset'>
    & { edges: Array<(
      { __typename?: 'Pokemon' }
      & Pick<Pokemon, 'name' | 'isFavorite' | 'image' | 'id'>
      & { types: Pokemon['types'] }
    )> }
  ) }
);

export type FetchtypesQueryVariables = {};


export type FetchtypesQuery = (
  { __typename?: 'Query' }
  & { pokemonTypes: Query['pokemonTypes'] }
);

export type MarkFavoriteMutationVariables = {
  input: Scalars['ID']
};


export type MarkFavoriteMutation = (
  { __typename?: 'Mutation' }
  & { favoritePokemon: Maybe<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'id' | 'name' | 'isFavorite'>
  )> }
);

export type MarkunFavouriteMutationVariables = {
  input: Scalars['ID']
};


export type MarkunFavouriteMutation = (
  { __typename?: 'Mutation' }
  & { unFavoritePokemon: Maybe<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'id' | 'name' | 'isFavorite'>
  )> }
);

export const FetchPokemonbyNameDocument = gql`
    query fetchPokemonbyName($input: String!) {
  pokemonByName(name: $input) {
    id
    name
    sound
    image
    types
    weight: weight {
      minimum
      maximum
    }
    height: height {
      minimum
      maximum
    }
    isFavorite
    maxCP
    maxHP
    evolutions: evolutions {
      name
      image
      id
      isFavorite
    }
  }
}
    `;
