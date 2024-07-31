import { Group, rem, Text, useMantineTheme } from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import axios from "axios"
import { useState } from "react"
import { MdClose, MdPhoto, MdUpload } from "react-icons/md"
import { useCreatePresignedUrlMutation } from "../../../../../hooks/trpc/clothing/useCreatePresignedUrlMutation"

export const CLOTHING_IMAGE_MAX_SIZE = 15 * 1024 ** 2

type Props = {
  onSetImageUrl: (url: string) => void
}

const ClothingImageSubmission = ({ ...props }: Props) => {
  const theme = useMantineTheme()

  const onFileChange = (files: File[]) => {
    const firstFile = files[0]
    if (!firstFile) return

    submitCreatePresignedUrl({
      extension: firstFile.name.split(".").pop() || "",
    }).then((sign) => {
      const { url, fields, finalUrl } = sign

      const formData = new FormData()
      Object.entries({ ...fields, file: firstFile }).forEach(([key, value]) => {
        formData.append(key, value)
      })

      axios.post(url, formData).then((res) => {
        props.onSetImageUrl(finalUrl)
        setImageUrl(finalUrl)
      })
    })
  }

  const [imageUrl, setImageUrl] = useState("")

  const { mutateAsync: submitCreatePresignedUrl } =
    useCreatePresignedUrlMutation()

  return (
    <>
      <Dropzone
        onDrop={(files) => {
          console.log("dropped files", files)
          onFileChange(files)
        }}
        onReject={(rejections) => {
          alert(rejections[0].errors[0].message)
        }}
        maxSize={CLOTHING_IMAGE_MAX_SIZE}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
        {...props}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <MdUpload size={32} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <MdClose size={32} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <MdPhoto size={32} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {imageUrl && <img src={imageUrl} alt="preview" />}
    </>
  )
}

export default ClothingImageSubmission
