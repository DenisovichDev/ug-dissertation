import numpy as np
import random
from tqdm import tqdm
from utils.convergence import Convergence
from time import time

class ParticleSwarmOptimization:
    def __init__(self, distances, n_particles, n_iterations, w=0.5, c1=1, c2=2, backend_test=False):
        self.distances = distances
        self.n_particles = n_particles
        self.n_iterations = n_iterations
        self.w = w
        self.c1 = c1
        self.c2 = c2
        self.backend_test = backend_test
        self.convergence = Convergence()
        self.num_nodes = len(distances)
        self.swarm = [self.create_particle() for _ in range(n_particles)]

    def create_particle(self):
        position = np.random.permutation(self.num_nodes)
        velocity = np.zeros((self.num_nodes, self.num_nodes))
        best_position = position.copy()
        best_distance = self.calculate_total_distance(position)
        return {'position': position, 'velocity': velocity, 'best_position': best_position, 'best_distance': best_distance}

    def calculate_total_distance(self, position):
        total_distance = 0
        for i in range(len(position) - 1):
            total_distance += self.distances[position[i], position[i + 1]]
        total_distance += self.distances[position[-1], position[0]]  # Return to the starting node
        return total_distance

    def run(self):
        global_best_position = None
        global_best_distance = np.inf

        time_a = time()
        for iteration in tqdm(range(self.n_iterations), desc="moving particles..."):
            for particle in self.swarm:
                current_distance = self.calculate_total_distance(particle['position'])
                if current_distance < particle['best_distance']:
                    particle['best_position'] = particle['position'].copy()
                    particle['best_distance'] = current_distance

                if current_distance < global_best_distance:
                    global_best_position = particle['position'].copy()
                    global_best_distance = current_distance

            for particle in self.swarm:
                new_velocity = self.w * particle['velocity'] \
                               + self.c1 * random.random() * (particle['best_position'] - particle['position']) \
                               + self.c2 * random.random() * (global_best_position - particle['position'])
                particle['velocity'] = new_velocity
                particle['position'] = self.update_position(particle['position'], particle['velocity'])

            self.convergence.add_iteration(iteration, global_best_distance)
        time_b = time()

        if self.backend_test:
            self.convergence.plot_convergence()
        best_path = []
        for i in range(len(global_best_position)-1):
            best_path.append((global_best_position[i], global_best_position[i+1]))
        return best_path, global_best_distance, self.convergence.convergence_data, self.convergence.calculate_convergence_rate(), time_b - time_a

    def update_position(self, position, velocity):
        # Translate velocity into permutations
        perm = np.argsort(velocity.sum(axis=1))
        new_position = position.copy()
        for i in range(self.num_nodes):
            swap_idx = perm[i]
            new_position[i], new_position[swap_idx] = new_position[swap_idx], new_position[i]
        return new_position
