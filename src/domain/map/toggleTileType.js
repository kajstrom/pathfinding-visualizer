export default (map, x, y) => {
  return map.map((tileRow, yIndex) => {
    if (yIndex === y) {
      return tileRow.map((tile) => {
        if (tile.x === x && tile.y === y) {
          const type = tile.type === "passable" ? "impassable" : "passable";
          return { ...tile, type };
        }

        return tile;
      })
    } else {
      return tileRow;
    }
  });
};