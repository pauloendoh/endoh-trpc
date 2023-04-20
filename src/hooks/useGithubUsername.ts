import axios from "axios"
import { useEffect, useState } from "react"
import { GithubUserInfoDto } from "../types/GithubUserInfoDto"

export const useGithubUserInfo = (usernameImg?: string | null) => {
  const [username, setUsername] = useState<GithubUserInfoDto | null>(null)

  useEffect(() => {
    if (usernameImg && usernameImg.length > 0) {
      // eg: https://avatars.githubusercontent.com/u/17272651?v=4
      const userId = usernameImg.split("?v")[0].split("u/")[1]
      axios
        .get<GithubUserInfoDto>(`https://api.github.com/user/${userId}`)
        .then((res) => {
          setUsername(res.data)
        })
    }
    setUsername(null)
  }, [usernameImg])
  return username
}
