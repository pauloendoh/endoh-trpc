// s3
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { CLOTHING_IMAGE_MAX_SIZE } from "../../../components/_common/modals/ClothingModal/ClothingImageSubmission/ClothingImageSubmission"
import { ClothingRepository } from "./ClothingRepository"

export class ClothingService {
  constructor(private readonly clothingRepo = new ClothingRepository()) {}

  // async findClothings(requesterId: string) {
  //   return this.clothingRepo.findManyByUserId(requesterId)
  // }

  // async saveClothing(params: { requesterId: string; input: ClothingInput }) {
  //   if (params.input.id) {
  //     const isOwner = await this.clothingRepo.isOwner({
  //       clothingId: params.input.id,
  //       userId: params.requesterId,
  //     })
  //     if (!isOwner) {
  //       throw new Error("You are not the owner of this clothing")
  //     }

  //     return this.clothingRepo.updateClothing({
  //       input: params.input,
  //     })
  //   }

  //   return this.clothingRepo.createClothing({
  //     input: params.input,
  //     userId: params.requesterId,
  //   })
  // }

  async createPresignedUrl(params: {
    userId: string
    uuid: string
    extension: string
  }) {
    const path = `trpc/clothing/${params.userId}/${params.uuid}}.${params.extension}`
    return createPresignedPost(
      new S3Client({
        region: "us-east-1",
      }),
      {
        Fields: {
          key: path,
        },
        Key: path,
        Conditions: [["content-length-range", 0, CLOTHING_IMAGE_MAX_SIZE]],
        Expires: 30,
        Bucket: "endoh",
      }
    )
      .then((res) => {
        return {
          ...res,
          finalUrl: `https://endoh.s3.amazonaws.com/${path}`,
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
