export const createLocalImageURL = (path) => {
  if (!path || path.startsWith("http")) {
    return path || "";
  }
  return "http://localhost:1337" + path;
};
