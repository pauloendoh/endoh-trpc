import { ActionIcon, MantineColor, SelectItemProps } from "@mantine/core"
import { forwardRef } from "react"
import { MdEdit } from "react-icons/md"
import FlexVCenter from "../../../../flexboxes/FlexVCenter"

const charactersList = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "Bender Bending Rodríguez",
    description: "Fascinated with cooking, though has no sense of taste",
  },

  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Carol Miller",
    description: "One of the richest people on Earth",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Homer Simpson",
    description: "Overweight, lazy, and often ignorant",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Spongebob Squarepants",
    description: "Not just a sponge",
  },
]

const data = charactersList.map((item) => ({ ...item, value: item.label }))

interface ItemProps extends SelectItemProps {
  color: MantineColor
  description: string
  image: string
  label: string
}

export const RecurrentEntrySelectItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      description,
      value,
      image,
      label,

      ...others
    }: ItemProps,
    ref
  ) => (
    <div ref={ref} {...others}>
      <FlexVCenter justify={"space-between"}>
        <span>{label}</span>

        <ActionIcon
          size="lg"
          style={{
            zIndex: 99999,
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            alert("clicked")
          }}
        >
          <MdEdit />
        </ActionIcon>
      </FlexVCenter>
    </div>
  )
)
