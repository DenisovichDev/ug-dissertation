# UG Dissertation

Our final year dissertation project. The topic, at least for now, "Metaheuristic Models for Solving Travelling Salesperson Problems"

## Metaheuristic Models

- [x] Ant Colony Optimization (ACO)  @Ra20r
- [ ] Particle Swarm Optimisation (PSO)  @Ra20r
- [ ] Artificial Bee Colony (ABC)  @Ra20r
- [x] Genetic Algorithm (GA)  @denisovichdev
- [ ] Simulated Annealing (SA)  @denisovichdev

## To-Do

- Calculate and record individual statistics like convergence rate and heuristic data (like pheromone evaporation in ACO)
- Plot all
- Compare all five models with identical params to see which one:
  - Converges to the best solution
  - Is the fastest to converge

## Technicals

- Internal API endpoints (POST unless mentioned otherwise):
  - /hello
    - Purpose: Says hello
    - Params:
      - "name" : send any string
  - /aco
    - Purpose: Takes graph and other parameters and runs the ACO model to get the optimal path and return it
    - Params:
      - "graph": dictionary containing graph data
        - "nodes": list of nodes (nodes are integers)
        - "edges": list of tuples (node node weight, weights can be floating), corresponding to edges
        - "check": "u" if graph is undirected "d" otherwise
      - "params": dictionary containing data for
        - "n_ants": number of ants (int)
        - "n_best": number of best ants to choose for pheromone updation (int)
        - "n_iterations": number of iterations for the model (int)
        - "decay": pheromone decay rate (float)
        - "alpha": pheromone importance factor (int)
        - "beta": heuristic importance factor (int)
  - **/ga**
    - **Purpose**: Takes graph and other parameters and runs the Genetic Algorithm (GA) model to solve the TSP and return the optimal path
    - **Params**:
      - `"graph"`: dictionary containing graph data
        - `"nodes"`: list of nodes (nodes are integers)
        - `"edges"`: list of tuples (node, node, weight), weights can be floating
        - `"check"`: `"u"` if the graph is undirected, `"d"` otherwise
      - `"params"`: dictionary containing data for
        - `"population_size"`: number of individuals in the population (int)
        - `"mutation_rate"`: probability of mutation for each individual (float)
        - `"n_generations"`: number of generations the algorithm will run (int)
        - `"elitism_size"`: number of top individuals to carry over to the next generation unchanged (int)
  - /generate_complete_graph
    - Purpose: Generate a random complete graph for given number of vertices
    - Params:
      - "num_vertices": number of vertices in the graph
      - "type": type of graph (u/d)

## How To Run

```docker compose up```
