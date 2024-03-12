import { Button, Flex } from "@mantine/core"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import { PokemonType, pokemonTypeMapping } from "./PokemonType/PokemonType"

type Props = {
  selected: PokemonType[]
  onChange?: (value: PokemonType[]) => void
}

const PokemonTypeSelector = ({ ...props }: Props) => {
  return (
    <Flex gap={8} wrap="wrap">
      {Object.entries(pokemonTypeMapping).map(([key, value]) => {
        const isSelected = props.selected.includes(key as PokemonType)

        const selectedCount = props.selected.filter((x) => x === key).length

        return (
          <Button
            key={key}
            onClick={() => {
              if (!props.onChange) return
              if (props.selected.includes(key as PokemonType)) {
                props.onChange?.(props.selected.filter((x) => x !== key))
              } else {
                props.onChange?.([...props.selected, key as PokemonType])
              }
            }}
            variant={isSelected ? "filled" : "outline"}
            color={value.color}
            sx={{
              opacity: isSelected || props.onChange ? 1 : 0.5,
              cursor: props.onChange ? "pointer" : "default",
            }}
          >
            <FlexVCenter>
              <span>{value.name}</span>
              {selectedCount > 1 && (
                <span style={{ marginLeft: 4, fontSize: 12 }}>
                  ({selectedCount})
                </span>
              )}
            </FlexVCenter>
          </Button>
        )
      })}
    </Flex>
  )
}

export default PokemonTypeSelector
