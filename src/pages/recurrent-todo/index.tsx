import { useEffect, useState } from "react"
import classes from "./index.module.css"

type Props = {}

const TestPage = ({ ...props }: Props) => {
  const [recurrentUrl, setRecurrentUrl] = useState("")
  useEffect(() => {
    const currentUrl = window.location.href
    setRecurrentUrl(currentUrl.replace("recurrent-todo", "recurrent"))
  }, [])

  return (
    <div className={classes.root}>
      <iframe title="Recurrent" src={recurrentUrl} width="25%" height="100%" />
      <iframe
        title="Todoist"
        src="https://app.todoist.com/app/upcoming"
        width="25%"
        height="100%"
      />

      <iframe
        title="Calendar"
        src="https://app.todoist.com/app/project/calendar-2308710667"
        width="25%"
        height="100%"
      />
      <iframe
        title="Calendar"
        src="https://app.todoist.com/app/project/aniversarios-2198991416"
        width="25%"
        height="100%"
      />
    </div>
  )
}

export default TestPage
