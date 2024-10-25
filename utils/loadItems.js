import fs from "fs";
function loadItems(path) {
  const loadedItems = fs.readFileSync(path, "utf-8");
  if (loadedItems) {
    return JSON.parse(loadedItems);
  }
  return [];
}

export default loadItems;
