from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph.input import create_adjacency_matrix
from models.aco.AntColony import AntColony
from models.ga.GeneticAlgorithm import GeneticAlgorithm
from models.pso.ParticleSwarm import ParticleSwarmOptimization
from models.abc.ArtificialBeeColony import ArtificialBeeColony
from utils.convert_to_native_type import convert_numpy_types
from utils.generate_random_input import generate_complete_weighted_graph
import numpy as np

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/aco")
async def aco(params: dict, graph: dict):
    graph = create_adjacency_matrix(graph["nodes"], graph["edges"], graph["check"])
    meta_h = AntColony(graph[0], params["n_ants"], params["n_best"], params["n_iterations"], params["decay"], params["alpha"], params["beta"])
    r = meta_h.run()
    response = {
        "path": r[0],
        "cost": r[1],
        "convergence_data": r[2],
        "convergence_rate": r[3],
        "time_elapsed": r[4]
    }
    if r[1] == np.inf:
        response = {
            "path": [],
            "cost": 0.0,
            "convergence_data": [],
            "convergence_rate": 0.0,
            "time_elapsed": 0.0
        }
    response = convert_numpy_types(response)
    return response

@app.post("/abc")
async def aco(params: dict, graph: dict):
    graph = create_adjacency_matrix(graph["nodes"], graph["edges"], graph["check"])
    meta_h = ArtificialBeeColony(graph[0], params["n_bees"], params["n_iterations"], params["n_iterations"], params["limit"])
    r = meta_h.run()
    response = {
        "path": r[0],
        "cost": r[1],
        "convergence_data": r[2],
        "convergence_rate": r[3],
        "time_elapsed": r[4]
    }
    if r[1] == np.inf:
        response = {
            "path": [],
            "cost": 0.0,
            "convergence_data": [],
            "convergence_rate": 0.0,
            "time_elapsed": 0.0
        }
    response = convert_numpy_types(response)
    return response

@app.post("/ga")
async def ga(params: dict, graph: dict):
    graph = create_adjacency_matrix(graph["nodes"], graph["edges"], graph["check"])
    meta_h = GeneticAlgorithm(graph[0], params["population_size"], params["mutation_rate"], params["n_generations"], params["elitism_size"])
    r = meta_h.run()
    response = {
        "path": r[0],
        "cost": r[1],
        "convergence_data": r[2],
        "convergence_rate": r[3],
        "time_elapsed": r[4]
    }
    if r[1] == np.inf:
        response = {
            "path": [],
            "cost": 0.0,
            "convergence_data": [],
            "convergence_rate": 0.0,
            "time_elapsed": 0.0
        }
    response = convert_numpy_types(response)
    return response

@app.post("/pso")
async def pso(params: dict, graph: dict):
    graph = create_adjacency_matrix(graph["nodes"], graph["edges"], graph["check"])
    meta_h = ParticleSwarmOptimization(
        distances=graph[0],
        n_particles=params["n_particles"],
        n_iterations=params["n_iterations"],
        w=params.get("w", 0.5),
        c1=params.get("c1", 1),
        c2=params.get("c2", 2)
    )
    r = meta_h.run()
    response = {
        "path": r[0],
        "cost": r[1],
        "convergence_data": r[2],
        "convergence_rate": r[3],
        "time_elapsed": r[4]
    }
    if r[1] == np.inf:
        response = {
            "path": [],
            "cost": 0.0,
            "convergence_data": [],
            "convergence_rate": 0.0,
            "time_elapsed": 0.0
        }
    response = convert_numpy_types(response)
    return response

@app.post("/generate_complete_graph")
async def generate(data: dict):
    vertices = data["num_vertices"]
    t = data["type"]
    graph = generate_complete_weighted_graph(vertices, t)
    return {
        "graph": graph
    }

@app.post("/hello")
async def hi(data: dict):
    return {
        "message": f"hi {data['name']}"
    }
