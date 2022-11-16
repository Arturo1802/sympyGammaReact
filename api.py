from fastapi import FastAPI
from sympy import * 
from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application
import sympy as sp

from pydantic import BaseModel


from fastapi.middleware.cors import CORSMiddleware
transformations = (standard_transformations +
    (implicit_multiplication_application,))
x=Symbol('x')
y=Symbol('y')
z=Symbol('z')
f=Function('f')
g=Function('g')
h=Function('h')

origins = [ 
    "http://localhost",
    "http://localhost:3000",
]


class Item(BaseModel):
    id: str
    expression:str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/derivate/")
async def derivate(item:Item): 
    a= str( sp.latex(diff(sympify(parse_expr(item.expression,transformations=transformations)))))
    return {"result": a}

@app.post("/integrate/")
async def derivate(item:Item): 
    a= str( sp.latex(integrate(sympify(parse_expr(item.expression,transformations=transformations)))))
    return {"result": a}

@app.post("/solveeq/")
async def derivate(item:Item): 
    a= str( sp.latex( sympify(parse_expr(item.expression,transformations=transformations))))
    return {"result": a}
