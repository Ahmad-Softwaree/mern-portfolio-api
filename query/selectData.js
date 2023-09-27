export const selectData = (select = [], notSelect = []) => {
  const map = new Map();
  if (select.length > 0) {
    for (const val of select) {
      map.set(val, 1);
    }
  }
  if (notSelect.length > 0) {
    for (const val of notSelect) {
      map.set(val, 0);
    }
  }
  const resultMap = {};
  map.forEach((value, key) => {
    resultMap[key] = value;
  });
  return resultMap;
};
