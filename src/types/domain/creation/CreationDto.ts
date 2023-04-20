export default interface CreationDto {
  id: number | undefined;
  title: string;
  description: string;
  complexity: number | null;
  date: string | null;
  technologies: string[];
}

export const buildCreationDto = (p?: Partial<CreationDto>): CreationDto => ({
  id: undefined,
  title: "",
  description: "",
  complexity: null,
  date: null,
  technologies: [],
  ...p,
});
