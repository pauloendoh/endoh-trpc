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
    weakAgainst: PokemonType[]
  }
> = {
  normal: {
    name: "Normal",
    color: "gray",
    strongAgainst: [],
    weakAgainst: ["fighting"],
  },
  fighting: {
    name: "Fighting",
    color: "red",
    strongAgainst: ["normal", "rock", "steel", "ice", "dark"],
    weakAgainst: ["flying", "psychic", "fairy"],
  },
  flying: {
    name: "Flying",
    color: "blue",
    strongAgainst: ["fighting", "bug", "grass"],
    weakAgainst: ["rock", "electric", "ice"],
  },
  poison: {
    name: "Poison",
    color: "purple",
    strongAgainst: ["grass", "fairy"],
    weakAgainst: ["ground", "psychic"],
  },
  ground: {
    name: "Ground",
    color: "brown",
    strongAgainst: ["poison", "rock", "steel", "fire", "electric"],
    weakAgainst: ["water", "grass", "ice"],
  },
  rock: {
    name: "Rock",
    color: "orange",
    strongAgainst: ["flying", "bug", "fire", "ice"],
    weakAgainst: ["fighting", "ground", "steel", "water", "grass"],
  },
  bug: {
    name: "Bug",
    color: "green",
    strongAgainst: ["grass", "psychic", "dark"],
    weakAgainst: ["flying", "rock", "fire"],
  },
  ghost: {
    name: "Ghost",
    color: "indigo",
    strongAgainst: ["ghost", "psychic"],
    weakAgainst: ["dark"],
  },
  steel: {
    name: "Steel",
    color: "gray",
    strongAgainst: ["rock", "ice", "fairy"],
    weakAgainst: ["fighting", "ground", "fire"],
  },
  fire: {
    name: "Fire",
    color: "red",
    strongAgainst: ["bug", "steel", "grass", "ice"],
    weakAgainst: ["ground", "rock", "water"],
  },
  water: {
    name: "Water",
    color: "blue",
    strongAgainst: ["ground", "rock", "fire"],
    weakAgainst: ["grass", "electric"],
  },
  grass: {
    name: "Grass",
    color: "green",
    strongAgainst: ["ground", "rock", "water"],
    weakAgainst: [
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
    weakAgainst: ["ground"],
  },
  psychic: {
    name: "Psychic",
    color: "pink",
    strongAgainst: ["fighting", "poison"],
    weakAgainst: ["bug", "ghost", "dark"],
  },
  ice: {
    name: "Ice",
    color: "cyan",
    strongAgainst: ["flying", "ground", "grass", "dragon"],
    weakAgainst: ["fighting", "rock", "steel", "fire"],
  },
  dragon: {
    name: "Dragon",
    color: "purple",
    strongAgainst: ["dragon"],
    weakAgainst: ["ice", "dragon", "fairy"],
  },
  dark: {
    name: "Dark",
    color: "black",
    strongAgainst: ["ghost", "psychic"],
    weakAgainst: ["fighting", "bug", "fairy"],
  },
  fairy: {
    name: "Fairy",
    color: "pink",
    strongAgainst: ["fighting", "dragon", "dark"],
    weakAgainst: ["poison", "steel"],
  },
}
