import { showNotification } from "@mantine/notifications"

export const useMyNotifications = () => {
  const setSuccessMessage = (title: string, message = "") => {
    showNotification({
      title,
      message,
      color: "green",
    })
  }

  const setErrorMessage = (title: string, message = "") => {
    showNotification({
      title,
      message,
      color: "red",
    })
  }

  return {
    setSuccessMessage,
    setErrorMessage,
  }
}
