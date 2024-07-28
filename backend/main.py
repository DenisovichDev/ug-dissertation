from models.aco.AntColony import AntColony
from models.ga.GeneticAlgorithm import GeneticAlgorithm
from models.pso.ParticleSwarm import ParticleSwarmOptimization
from models.abc.ArtificialBeeColony import ArtificialBeeColony
from models.sa.SimulatedAnnealing import SimulatedAnnealing
from graph.input import create_adjacency_matrix, get_graph

graph_file = input("Enter name of graph file: ")

nodes, edges, check = get_graph(f"{graph_file}.txt")
mat, nodes = create_adjacency_matrix(nodes, edges, check)
# model = AntColony(mat, 2, 1, 500, 0.95, 1, 2, True)
# model = GeneticAlgorithm(mat, 100, 0.01, 500, 5, True)
# model = ParticleSwarmOptimization(mat, 30, 500, 0.5, 1, 2, True)
# model = ArtificialBeeColony(mat, 10, 500, 10, True)
model = SimulatedAnnealing(mat, 500, 1000, 0.95, True)
path = model.run()

with open("backend/data/output/graph.txt", "w") as f:
    f.write(f"{str(path[0])}\n")
    f.write(f"{str(path[1])}\n")
    f.write(f"{str(path[2])}\n")
    f.write(f"{str(path[3])}\n")
