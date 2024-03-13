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

const originalPokemonTypeMapping: Record<
  PokemonType,
  {
    name: string
    color: string
    strongAgainst: PokemonType[]
    lowDamageAgainst: PokemonType[]
    weakTo: PokemonType[]
  }
> = {
  normal: {
    name: "Normal",
    color: "gray",
    strongAgainst: [],
    lowDamageAgainst: ["rock", "steel"],
    weakTo: ["fighting"],
  },
  fighting: {
    name: "Fighting",
    color: "red",
    strongAgainst: ["normal", "rock", "steel", "ice", "dark"],
    lowDamageAgainst: ["flying", "poison", "bug", "psychic", "fairy"],
    weakTo: ["flying", "psychic", "fairy"],
  },
  flying: {
    name: "Flying",
    color: "blue",
    strongAgainst: ["fighting", "bug", "grass"],
    lowDamageAgainst: ["rock", "steel", "electric"],
    weakTo: ["rock", "electric", "ice"],
  },
  poison: {
    name: "Poison",
    color: "purple",
    strongAgainst: ["grass", "fairy"],
    lowDamageAgainst: ["poison", "ground", "rock", "ghost"],
    weakTo: ["ground", "psychic"],
  },
  ground: {
    name: "Ground",
    color: "brown",
    strongAgainst: ["poison", "rock", "steel", "fire", "electric"],
    lowDamageAgainst: ["bug", "grass"],
    weakTo: ["water", "grass", "ice"],
  },
  rock: {
    name: "Rock",
    color: "orange",
    strongAgainst: ["flying", "bug", "fire", "ice"],
    lowDamageAgainst: ["fighting", "ground", "steel"],
    weakTo: ["fighting", "ground", "steel", "water", "grass", "ice"],
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
    weakTo: ["flying", "rock", "fire"],
  },
  ghost: {
    name: "Ghost",
    color: "black",
    strongAgainst: ["ghost", "psychic"],
    lowDamageAgainst: ["dark"],
    weakTo: ["ghost", "dark"],
  },
  steel: {
    name: "Steel",
    color: "gray",
    strongAgainst: ["rock", "ice", "fairy"],
    lowDamageAgainst: ["steel", "fire", "water", "electric"],
    weakTo: ["fighting", "ground", "fire"],
  },
  fire: {
    name: "Fire",
    color: "red",
    strongAgainst: ["bug", "steel", "grass", "ice"],
    lowDamageAgainst: ["rock", "fire", "water", "dragon"],
    weakTo: ["ground", "rock", "water"],
  },
  water: {
    name: "Water",
    color: "blue",
    strongAgainst: ["ground", "rock", "fire"],
    lowDamageAgainst: ["water", "grass", "dragon"],
    weakTo: ["grass", "electric"],
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
    weakTo: ["flying", "poison", "bug", "fire", "ice"],
  },
  electric: {
    name: "Electric",
    color: "yellow",
    strongAgainst: ["flying", "water"],
    lowDamageAgainst: ["grass", "electric", "dragon"],
    weakTo: ["ground"],
  },
  psychic: {
    name: "Psychic",
    color: "purple",
    strongAgainst: ["fighting", "poison"],
    lowDamageAgainst: ["steel", "psychic"],
    weakTo: ["bug", "ghost", "dark"],
  },
  ice: {
    name: "Ice",
    color: "cyan",
    strongAgainst: ["flying", "ground", "grass", "dragon"],
    lowDamageAgainst: ["steel", "fire", "water", "ice"],
    weakTo: ["fighting", "rock", "steel", "fire"],
  },
  dragon: {
    name: "Dragon",
    color: "purple",
    strongAgainst: ["dragon"],
    lowDamageAgainst: ["steel", "fairy"],
    weakTo: ["ice", "dragon", "fairy"],
  },
  dark: {
    name: "Dark",
    color: "gray",
    strongAgainst: ["ghost", "psychic"],
    lowDamageAgainst: ["fighting", "dark", "fairy"],
    weakTo: ["fighting", "bug", "fairy"],
  },
  fairy: {
    name: "Fairy",
    color: "pink",
    strongAgainst: ["fighting", "dragon", "dark"],
    lowDamageAgainst: ["poison", "steel", "fire"],
    weakTo: ["poison", "steel"],
  },
}

// Sort by strongAgainst length
export const pokemonTypeMapping = Object.fromEntries(
  Object.entries(originalPokemonTypeMapping).sort(
    ([, a], [, b]) => b.strongAgainst.length - a.strongAgainst.length
  )
) as typeof originalPokemonTypeMapping
