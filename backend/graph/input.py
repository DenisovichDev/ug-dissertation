import numpy as np

# Function to read the graph from a file and create an adjacency matrix
def create_adjacency_matrix(filename):
    filename = f"data/input/{filename}"
    # Read the file and collect edges
    edges = []
    nodes = set()
    check = ""
    with open(filename, 'r') as file:
        check = file.readline().strip()
        for line in file:
            node1, node2, weight = line.split()
            node1, node2 = int(node1), int(node2)
            weight = float(weight)
            edges.append((node1, node2, weight))
            nodes.update([node1, node2])
    
    # Create a sorted list of nodes to maintain a consistent order
    sorted_nodes = sorted(nodes)
    node_index = {node: i for i, node in enumerate(sorted_nodes)}

    # Initialize an adjacency matrix with zeros
    size = len(sorted_nodes)
    adjacency_matrix = np.zeros((size, size))

    # Populate the adjacency matrix
    for node1, node2, weight in edges:
        i, j = node_index[node1], node_index[node2]
        adjacency_matrix[i][j] = weight
        if check == "u":
            adjacency_matrix[j][i] = weight  # Assuming an undirected graph

    return adjacency_matrix, sorted_nodes

if __name__ == "__main__":
    # Example usage
    filename = 'graph.txt'
    adj_matrix, nodes = create_adjacency_matrix(filename)

    print("Adjacency Matrix:")
    print(adj_matrix)
    print("Nodes:", nodes)
