from models.aco.AntColony import AntColony
from models.ga.GeneticAlgorithm import GeneticAlgorithm
from graph.input import create_adjacency_matrix, get_graph

nodes, edges, check = get_graph("graph.txt")
mat, nodes = create_adjacency_matrix(nodes, edges, check)
# ac = AntColony(mat, 2, 1, 100, 0.95, 1, 2)
ga = GeneticAlgorithm(mat, 100, 0.01, 500, 5)
path = ga.run()

with open("backend/data/output/graph.txt", "w") as f:
    f.write(f"{str(path[0])}\n")
    f.write(str(path[1]))
