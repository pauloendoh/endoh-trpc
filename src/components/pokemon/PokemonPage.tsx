import { ActionIcon, Container, Flex, Title } from "@mantine/core"
import { useMemo, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import FlexCol from "../_common/flexboxes/FlexCol"
import FlexVCenter from "../_common/flexboxes/FlexVCenter"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"
import {
  PokemonType,
  pokemonTypeMapping,
} from "./PokemonTypeSelector/PokemonType/PokemonType"
import PokemonTypeSelector from "./PokemonTypeSelector/PokemonTypeSelector"

type Props = {}

const PokemonPage = ({ ...props }: Props) => {
  const [selected, setSelected] = useState<PokemonType[]>([])

  const strongAgainst = useMemo(() => {
    return selected.reduce<PokemonType[]>((acc, type) => {
      return [...acc, ...pokemonTypeMapping[type].strongAgainst]
    }, [])
  }, [selected])

  const uniqueStrongAgainst = useMemo(
    () => Array.from(new Set(strongAgainst)),
    [strongAgainst]
  )

  const lowDamageAgainst = useMemo(() => {
    return selected.reduce<PokemonType[]>((acc, type) => {
      return [...acc, ...pokemonTypeMapping[type].lowDamageAgainst]
    }, [])
  }, [selected])

  const uniqueLowDamageAgainst = useMemo(
    () => Array.from(new Set(lowDamageAgainst)),
    [lowDamageAgainst]
  )

  const [showLowDamageAgainst, setShowLowDamageAgainst] = useState(false)

  return (
    <LoggedLayout>
      <Container mt={20}>
        <Flex gap={200}>
          <FlexCol w={300} gap={8}>
            <FlexVCenter>
              <Title order={6}>
                Select types{" "}
                {selected.length > 0 && (
                  <button
                    onClick={() => setSelected([])}
                    style={{
                      cursor: "pointer",
                      fontSize: 12,
                      textDecoration: "underline",
                      background: "none",
                      border: "none",
                    }}
                  >
                    (clear all)
                  </button>
                )}
              </Title>
            </FlexVCenter>
            <PokemonTypeSelector
              selected={selected}
              onChange={(value) => setSelected(value)}
            />
          </FlexCol>

          <FlexCol w={300} gap={80}>
            <FlexCol gap={8}>
              <Title order={6}>
                <span>Strong against</span>
                {uniqueStrongAgainst.length > 0 && (
                  <span> ({uniqueStrongAgainst.length})</span>
                )}
              </Title>
              <PokemonTypeSelector selected={strongAgainst} />
            </FlexCol>

            <FlexCol gap={8}>
              <Title order={6}>
                <FlexVCenter>
                  <span>Low damage against</span>
                  {uniqueLowDamageAgainst.length > 0 && (
                    <span> ({uniqueLowDamageAgainst.length})</span>
                  )}
                  <ActionIcon
                    onClick={() =>
                      setShowLowDamageAgainst(!showLowDamageAgainst)
                    }
                  >
                    {showLowDamageAgainst ? <FaEye /> : <FaEyeSlash />}
                  </ActionIcon>
                </FlexVCenter>
              </Title>

              {showLowDamageAgainst && (
                <PokemonTypeSelector selected={lowDamageAgainst} />
              )}
            </FlexCol>
          </FlexCol>
        </Flex>
      </Container>
    </LoggedLayout>
  )
}

export default PokemonPage
