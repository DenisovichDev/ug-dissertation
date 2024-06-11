from models.aco.AntColony import AntColony
from graph.input import create_adjacency_matrix, get_graph

nodes, edges, check = get_graph("graph.txt")
mat, nodes = create_adjacency_matrix(nodes, edges, check)
ac = AntColony(mat, 2, 1, 100, 0.95, 1, 2)
path = ac.run()

with open("data/output/graph.txt", "w") as f:
    f.write(f"{str(path[0])}\n")
    f.write(str(path[1]))