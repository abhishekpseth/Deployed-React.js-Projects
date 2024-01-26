const Dijkstra = (grid, source, destination) => {
  let visitedNodes = [];
  let shortestPath = [];

  // Edge Case: if the source is only the destination.
  if (source[0] === destination[0] && source[1] === destination[1]) {
    return {
      visitedNodes: [],
      shortestPath: [source],
    };
  }

  // Create a queue for storing cells with their distances from source
  // in the form {dist, {cell coordinates pair}}.
  const queue = [];
  const n = grid.length;
  const m = grid[0].length;

  // Create a distance matrix with initially all the cells marked as
  // unvisited and the source cell as 0.
  const dist = new Array(n).fill().map(() => new Array(m).fill(1e9));
  dist[source[0]][source[1]] = 0;
  queue.push([0, [source[0], source[1]]]);

  // Create a matrix to store the previous cell in the shortest path.
  const previous = new Array(n).fill().map(() => new Array(m).fill(null));

  // The following delta rows and delta columns array are created such that
  // each index represents each adjacent node that a cell may have
  // in a direction.
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  // Iterate through the maze by shifting elements out of the queue
  // and pushing whenever a shorter distance to a cell is found.
  while (queue.length > 0) {
    const [dis, [r, c]] = queue.shift();

    // Through this loop, we check the 4 direction adjacent nodes
    // for a shorter path to the destination.
    for (let i = 0; i < 4; i++) {
      const newr = r + dr[i];
      const newc = c + dc[i];

      // Checking the validity of the cell and updating if dist is shorter.
      if (
        newr >= 0 &&
        newr < n &&
        newc >= 0 &&
        newc < m &&
        grid[newr][newc] === 1 &&
        dis + 1 < dist[newr][newc]
      ) {
        dist[newr][newc] = 1 + dis;
        previous[newr][newc] = [r, c]; // Update the previous cell in the path.

        // Return the visited nodes and shortest path when we encounter the destination cell.
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

  // If no path is found from source to destination.
  return { visitedNodes, shortestPath: [] };
};

export default Dijkstra;
