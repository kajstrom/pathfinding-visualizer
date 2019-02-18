export default (rows, columns) => {
  const map = [];
  for (let row = 0; row < rows; row++) {
    const rowTiles = [];

    for(let column = 0; column < columns; column++) {
      rowTiles.push({
        x: column,
        y: row,
        type: "passable",
        status: "none",
        neighbors: []
      });
    }

    map.push(rowTiles);
  }

  return map;
};