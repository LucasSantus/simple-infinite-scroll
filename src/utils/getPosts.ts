import { getLoremRandomic } from "./getLoremRandomic";

export const getPosts = (length: number) => {
  const data = Array.from({ length: length }).map((_) => {
    return {
      id: crypto.randomUUID(),
      // title: "dasdas",
      title: getLoremRandomic(250, 300),
      description: getLoremRandomic(300, 600),
      // createAt: getDateRandomic(),
    };
  });

  return data;
};
