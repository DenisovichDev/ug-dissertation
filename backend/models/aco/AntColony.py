import numpy as np
import random
from tqdm import tqdm

"""
    Initialize the Ant Colony Optimization algorithm.

    :param distances: 2D numpy array representing the distances between nodes.
    :param n_ants: Number of ants used in each iteration.
        - More ants can explore more paths but increase computational load.
    :param n_best: Number of best ants whose pheromone contributions will be used to update the pheromone trails.
        - Using the best ants focuses the search on high-quality solutions.
    :param n_iterations: Number of iterations the algorithm will run.
        - More iterations allow for more exploration and refinement of solutions.
    :param decay: The rate at which pheromone trails evaporate (between 0 and 1).
        - A higher decay rate (closer to 1) reduces the influence of past solutions quickly, encouraging exploration.
        - A lower decay rate (closer to 0) retains pheromone longer, encouraging exploitation.
    :param alpha: Pheromone importance parameter.
        - Higher values give more importance to pheromone levels, potentially leading to quicker convergence on popular paths.
        - Lower values reduce the impact of pheromone, increasing randomness and exploration.
    :param beta: Heuristic importance parameter.
        - Higher values give more importance to heuristic information (e.g., inverse distance), useful when the heuristic is reliable.
        - Lower values make the heuristic less influential, increasing exploration.
"""

class AntColony:
    def __init__(self, distances, n_ants, n_best, n_iterations, decay, alpha=1, beta=1):
        self.distances = distances
        self.pheromone = np.ones(self.distances.shape) / len(distances)
        self.pheromone[self.distances == 0] = 0
        self.all_inds = range(len(distances))
        self.n_ants = n_ants
        self.n_best = n_best
        self.n_iterations = n_iterations
        self.decay = decay
        self.alpha = alpha
        self.beta = beta

    def run(self):
        """
            Run the ACO algorithm and return the shortest path found.

            :return: Tuple of the shortest path and its distance.
        """
        shortest_path = None
        all_time_shortest_path = ("", np.inf)
        for _ in tqdm(range(self.n_iterations), desc="running..."):
            all_paths = self.gen_all_paths()
            self.spread_pheronome(all_paths, self.n_best)
            shortest_path = min(all_paths, key=lambda x: x[1])
            if shortest_path[1] < all_time_shortest_path[1]:
                all_time_shortest_path = shortest_path            
            self.pheromone *= self.decay
        return all_time_shortest_path

    def spread_pheronome(self, all_paths, n_best):
        """
            Update the pheromone trails based on the paths found by the ants.

            :param all_paths: List of all paths and their distances.
            :param n_best: Number of best paths to use for updating pheromones.
            :param shortest_path: The current shortest path found.
        """
        sorted_paths = sorted(all_paths, key=lambda x: x[1])
        for path, _ in sorted_paths[:n_best]:
            for move in path:
                if self.distances[move]:
                    self.pheromone[move] += 1.0 / self.distances[move]
                
    def gen_path_dist(self, path):
        """
            Calculate the total distance of a path.

            :param path: List of edges representing the path.
            :return: Total distance of the path.
        """
        total_dist = 0
        for ele in path:
            total_dist += self.distances[ele]
        return total_dist

    def gen_all_paths(self):
        """
            Generate paths for all ants.

            :return: List of all paths and their distances.
        """
        all_paths = []
        for _ in range(self.n_ants):
            start = random.randint(0, len(self.distances)-1)
            path = self.gen_path(start)
            all_paths.append((path, self.gen_path_dist(path)))
        return all_paths

    def gen_path(self, start): 
        """
            Generate a path starting from a given node.

            :param start: Starting node.
            :return: List of edges representing the path.
        """
        path = []
        visited = set()
        visited.add(start)
        prev = start
        for _ in range(len(self.distances) - 1):
            move = self.pick_move(self.pheromone[prev], self.distances[prev], visited)
            path.append((prev, move))
            prev = move
            visited.add(move)
        path.append((prev, start)) # going back to where we started    
        return path

    def pick_move(self, pheromone, dist, visited):
        """
            Pick the next move based on pheromone levels and distances.

            :param pheromone: Current pheromone levels.
            :param dist: Distances from the current node.
            :param visited: Set of visited nodes.
            :return: The next node to move to.
        """
        # Copy pheromone levels and set pheromone of visited nodes to 0
        pheromone = np.copy(pheromone)
        pheromone[list(visited)] = 0

        # Calculate probabilities based on pheromone and heuristic information
        with np.errstate(divide='ignore', invalid='ignore'):
            heuristic = np.where(dist > 0, 1.0 / dist, 0)  # Set heuristic to 0 where distance is 0
            row = pheromone ** self.alpha * (heuristic ** self.beta)
            row = np.nan_to_num(row, nan=0.0, posinf=0.0, neginf=0.0)  # Replace NaN and inf values with 0

        # Normalize the probabilities
        norm_row = row / row.sum()

        # Check for NaN values in norm_row and handle the case where sum is zero
        if np.isnan(norm_row).any() or norm_row.sum() == 0:
            unvisited = list(set(self.all_inds) - visited)
            move = random.choice(unvisited)
        else:
            move = np.random.choice(self.all_inds, 1, p=norm_row)[0]

        return move