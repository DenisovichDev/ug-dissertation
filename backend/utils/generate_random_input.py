import random

def generate_weighted_graph(num_vertices, num_edges, filename="data/input/graph.txt"):
    edges = set()
    
    while len(edges) < num_edges:
        u = random.randint(0, num_vertices - 1)
        v = random.randint(0, num_vertices - 1)
        if u != v:
            weight = random.randint(1, 100)
            edges.add((u, v, weight))

    with open(filename, 'w') as f:
        f.write(f"u\n")
        print("Edges: ")
        print("[", end="")
        for u, v, weight in edges:
            f.write(f"{u} {v} {weight}\n")
            print(f"({u}, {v}, {weight}),", end=" ")
        print("]")

    print("Nodes: ")
    print("[", end="")
    for i in range(num_vertices):
        print(i, end=", ")
    print("]")

# Example usage
num_vertices = 200
num_edges = 1000 # Adjust this number to make the graph larger
generate_weighted_graph(num_vertices, num_edges)
