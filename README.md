# UG Dissertation

Our final year dissertation project. The topic, at least for now, "Metaheuristic Models for Solving Travelling Salesperson Problems"

## Metaheuristic Models

- [x] Ant Colony Optimization (ACO)  @Ra20r
- [x] Particle Swarm Optimisation (PSO)  @Ra20r
- [x] Artificial Bee Colony (ABC)  @Ra20r
- [x] Genetic Algorithm (GA)  @denisovichdev
- [x] Simulated Annealing (SA)  @denisovichdev

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
  - /pso
    - Purpose: Takes graph and other parameters and runs the Particle Swarm Optimization (PSO) model to solve the TSP and return the optimal path
    - Params:
      - "graph": dictionary containing graph data
        - "nodes": list of nodes (nodes are integers)
        - "edges": list of tuples (node, node, weight), weights can be floating
        - "check": "u" if the graph is undirected, "d" otherwise
      - "params": dictionary containing data for
        - "n_particles": number of particles in the swarm (int)
        - "n_iterations": number of iterations the algorithm will run (int)
        - "w": inertia weight to control the impact of previous velocities on the current velocity (float, optional, default=0.5)
        - "c1": cognitive parameter, the factor for personal best (float, optional, default=1)
        - "c2": social parameter, the factor for global best (float, optional, default=2)
  - /abc
    - Purpose: Takes graph and other parameters and runs the Artificial Bee Colony (ABC) model to solve the TSP and return the optimal path
    - Params:
      - "graph": dictionary containing graph data
        - "nodes": list of nodes (nodes are integers)
        - "edges": list of tuples (node, node, weight), weights can be floating
        - "check": "u" if the graph is undirected, "d" otherwise
      - "params": dictionary containing data for
        - "n_bees": number of bees in the colony (int)
        - "n_iterations": number of iterations the algorithm will run (int)
        - "limit": limit for the number of iterations a bee can stay in the employed phase (int)
  - /sa
    - Purpose: Takes graph and other parameters and runs the Simulated Annealing (SA) model to solve the Traveling Salesman Problem (TSP) and return the optimal path.
    - Params:
      - "graph": dictionary containing graph data
        - "nodes": list of nodes (nodes are integers)
        - "edges": list of tuples (node, node, weight), weights can be floating
        - "check": "u" if the graph is undirected, "d" otherwise
      - "params": dictionary containing data for
        - "n_iterations": number of iterations the algorithm will run (int)
        - "initial_temp": initial temperature for the annealing process (float)
        - "cooling_rate": rate at which the temperature decreases (float)
  - /generate_complete_graph
    - Purpose: Generate a random complete graph for given number of vertices
    - Params:
      - "num_vertices": number of vertices in the graph
      - "type": type of graph (u/d)

## How To Run

```docker compose up```
