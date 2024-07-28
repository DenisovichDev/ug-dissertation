import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

class Convergence:
    def __init__(self, tolerance=1):
        """
        Initialize the ConvergencePlotter.

        :param tolerance: Tolerance for considering the solution as stable.
        """
        self.iterations = []
        self.best_distances = []
        self.convergence_data = []
        self.tolerance = tolerance

    def add_iteration(self, iteration, best_distance):
        """
        Add the best distance of the current iteration to the plotter.

        :param iteration: The current iteration number.
        :param best_distance: The best distance found in the current iteration.
        """
        self.iterations.append(iteration)
        self.best_distances.append(best_distance)
        self.convergence_data.append((iteration, best_distance))

    def plot_convergence(self):
        """
        Plot the convergence chart using seaborn.
        """
        sns.set_theme(style="whitegrid")
        plt.figure(figsize=(10, 6))
        sns.lineplot(x=self.iterations, y=self.best_distances, marker='o')
        plt.xlabel('Iteration')
        plt.ylabel('Best Distance')
        plt.title('Convergence Chart')
        plt.grid(True)
        plt.show()

    def calculate_convergence_rate(self):
        """
        Calculate the convergence rate.

        :return: The iteration at which the solution is considered stable.
        """
        stable_iteration = None
        for i in range(1, len(self.best_distances)):
            if np.abs(self.best_distances[i] - self.best_distances[i-1]) < self.tolerance:
                stable_iteration = i
                break
        if stable_iteration is None:
            stable_iteration = len(self.best_distances) - 1
        return stable_iteration