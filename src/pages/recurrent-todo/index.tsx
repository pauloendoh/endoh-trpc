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
      <iframe title="Recurrent" src={recurrentUrl} />
      <iframe title="Todoist" src="https://app.todoist.com/app/upcoming" />

      <iframe
        title="TODO"
        src="https://app.todoist.com/app/filter/todo-general-ideas-2201003068"
      />

      <iframe
        title="Calendar"
        src="https://app.todoist.com/app/project/calendar-2308710667"
      />
      <iframe
        title="Calendar"
        src="https://app.todoist.com/app/project/aniversarios-2198991416"
      />
    </div>
  )
}

export default TestPage
