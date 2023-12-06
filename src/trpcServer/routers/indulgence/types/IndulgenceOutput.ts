import { RouterOutput } from "../../../../types/utils/RouterOutput"

export type IndulgenceOutput = RouterOutput["indulgence"]["myIndulgences"][0]

export type IndulgenceSettingsOutput =
  RouterOutput["indulgence"]["indulgenceSettings"]
