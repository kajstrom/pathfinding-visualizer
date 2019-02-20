function findTile(x, y, map) {
  if (y >= 0 && x >= 0) {
    if (y < map.length && x < map[0].length) {
      return map[y][x];
    }
  }

  return null;
}

/**
 * Connects tiles to each other.
 * @param {Array} map 
 * @param {Object} start 
 * @return Returns start coordinates tile as root
 */
function toGraph(map) {
  const graph = map
  .flat()
  .filter(tile => tile.type === "passable")  
  .map((tile) => {
    const { x, y } = tile;
      let neighbors = [
        findTile(x, y - 1, map),
        findTile(x - 1, y, map),
        findTile(x + 1, y, map),
        findTile(x, y + 1, map)
      ];

      tile.neighbors = neighbors.filter(tile => tile && tile.type === "passable");

      return tile;
  });

  return graph;
}

export default toGraph;