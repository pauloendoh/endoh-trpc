import { Divider, Title } from "@mantine/core"
import { RecurrentItemOutput } from "../../../trpcServer/routers/recurrent/types/RecurrentItemOutput"
import FlexCol from "../../_common/flexboxes/FlexCol"
import RecurrentItem from "./RecurrentItem/RecurrentItem"

type Props = {
  type: "today" | "nextDays"
  items: RecurrentItemOutput[]
}

const RecurrentItemList = ({ ...props }: Props) => {
  if (props.items.length === 0) {
    return null
  }

  return (
    <div className="RecurrentItemList">
      <Title order={4}>{props.type === "today" ? "Today" : "Next days"}</Title>
      <FlexCol gap={8} mt={16}>
        {props.items.map((item, index) => {
          return (
            <FlexCol key={item.id}>
              {index !== 0 && <Divider />}
              <RecurrentItem item={item} type={props.type} />
            </FlexCol>
          )
        })}
      </FlexCol>
    </div>
  )
}

export default RecurrentItemList
