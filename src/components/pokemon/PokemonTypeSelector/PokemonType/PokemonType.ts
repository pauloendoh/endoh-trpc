export const pokemonTypes = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
] as const

export type PokemonType = (typeof pokemonTypes)[number]

export const pokemonTypeMapping: Record<
  PokemonType,
  {
    name: string
    color: string
    strongAgainst: PokemonType[]
    lowDamageAgainst: PokemonType[]
  }
> = {
  normal: {
    name: "Normal",
    color: "gray",
    strongAgainst: [],
    lowDamageAgainst: ["rock", "steel"],
  },
  fighting: {
    name: "Fighting",
    color: "red",
    strongAgainst: ["normal", "rock", "steel", "ice", "dark"],
    lowDamageAgainst: ["flying", "poison", "bug", "psychic", "fairy"],
  },
  flying: {
    name: "Flying",
    color: "blue",
    strongAgainst: ["fighting", "bug", "grass"],
    lowDamageAgainst: ["rock", "steel", "electric"],
  },
  poison: {
    name: "Poison",
    color: "purple",
    strongAgainst: ["grass", "fairy"],
    lowDamageAgainst: ["poison", "ground", "rock", "ghost"],
  },
  ground: {
    name: "Ground",
    color: "brown",
    strongAgainst: ["poison", "rock", "steel", "fire", "electric"],
    lowDamageAgainst: ["bug", "grass"],
  },
  rock: {
    name: "Rock",
    color: "orange",
    strongAgainst: ["flying", "bug", "fire", "ice"],
    lowDamageAgainst: ["fighting", "ground", "steel"],
  },
  bug: {
    name: "Bug",
    color: "green",
    strongAgainst: ["grass", "psychic", "dark"],
    lowDamageAgainst: [
      "fighting",
      "flying",
      "poison",
      "ghost",
      "steel",
      "fire",
      "fairy",
    ],
  },
  ghost: {
    name: "Ghost",
    color: "black",
    strongAgainst: ["ghost", "psychic"],
    lowDamageAgainst: ["dark"],
  },
  steel: {
    name: "Steel",
    color: "gray",
    strongAgainst: ["rock", "ice", "fairy"],
    lowDamageAgainst: ["steel", "fire", "water", "electric"],
  },
  fire: {
    name: "Fire",
    color: "red",
    strongAgainst: ["bug", "steel", "grass", "ice"],
    lowDamageAgainst: ["rock", "fire", "water", "dragon"],
  },
  water: {
    name: "Water",
    color: "blue",
    strongAgainst: ["ground", "rock", "fire"],
    lowDamageAgainst: ["water", "grass", "dragon"],
  },
  grass: {
    name: "Grass",
    color: "green",
    strongAgainst: ["ground", "rock", "water"],
    lowDamageAgainst: [
      "flying",
      "poison",
      "bug",
      "steel",
      "fire",
      "grass",
      "dragon",
    ],
  },
  electric: {
    name: "Electric",
    color: "yellow",
    strongAgainst: ["flying", "water"],
    lowDamageAgainst: ["grass", "electric", "dragon"],
  },
  psychic: {
    name: "Psychic",
    color: "purple",
    strongAgainst: ["fighting", "poison"],
    lowDamageAgainst: ["steel", "psychic"],
  },
  ice: {
    name: "Ice",
    color: "cyan",
    strongAgainst: ["flying", "ground", "grass", "dragon"],
    lowDamageAgainst: ["steel", "fire", "water", "ice"],
  },
  dragon: {
    name: "Dragon",
    color: "purple",
    strongAgainst: ["dragon"],
    lowDamageAgainst: ["steel", "fairy"],
  },
  dark: {
    name: "Dark",
    color: "gray",
    strongAgainst: ["ghost", "psychic"],
    lowDamageAgainst: ["fighting", "dark", "fairy"],
  },
  fairy: {
    name: "Fairy",
    color: "pink",
    strongAgainst: ["fighting", "dragon", "dark"],
    lowDamageAgainst: ["poison", "steel", "fire"],
  },
}
