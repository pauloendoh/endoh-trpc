import { TextInput } from "@mantine/core"
import { useState } from "react"
import { NumericFormat, PatternFormat } from "react-number-format"
import MyNumberInputV2 from "../../../_common/inputs/MyNumberInputV2"

type Props = {}

const NumberFormatSection = ({ ...props }: Props) => {
  const [number, setNumber] = useState(0)
  const [something, setSomething] = useState("")
  const [something2, setSomething2] = useState(0)
  return (
    <div className="NumberFormatSection">
      {JSON.stringify({
        number,
      })}
      <MyNumberInputV2
        value={number}
        onChange={(value) => {
          if (value) return setNumber(value)
        }}
        precision={0}
        removeTrailingZeros
      />

      <PatternFormat
        customInput={TextInput}
        format="$ #### #### #### ####"
        value={something}
        onChange={(e) => {
          setSomething(e.target.value)
        }}
      />

      <NumericFormat
        customInput={TextInput}
        value={something2}
        prefix={"$ "}
        thousandSeparator=","
        onBlur={(e) => {
          setSomething2(Number(e.target.value))
        }}
      />
    </div>
  )
}

export default NumberFormatSection
