from fastapi import FastAPI
from sympy import * 
from sympy.parsing.sympy_parser import standard_transformations, implicit_multiplication_application
import sympy as sp
from pylatexenc.latex2text import LatexNodes2Text
from pydantic import BaseModel


from fastapi.middleware.cors import CORSMiddleware
transformations = (standard_transformations +
    (implicit_multiplication_application,))
x=Symbol('x')
y=Symbol('y')
z=Symbol('z')
a=Symbol('a')
d=Symbol('d')

f=Function('f')(x)
g=Function('g')(y)
h=Function('h')(x*y)

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
    a=item.expression
    if "^" in a:
        a=a.replace("^","**")
    a= str( sp.latex(diff(sympify(parse_expr(a,transformations=transformations)))))
    return {"result": a,"ans":LatexNodes2Text().latex_to_text(a)}

@app.post("/integrate/")
async def derivate(item:Item): 
    a=item.expression
    if "^" in a:
        a=a.replace("^","**")
    a= str( sp.latex(integrate(sympify(parse_expr(a,transformations=transformations)),x)))
    return {"result": a}

@app.post("/solveeq/")
async def derivate(item:Item):  
    a=item.expression
    if "^" in a:
        a=a.replace("^","**")
    a= str( sp.latex( sympify(parse_expr(a,transformations=transformations))))
    return {"result": a}
