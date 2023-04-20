const urls = {
  pages: {
    index: "/",
    homeTechs: (techs: string[]) =>
      `/?techs=${techs.map((tech, i) => {
        if (i > 0) return `,${tech}`;
        return tech;
      })}`,
  },
  api: {
    creations: "/api/creations",
  },
};

export default urls;
