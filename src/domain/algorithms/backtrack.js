export default function (current, source) {
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