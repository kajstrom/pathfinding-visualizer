import toGraph from "../map/toGraph";
import backtrack from "./backtrack";

function manhattanDistance (a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function aStar(graph, source, target) {
  const visited = [];

  graph.forEach(tile => {
    tile.prev = null;
    tile.visited = false;
    // g score is the cost for getting from souce to that tile
    tile.gScore = Infinity;
    // f score is the heuristic cost for getting to the target from that tile
    tile.fScore = Infinity;
  });

  source.gScore = 0;
  source.fScore = manhattanDistance(source, target);

  let openTiles = [source];

  while (openTiles.length !== 0) {
    // Select open tile with lowest heuristic value
    const current = openTiles.reduce((carry, tile) => {
      if (carry.fScore > tile.fScore) {
        return tile;
      }

      return carry;
    });

    if (current === target) {
      return {
        visited,
        shortestPath: backtrack(current, source)
      }
    }

    // Remove current from open
    openTiles = openTiles.filter(tile => tile !== current);
    current.visited = true;
    visited.push(current);

    current.neighbors.forEach(neighbor => {
      if (neighbor.visited) {
        // Ignore visited neighbors
        return;
      }

      const tentativeGScore = current.gScore + 1;

      if (undefined === openTiles.find(tile => tile === neighbor)) {
        openTiles.push(neighbor);
      } else if (tentativeGScore >= neighbor.gScore) {
        return;
      }

      // This path is the best until now.
      neighbor.prev = current;
      neighbor.gScore = tentativeGScore;
      neighbor.fScore = neighbor.gScore + manhattanDistance(neighbor, target);
    });
  }
}

export default (map, start, goal) => {
  const graph = toGraph(map);
  
  const shortestPath = aStar(
    graph,
    graph.find(tile => tile.x === start.x && tile.y === start.y),
    graph.find(tile => tile.x === goal.x && tile.y === goal.y)  
  );

  return shortestPath;
};
