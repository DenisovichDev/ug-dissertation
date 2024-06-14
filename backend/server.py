from fastapi import FastAPI
from graph.input import create_adjacency_matrix
from models.aco.AntColony import AntColony
from utils.convert_to_native_type import convert_numpy_types

# fastapi run server.py

app = FastAPI()

@app.post("/aco")
async def aco(params: dict, graph: dict):
    graph = create_adjacency_matrix(graph["nodes"], graph["edges"], graph["check"])
    meta_h = AntColony(graph[0], params["n_ants"], params["n_best"], params["n_iterations"], params["decay"], params["alpha"], params["beta"])
    r = meta_h.run()
    response = {
        "path": r[0],
        "cost": r[1]
    }
    response = convert_numpy_types(response)
    with open("data/output/graph.txt", "w") as f:
        f.write(f"{str(r[0])}\n")
        f.write(str(r[1]))
    return response

@app.post("/hello")
async def hi(data: dict):
    return {
        "message": f"hello {data['name']}"
    }
