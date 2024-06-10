from models.aco.AntColony import AntColony
from graph.input import create_adjacency_matrix


mat, nodes = create_adjacency_matrix("graph.txt")
ac = AntColony(mat, 100, 50, 100, 0.95, 1, 2)
path = ac.run()

with open("data/output/graph.txt", "w") as f:
    f.write(path[0])
    f.write(path[1])