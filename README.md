# UG Dissertation

Our final year dissertation project. The topic, at least for now, "Metaheuristic Models for Solving Travelling Salesperson Problems"

## Metaheuristic Models

- [ ] Ant Colony Optimization (ACO)
- [ ] Particle Swarm Optimisation (PSO)
- [ ] Artificial Bee Colony (ABC)
- [ ] Two more (BHASWAR CHAKRABORTY)

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
        - "edges": list of tuples (edge edge weight, weights can be floating), corresponding to edges
        - "check": "u" if graph is undirected "d" otherwise
      - "params": dictionary containing data for
        - "n_ants": number of ants (int)
        - "n_best": number of best ants to choose for pheromone updation (int)
        - "n_iterations": number of iterations for the model (int)
        - "decay": pheromone decay rate (float)
        - "alpha": pheromone importance factor (int)
        - "beta": heuristic importance factor (int)