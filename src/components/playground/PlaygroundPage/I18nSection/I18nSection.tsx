import { Button } from "@mantine/core"
import { useContext } from "react"
import { I18nContext } from "../../../../i18n/i18n-react"

type Props = {}

const I18nSection = ({ ...props }: Props) => {
  const { locale, LL, setLocale } = useContext(I18nContext)

  return (
    <div className="I18nSection">
      I18nSection
      <div>{LL.hi({ name: "hello" })}</div>
      <div>{LL.getName({ name: "lol" })}</div>
      <Button onClick={() => setLocale("it")}>{locale}</Button>
    </div>
  )
}

export default I18nSection
