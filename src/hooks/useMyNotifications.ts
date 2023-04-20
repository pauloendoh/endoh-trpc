import { useToast } from "@chakra-ui/react"

export const useMyNotifications = () => {
  const toast = useToast()

  const setSuccessMessage = (title: string, message = "") => {
    toast({
      title,
      description: message,
      status: "success",
    })
  }

  const setErrorMessage = (title: string, message = "") => {
    toast({
      title,
      description: message,
      status: "error",
    })
  }

  return {
    setSuccessMessage,
    setErrorMessage,
  }
}
