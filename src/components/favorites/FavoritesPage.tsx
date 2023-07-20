import { Button } from "@mantine/core"
import { useMemo } from "react"
import { MdEdit } from "react-icons/md"
import { useFavoritesQuery } from "../../hooks/trpc/favorite/useFavoritesQuery"
import { useSaveFavoriteMutation } from "../../hooks/trpc/favorite/useSaveFavoriteMutation"
import useFavoriteModalStore from "../../hooks/zustand/modals/useFavoriteModalStore"
import {
  buildFavoriteInput,
  favoriteOutputToInput,
} from "../../trpcServer/routers/favorite/types/FavoriteInput"
import { FavoriteOutput } from "../../trpcServer/routers/favorite/types/FavoriteOutput"
import FlexCol from "../_common/flexboxes/FlexCol"
import FlexVCenter from "../_common/flexboxes/FlexVCenter"

type Props = {}

const FavoritesPage = ({ ...props }: Props) => {
  const { openDialog } = useFavoriteModalStore()
  const { data } = useFavoritesQuery()

  const sortedFavorites = useMemo(() => {
    return data?.sort((a, b) => {
      return b.clickCount - a.clickCount
    })
  }, [data])

  const { mutateAsync } = useSaveFavoriteMutation()
  const handleIncreaseCount = (favorite: FavoriteOutput) => {
    const input = favoriteOutputToInput(favorite)
    input.clickCount++
    mutateAsync(input)
  }

  return (
    <div className="FavoritesPage">
      <div>FavoritesPage</div>
      <div>
        <Button
          variant="outline"
          onClick={() => {
            openDialog(buildFavoriteInput())
          }}
        >
          Add favorite
        </Button>
      </div>
      <FlexCol>
        {sortedFavorites?.map((favorite) => (
          <FlexVCenter key={favorite.id} className="gap-2">
            <a
              href={favorite.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              onClick={() => {
                handleIncreaseCount(favorite)
              }}
              onMouseDown={(e) => {
                if (e.button === 1) {
                  handleIncreaseCount(favorite)
                  debugger
                }
              }}
            >
              {favorite.url} ({favorite.clickCount})
            </a>

            <MdEdit
              className="cursor-pointer"
              onClick={() => {
                openDialog(favoriteOutputToInput(favorite))
              }}
            />
          </FlexVCenter>
        ))}
      </FlexCol>
    </div>
  )
}

export default FavoritesPage
