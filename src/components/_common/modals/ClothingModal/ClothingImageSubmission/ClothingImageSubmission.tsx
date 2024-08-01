import {
  Button,
  FileButton,
  Group,
  rem,
  Text,
  useMantineTheme,
} from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import axios from "axios"
import { useRef } from "react"
import { MdClose, MdPhoto, MdUpload } from "react-icons/md"
import { useCreatePresignedUrlMutation } from "../../../../../hooks/trpc/clothing/useCreatePresignedUrlMutation"
import FlexCol from "../../../flexboxes/FlexCol"

export const CLOTHING_IMAGE_MAX_SIZE = 15 * 1024 ** 2

type Props = {
  imageUrl: string
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
      })
    })
  }

  const { mutateAsync: submitCreatePresignedUrl } =
    useCreatePresignedUrlMutation()

  const openRef = useRef<() => void>(null)

  return (
    <>
      {!props.imageUrl && (
        <Dropzone
          openRef={openRef}
          onDrop={(files) => {
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
              <Text size="xl">Upload image</Text>
            </div>
          </Group>
        </Dropzone>
      )}

      {props.imageUrl && (
        <FlexCol w="100%" justify={"center"}>
          <img
            src={props.imageUrl}
            alt="preview"
            style={{
              maxWidth: "100%",
              aspectRatio: "1/1",
              height: "auto",
              objectFit: "cover",
              borderRadius: theme.radius.sm,
              marginTop: rem(20),
            }}
          />

          <FileButton
            onChange={(file) => {
              if (!file) return

              onFileChange([file])
            }}
            accept={"image/*"}
          >
            {(props) => (
              <Button {...props} variant="subtle">
                Change image
              </Button>
            )}
          </FileButton>
        </FlexCol>
      )}
    </>
  )
}

export default ClothingImageSubmission
