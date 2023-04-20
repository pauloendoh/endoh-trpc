// Transforms Date stuff to string
type DTO<T> = {
  [k in keyof T]: T[k] extends Date | null ? string : T[k];
};

export default DTO;
