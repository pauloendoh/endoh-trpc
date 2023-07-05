"use client"
import { Link, RichTextEditor } from "@mantine/tiptap"
import Highlight from "@tiptap/extension-highlight"
import ImageExtension from "@tiptap/extension-image"
import SubScript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"

const Tiptap = () => {
  async function uploadImage(file: File) {
    const data = new FormData()
    data.append("file", file)
    return 'https://source.unsplash.com/8xznAGy4HcY/800x400"' as const
  }

  const [content, setContent] = useState(`<p>Hello World!</p>`)

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    editorProps: {
      handleDrop: function (view, event, slice, moved) {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files[0]
        ) {
          // if dropping external files
          let file = event.dataTransfer.files[0] // the dropped file
          let filesize = Number((file.size / 1024 / 1024).toFixed(4)) // get the filesize in MB
          if (
            (file.type === "image/jpeg" || file.type === "image/png") &&
            filesize < 10
          ) {
            // check valid image type under 10MB
            // check the dimensions
            let _URL = window.URL || window.webkitURL
            let img = new Image() /* global Image */
            img.src = _URL.createObjectURL(file)
            img.onload = function () {
              if (img.width > 5000 || img.height > 5000) {
                window.alert(
                  "Your images need to be less than 5000 pixels in height and width."
                ) // display alert
              } else {
                // valid image so upload to server
                // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
                uploadImage(file)
                  .then(function (response) {
                    // response is the image url for where it has been saved
                    // pre-load the image before responding so loading indicators can stay
                    // and swaps out smoothly when image is ready
                    let image = new Image()
                    image.src = response
                    image.onload = function () {
                      // place the now uploaded image in the editor where it was dropped
                      const { schema } = view.state
                      const coordinates = view.posAtCoords({
                        left: event.clientX,
                        top: event.clientY,
                      })
                      if (!coordinates) return

                      const node = schema.nodes.image.create({ src: response }) // creates the image element
                      const transaction = view.state.tr.insert(
                        coordinates.pos,
                        node
                      ) // places it in the correct position
                      return view.dispatch(transaction)
                    }
                  })
                  .catch(function (error) {
                    if (error) {
                      window.alert(
                        "There was a problem uploading your image, please try again."
                      )
                    }
                  })
              }
            }
          } else {
            window.alert(
              "Images need to be in jpg or png format and less than 10mb in size."
            )
          }
          return true // handled
        }
        return false // not handled use default behaviour
      },
      handlePaste: function (view, event, slice) {
        const items = Array.from(event.clipboardData?.items || [])
        for (const item of items) {
          if (item.type.indexOf("image") === 0) {
            const itemFile = item.getAsFile()
            if (!itemFile) continue
            let filesize = Number((itemFile.size / 1024 / 1024).toFixed(4)) // get the filesize in MB
            if (filesize < 10) {
              // check image under 10MB
              // check the dimensions
              let _URL = window.URL || window.webkitURL
              let img = new Image() /* global Image */
              img.src = _URL.createObjectURL(itemFile)
              img.onload = function () {
                if (img.width > 5000 || img.height > 5000) {
                  window.alert(
                    "Your images need to be less than 5000 pixels in height and width."
                  ) // display alert
                } else {
                  // valid image so upload to server
                  // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
                  uploadImage(itemFile)
                    .then(function (response) {
                      // response is the image url for where it has been saved
                      // place the now uploaded image in the editor where it was pasted
                      const { schema } = view.state

                      const node = schema.nodes.image.create({ src: response }) // creates the image element
                      const transaction =
                        view.state.tr.replaceSelectionWith(node) // places it in the correct position
                      view.dispatch(transaction)
                    })
                    .catch(function (error) {
                      if (error) {
                        window.alert(
                          "There was a problem uploading your image, please try again."
                        )
                      }
                    })
                }
              }
            } else {
              window.alert("Images need to be less than 10mb in size.")
            }
            return true // handled
          }
        }
        return false // not handled use default behaviour
      },
      transformPastedHTML(html) {
        return html.replace(
          /<img.*?src="(?<imgSrc>.*?)".*?>/g,
          function (match, imgSrc) {
            if (imgSrc.startsWith("https://images.your-image-hosting.com")) {
              // your saved images
              return match // keep the img
            }
            return "" // replace it
          }
        )
      },
    },
  })

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  )
}

export default Tiptap
