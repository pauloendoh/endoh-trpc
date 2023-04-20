import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import useTechCount from "@/hooks/domain/creation/tech/useTechCount"
import urls from "@/utils/urls"
import { Box, Chip, createStyles, Flex, Text } from "@mantine/core"
import { useRouter } from "next/router"

const TopTechnologies = () => {
  const router = useRouter()
  const techs = router.query.techs

  const techCount = useTechCount()

  const handleClickTech = (tech: string) => {
    if (techs && techs === tech) return router.push(urls.pages.index)
    return router.push(urls.pages.homeTechs([tech]))
  }

  const techIsSelected = (tech: string) => {
    const techs = router.query.techs
    if (techs && (techs === tech || techs.includes(tech))) return true
    return false
  }
  const { classes } = useStyles()

  return (
    <Flex sx={{ flexWrap: "wrap", gap: 8, marginLeft: 8 }}>
      <Text>Top technologies: </Text>
      {techCount.map((tc) => (
        <Chip
          key={tc.techName}
          onClick={() => handleClickTech(tc.techName)}
          checked={techIsSelected(tc.techName)}
          color="secondary"
          display="flex"
          classNames={classes}
        >
          <Box>{tc.techName}</Box>
          <FlexVCenter
            ml={8}
            px={8}
            sx={{
              background: "#393939",
              borderRadius: "3px",
              height: "20px",
              display: "flex",
            }}
          >
            {tc.count}
          </FlexVCenter>
        </Chip>
      ))}
    </Flex>
  )
}

const useStyles = createStyles((theme) => ({
  label: {
    display: "flex",
    paddingBlock: 2,
  },
}))

export default TopTechnologies
