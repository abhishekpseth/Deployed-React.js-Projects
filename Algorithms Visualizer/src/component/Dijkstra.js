const Dijkstra = (grid, source, destination) => {
  let visitedNodes = [];
  let shortestPath = [];

  if (source[0] === destination[0] && source[1] === destination[1]) {
    return {
      visitedNodes: [],
      shortestPath: [source],
    };
  }

  const queue = [];
  const n = grid.length;
  const m = grid[0].length;

  const dist = new Array(n).fill().map(() => new Array(m).fill(1e9));
  dist[source[0]][source[1]] = 0;
  queue.push([0, [source[0], source[1]]]);

  const previous = new Array(n).fill().map(() => new Array(m).fill(null));

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length > 0) {
    const [dis, [r, c]] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const newr = r + dr[i];
      const newc = c + dc[i];

      if (
        newr >= 0 &&
        newr < n &&
        newc >= 0 &&
        newc < m &&
        grid[newr][newc] === 1 &&
        dis + 1 < dist[newr][newc]
      ) {
        dist[newr][newc] = 1 + dis;
        previous[newr][newc] = [r, c]; 

        if (newr === destination[0] && newc === destination[1]) {
          let current = [newr, newc];
          while (current) {
            shortestPath.unshift(current);
            current = previous[current[0]][current[1]];
          }
          return { visitedNodes, shortestPath };
        }

        queue.push([1 + dis, [newr, newc]]);
        visitedNodes.push([newr, newc]);
      }
    }
  }
  
  return { visitedNodes, shortestPath: [] }; // If no path is found
};

export default Dijkstra;
