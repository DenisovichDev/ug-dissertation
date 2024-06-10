from models.aco.AntColony import AntColony
from graph.input import create_adjacency_matrix


mat, nodes = create_adjacency_matrix("graph.txt")
ac = AntColony(mat, 2, 1, 100, 0.95, 1, 2)
path = ac.run()

with open("data/output/graph.txt", "w") as f:
    f.write(str(path[0]))
    f.write(str(path[1]))