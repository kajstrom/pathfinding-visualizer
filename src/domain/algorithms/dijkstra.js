import toGraph from "../map/toGraph";

function backtrack(current, source) {
  const shortestPath = [];
      let u = current;

      if (u.prev !== null || (u === source)) {
        while (u) {
          shortestPath.push(u);
          u = u.prev
        }

        return shortestPath.reverse();
      }

      return null;
}

function dijkstra(graph, source, target) {
  let queue = [...graph];

  for (let i = 0; i < graph.length; i++) {
    graph[i].dist = Infinity;
    graph[i].prev = null;
  }

  source.dist = 0;

  while (queue.length !== 0) {
    const current = queue.reduce((carry, tile) => {
      if (carry.dist > tile.dist) {
        return tile;
      }

      return carry;
    });

    if (current.x === target.x && current.y === target.y) {
      return backtrack(current, source);
    }

    queue = queue.filter(tile => {
      return current.x !== tile.x || current.y !== tile.y
    });

    current.neighbors.forEach((tile) => {
      const altDist = current.dist + 1;

      if (altDist < tile.dist) {
        tile.dist = altDist;
        tile.prev = current;
      }
    });
  }

  return null;
}

export default (map, start, goal) => {
  const graph = toGraph(map);
  
  const shortestPath = dijkstra(
    graph,
    graph.find(tile => tile.x === start.x && tile.y === start.y),
    graph.find(tile => tile.x === goal.x && tile.y === goal.y)  
  );

  return shortestPath;
};