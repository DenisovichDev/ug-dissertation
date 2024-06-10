import os, sys

sys.path.append(os.getcwd())

import networkx as nx
import matplotlib.pyplot as plt
from graph.input import create_adjacency_matrix

if __name__ == "__main__":
    filename = input("Enter filename: ")
    adj_matrix, nodes = create_adjacency_matrix(filename)
    # Create a graph from the adjacency matrix
    G = nx.Graph()

    for i, node1 in enumerate(nodes):
        for j, node2 in enumerate(nodes):
            if adj_matrix[i][j] != 0:
                G.add_edge(node1, node2, weight=adj_matrix[i][j])

    # Visualize the graph
    pos = nx.spring_layout(G)  # positions for all nodes

    # nodes
    nx.draw_networkx_nodes(G, pos, node_size=700)

    # edges
    nx.draw_networkx_edges(G, pos, width=6)
    nx.draw_networkx_edges(
        G, pos, edgelist=G.edges(data=True), width=6, alpha=0.5, edge_color="b", style="dashed"
    )

    # labels
    nx.draw_networkx_labels(G, pos, font_size=20, font_family="sans-serif")
    edge_labels = nx.get_edge_attributes(G, 'weight')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)

    plt.axis("off")  # turn off the axis
    plt.show()
