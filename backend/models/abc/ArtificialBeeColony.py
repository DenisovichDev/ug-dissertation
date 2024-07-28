import numpy as np
import random
from tqdm import tqdm
from utils.convergence import Convergence
import time

"""
    Initialize the Artificial Bee Colony Optimization algorithm.

    :param distances: 2D numpy array representing the distances between nodes.
    :param n_bees: Number of bees used in each iteration.
        - More bees can explore more paths but increase computational load.
    :param n_iterations: Number of iterations the algorithm will run.
        - More iterations allow for more exploration and refinement of solutions.
    :param limit: The limit for the number of trials for a food source before it is abandoned.
        - A higher limit allows more exploration of a given food source, but may delay finding better solutions.
"""

class ArtificialBeeColony:
    def __init__(self, distances, n_bees, n_iterations, limit, backend_test=False):
        self.distances = distances
        self.n_bees = n_bees
        self.n_iterations = n_iterations
        self.limit = limit
        self.backend_test = backend_test
        self.convergence = Convergence()
        self.n_nodes = len(distances)
        self.food_sources = self.initialize_food_sources()

    def initialize_food_sources(self):
        """
            Initialize food sources randomly.

            :return: List of food sources, each represented as a path.
        """
        food_sources = []
        for _ in range(self.n_bees):
            path = np.random.permutation(self.n_nodes).tolist()
            food_sources.append(path)
        return food_sources

    def calculate_fitness(self, path):
        """
            Calculate the fitness of a given path.

            :param path: List of nodes representing the path.
            :return: Fitness value of the path.
        """
        total_dist = sum([self.distances[path[i]][path[i + 1]] for i in range(len(path) - 1)])
        total_dist += self.distances[path[-1]][path[0]]  # return to the starting node
        return 1 / (1 + total_dist)

    def run(self):
        """
            Run the ABC algorithm and return the shortest path found.

            :return: Tuple of the shortest path and its distance.
        """
        best_path = None
        best_fitness = -np.inf
        trials = np.zeros(self.n_bees)

        time_a = time.time()
        for iteration in tqdm(range(self.n_iterations), desc="employing bees..."):
            for i in range(self.n_bees):
                new_path = self.generate_new_path(self.food_sources[i])
                new_fitness = self.calculate_fitness(new_path)
                if new_fitness > self.calculate_fitness(self.food_sources[i]):
                    self.food_sources[i] = new_path
                    trials[i] = 0
                else:
                    trials[i] += 1

            fitness_values = [self.calculate_fitness(path) for path in self.food_sources]
            total_fitness = sum(fitness_values)
            probabilities = [fitness / total_fitness for fitness in fitness_values]

            for _ in range(self.n_bees):
                selected_index = np.random.choice(range(self.n_bees), p=probabilities)
                new_path = self.generate_new_path(self.food_sources[selected_index])
                new_fitness = self.calculate_fitness(new_path)
                if new_fitness > self.calculate_fitness(self.food_sources[selected_index]):
                    self.food_sources[selected_index] = new_path
                    trials[selected_index] = 0
                else:
                    trials[selected_index] += 1

            for i in range(self.n_bees):
                if trials[i] > self.limit:
                    self.food_sources[i] = np.random.permutation(self.n_nodes).tolist()
                    trials[i] = 0

            best_index = np.argmax(fitness_values)
            if fitness_values[best_index] > best_fitness:
                best_fitness = fitness_values[best_index]
                best_path = self.food_sources[best_index]

            self.convergence.add_iteration(iteration, 1 / (1 + best_fitness))

        time_b = time.time()

        if self.backend_test:
            self.convergence.plot_convergence()
        best_circuit = []
        for i in range(len(best_path)-1):
            best_circuit.append((best_path[i], best_path[i+1]))
        return best_circuit, 1 / (1 + best_fitness), self.convergence.convergence_data, self.convergence.calculate_convergence_rate(), time_b - time_a

    def generate_new_path(self, path):
        """
            Generate a new path by making a small change to the given path.

            :param path: List of nodes representing the current path.
            :return: New path with a small change.
        """
        new_path = path.copy()
        i, j = random.sample(range(len(path)), 2)
        new_path[i], new_path[j] = new_path[j], new_path[i]
        return new_path
