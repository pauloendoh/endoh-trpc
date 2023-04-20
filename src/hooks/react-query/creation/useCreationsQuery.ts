import DTO from "@/types/utils/DTO"
import queryKeys from "@/utils/queryKeys"
import urls from "@/utils/urls"
import { Creation } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useCreationsQuery = () => {
  return useQuery([queryKeys.creations], () =>
    axios.get<DTO<Creation>[]>(urls.api.creations).then((res) => res.data)
  )
}

export default useCreationsQuery
