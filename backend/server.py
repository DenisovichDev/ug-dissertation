from fastapi import FastAPI
from graph.input import create_adjacency_matrix
from models.aco.AntColony import AntColony

# fastapi run server.py

app = FastAPI()

@app.post("/aco")
async def aco(params: dict, graph: dict):
    graph = create_adjacency_matrix(graph["nodes"], graph["edges"], graph["check"])
    meta_h = AntColony(graph[0], params["n_ants"], params["n_best"], params["n_iterations"], params["decay"], params["alpha"], params["beta"])
    r = meta_h.run()
    return {
        "path": r[0],
        "cost": r[1]
    }

@app.post("/hello")
async def hi(data: dict):
    return {
        "message": f"hello {data['name']}"
    }