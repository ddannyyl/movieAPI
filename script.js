import { apiKey } from "./key.js";

const cartContents = new Set();

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
}
