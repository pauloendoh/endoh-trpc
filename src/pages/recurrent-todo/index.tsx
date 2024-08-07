import { useEffect, useState } from "react"

type Props = {}

const TestPage = ({ ...props }: Props) => {
  const [recurrentUrl, setRecurrentUrl] = useState("")
  useEffect(() => {
    const currentUrl = window.location.href
    setRecurrentUrl(currentUrl.replace("recurrent-todo", "recurrent"))
  }, [])

  return (
    <div
      className="TestPage"
      style={{
        height: "100vh",
        maxWidth: 960,
        overflow: "hidden",
      }}
    >
      <iframe title="Recurrent" src={recurrentUrl} width="50%" height="100%" />
    </div>
  )
}

export default TestPage
