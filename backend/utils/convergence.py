import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from scipy.ndimage import uniform_filter1d

class Convergence:
    def __init__(self, tolerance=5, window_size=10, std_dev_threshold=0.01):
        """
        Initialize the ConvergencePlotter.

        :param tolerance: Tolerance for considering the solution as stable.
        :param window_size: Size of the moving average window.
        :param std_dev_threshold: Standard deviation threshold for convergence.
        """
        self.iterations = []
        self.best_distances = []
        self.convergence_data = []
        self.tolerance = tolerance
        self.window_size = window_size
        self.std_dev_threshold = std_dev_threshold

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
        sns.lineplot(x=self.iterations, y=self.best_distances, marker='o', label='Best Distance')
        plt.xlabel('Iteration')
        plt.ylabel('Best Distance')
        plt.title('Convergence Chart')
        plt.grid(True)
        plt.legend()
        plt.show()

    def calculate_convergence_rate(self):
        """
        Calculate the convergence rate using moving average and standard deviation.

        :return: The iteration at which the solution is considered stable.
        """
        if len(self.best_distances) < self.window_size:
            return len(self.best_distances) - 1

        # Apply moving average
        smoothed_distances = uniform_filter1d(self.best_distances, size=self.window_size)
        
        # Compute standard deviation of the smoothed distances
        rolling_std_dev = np.convolve(self.best_distances, np.ones(self.window_size)/self.window_size, mode='valid')
        
        # Identify convergence point based on standard deviation
        stable_iteration = None
        for i in range(self.window_size - 1, len(rolling_std_dev)):
            if np.std(rolling_std_dev[i-self.window_size+1:i+1]) < self.std_dev_threshold:
                stable_iteration = self.iterations[i]
                break
        
        if stable_iteration is None:
            stable_iteration = self.iterations[-1]
        
        return stable_iteration
