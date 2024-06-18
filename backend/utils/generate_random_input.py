import random, sys

def generate_weighted_graph(num_vertices, num_edges, filename="backend/data/input/graph.txt"):
    edges = set()
    
    while len(edges) < num_edges:
        u = random.randint(0, num_vertices - 1)
        v = random.randint(0, num_vertices - 1)
        if u != v:
            weight = random.randint(1, 100)
            edges.add((u, v, weight))

    with open(filename, 'w') as f:
        f.write(f"u\n")
        print("\"edges\" : ", end="")
        print("[", end="")
        for u, v, weight in edges:
            f.write(f"{u} {v} {weight}\n")
            print(f"[{u}, {v}, {weight}],", end=" ")
        print("]")

    print("\"nodes\" : ", end="")
    print("[", end="")
    for i in range(num_vertices):
        print(i, end=", ")
    print("]")

def generate_complete_weighted_graph(num_vertices, filename="backend/data/input/graph.txt"):
    edges = set()

    for i in range(num_vertices):
        for j in range(num_vertices):
            if i != j:
                weight = random.randint(1, 100)
                edges.add((i, j, weight))

    with open(filename, 'w') as f:
        f.write(f"u\n")
        print("\"edges\" : ", end="")
        print("[", end="")
        for u, v, weight in edges:
            f.write(f"{u} {v} {weight}\n")
            print(f"[{u}, {v}, {weight}],", end=" ")
        print("]")

    print("\"nodes\" : ", end="")
    print("[", end="")
    for i in range(num_vertices):
        print(i, end=", ")
    print("]")
    return edges

# Example usage
if __name__ == "__main__":
    # Adjust manually or command line argument
    # Argument #1 is vertices, #2 is edges
    num_vertices = 100 if len(sys.argv) <= 1 else int(sys.argv[1])
    generate_complete_weighted_graph(num_vertices)
