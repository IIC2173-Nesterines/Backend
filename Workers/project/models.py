from pydantic import BaseModel
from typing import List

class Number(BaseModel):
    number: int
    
class Coordinates(BaseModel):
    lat: int
    lon: int

class Flight(BaseModel):
    flight_coord: Coordinates
    flight_id: int
    price: int

class ListOfFlights(BaseModel):
    flights: List[Flight]