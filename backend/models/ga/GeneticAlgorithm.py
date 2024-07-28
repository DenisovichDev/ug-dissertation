import numpy as np
import random
import time
from tqdm import tqdm
from utils.convergence import Convergence

class GeneticAlgorithm:
    def __init__(self, distances, population_size, mutation_rate, n_generations, elitism_size=1, backend_test=False):
        """
        Initialize the Genetic Algorithm for the TSP.

        :param distances: 2D numpy array representing the distances between nodes.
        :param population_size: Number of individuals in the population.
        :param mutation_rate: Probability of mutation for each individual.
        :param n_generations: Number of generations the algorithm will run.
        :param elitism_size: Number of top individuals to carry over to the next generation unchanged.
        """
        self.distances = distances
        self.population_size = population_size
        self.mutation_rate = mutation_rate
        self.n_generations = n_generations
        self.elitism_size = elitism_size
        self.num_cities = distances.shape[0]
        self.population = self.initialize_population()
        self.convergence = Convergence()
        self.backend_test = backend_test

    def initialize_population(self):
        """
        Initialize the population with random tours.

        :return: List of individuals representing the population.
        """
        population = []
        for _ in range(self.population_size):
            tour = np.random.permutation(self.num_cities)
            population.append(tour)
        return population

    def run(self):
        """
        Run the GA and return the best tour found.

        :return: Tuple of the best tour and its distance.
        """
        best_tour = None
        best_distance = np.inf
        time_a = time.time()
        for generation in tqdm(range(self.n_generations), desc="generations..."):
            self.population = self.evolve_population()
            current_best_tour = self.get_best_tour()
            current_best_distance = self.tour_distance(current_best_tour)

            if current_best_distance < best_distance:
                best_tour = current_best_tour
                best_distance = current_best_distance
            self.convergence.add_iteration(generation, best_distance)
        time_b = time.time()

        if self.backend_test:
            self.convergence.plot_convergence()
        best_path = []
        for i in range(len(best_tour)-1):
            best_path.append((best_tour[i], best_tour[i+1]))
        return best_path, best_distance, self.convergence.convergence_data, self.convergence.calculate_convergence_rate(), time_b - time_a

    def evolve_population(self):
        """
        Evolve the population through selection, crossover, and mutation.

        :return: New population after evolution.
        """
        new_population = []
        sorted_population = sorted(self.population, key=self.tour_distance)
        new_population.extend(sorted_population[:self.elitism_size])  # Elitism

        while len(new_population) < self.population_size:
            parent1, parent2 = self.select_parents()
            offspring1, offspring2 = self.crossover(parent1, parent2)
            new_population.append(self.mutate(offspring1))
            if len(new_population) < self.population_size:
                new_population.append(self.mutate(offspring2))

        return new_population

    def select_parents(self):
        """
        Select two parents using tournament selection.

        :return: Two selected parents.
        """
        tournament_size = 5
        tournament = random.sample(self.population, tournament_size)
        parent1 = min(tournament, key=self.tour_distance)
        parent2 = min(random.sample(self.population, tournament_size), key=self.tour_distance)
        return parent1, parent2

    def crossover(self, parent1, parent2):
        """
        Perform ordered crossover between two parents.

        :param parent1: First parent tour.
        :param parent2: Second parent tour.
        :return: Two offspring tours.
        """
        start, end = sorted(random.sample(range(self.num_cities), 2))
        offspring1 = np.zeros(self.num_cities, dtype=int) - 1
        offspring2 = np.zeros(self.num_cities, dtype=int) - 1

        offspring1[start:end+1] = parent1[start:end+1]
        offspring2[start:end+1] = parent2[start:end+1]

        self.fill_offspring(offspring1, parent2, end)
        self.fill_offspring(offspring2, parent1, end)

        return offspring1, offspring2

    def fill_offspring(self, offspring, parent, end):
        """
        Fill the remaining cities in the offspring with the order of the parent.

        :param offspring: Offspring tour to be filled.
        :param parent: Parent tour used as reference for filling.
        :param end: End index of the crossover section.
        """
        fill_index = (end + 1) % self.num_cities
        for city in parent:
            if city not in offspring:
                while offspring[fill_index] != -1:
                    fill_index = (fill_index + 1) % self.num_cities
                offspring[fill_index] = city

    def mutate(self, tour):
        """
        Perform swap mutation on a tour with a given mutation rate.

        :param tour: Tour to be mutated.
        :return: Mutated tour.
        """
        for i in range(self.num_cities):
            if random.random() < self.mutation_rate:
                j = random.randint(0, self.num_cities - 1)
                tour[i], tour[j] = tour[j], tour[i]
        return tour

    def tour_distance(self, tour):
        """
        Calculate the total distance of a tour.

        :param tour: Tour to calculate the distance for.
        :return: Total distance of the tour.
        """
        total_dist = 0
        for i in range(self.num_cities):
            total_dist += self.distances[tour[i-1], tour[i]]
        return total_dist

    def get_best_tour(self):
        """
        Get the best tour in the current population.

        :return: Best tour in the population.
        """
        return min(self.population, key=self.tour_distance)


