import { buildCreationDto } from "@/types/domain/creation/CreationDto"
import DTO from "@/types/utils/DTO"
import { Button, Chip, Flex, Table } from "@mantine/core"
import { MdAdd } from "react-icons/md"

import { Creation } from "@prisma/client"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { format } from "timeago.js"
import FeatureDialog from "../FeatureDialog/FeatureDialog"

interface Props {
  creations: DTO<Creation>[]
}

const CreationsTable = ({ creations }: Props) => {
  const router = useRouter()

  const techs = router.query.techs

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogInitialValue, setDialogInitialValue] = useState(
    buildCreationDto()
  )

  const [sort, setSort] = useState<{
    by: keyof DTO<Creation>
    order: "desc" | "asc"
  }>({
    by: "date",
    order: "desc",
  })

  const sortedCreations = useMemo(() => {
    if (sort.by === "complexity") {
      if (sort.order === "desc")
        return creations.sort((a, b) => {
          if (a.complexity === null) return 1
          if (b.complexity === null) return -1
          return a.complexity > b.complexity ? -1 : 1
        })

      return creations.sort((a, b) => {
        if (a.complexity === null) return 1
        if (b.complexity === null) return -1
        return a.complexity < b.complexity ? -1 : 1
      })
    }

    if (sort.by === "date") {
      if (sort.order === "desc")
        return creations.sort((a, b) => {
          if (a.date === null) return 1
          if (b.date === null) return -1
          return b.date?.localeCompare(a.date)
        })

      return creations.sort((a, b) => {
        if (a.date === null) return 1
        if (b.date === null) return -1
        return a.date?.localeCompare(b.date)
      })
    }

    return creations
  }, [creations, sort])

  const sortedFeatures = useMemo(() => {
    if (techs) {
      if (typeof techs === "string")
        return sortedCreations.filter((creation) =>
          creation.technologies.includes(techs)
        )
    }
    return sortedCreations
  }, [sortedCreations, techs])

  const handleClickSort = (attribute: keyof DTO<Creation>) => {
    if (sort.by === attribute) {
      setSort({
        by: attribute,
        order: sort.order === "asc" ? "desc" : "asc",
      })
    } else setSort({ by: attribute, order: "desc" })
  }

  return (
    <>
      <Table highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Features</th>

            <th
              align="center"
              // sortDirection={sort.by === "complexity" ? sort.order : false}
            >
              {/* <TableSortLabel
                  active={sort.by === "complexity"}
                  direction={sort.by === "complexity" ? sort.order : "desc"}
                  onClick={() => handleClickSort("complexity")}
                > */}
              Complexity
              {/* </TableSortLabel> */}
            </th>

            <th
              align="left"
              // sortDirection={sort.by === "date" ? sort.order : false}
            >
              Developed
            </th>

            <th>Techs</th>
          </tr>
        </thead>

        <tbody>
          {sortedFeatures.map((feature) => (
            <tr
              key={feature.id}
              onClick={() => {
                console.log(1)
                setDialogInitialValue(buildCreationDto(feature))
                setDialogOpen(true)
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <td>{feature.title}</td>
              <td align="center">{feature.complexity}</td>
              <td>{format(feature.date)}</td>
              <td
                onClick={(e) => e.stopPropagation()}
                style={{ padding: "4px 0px" }}
              >
                <Flex gap={4} wrap="wrap">
                  {feature.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      size="sm"
                      checked={Boolean(techs?.includes(tech))}
                      color="secondary"
                      onClick={(e) => {
                        console.log(2)
                      }}
                    >
                      {tech}
                    </Chip>
                  ))}
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td style={{ padding: 8, paddingLeft: 0 }}>
              <Button
                onClick={() => {
                  setDialogInitialValue(buildCreationDto())
                  setDialogOpen(true)
                }}
                leftIcon={<MdAdd />}
                sx={{ width: 140, marginBottom: 16, marginLeft: 16 }}
              >
                Add Feature
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>

      <FeatureDialog
        initialValue={dialogInitialValue}
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
      />
    </>
  )
}

export default CreationsTable
