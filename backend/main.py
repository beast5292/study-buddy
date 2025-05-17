import motor.motor_asyncio
from dotenv import dotenv_values
from bson.objectid import ObjectId

from fastapi import FastAPI
from fastapi import Body
from fastapi.encoders import jsonable_encoder
from models import (UserCreate, UserLogin, ResponseModel)
from fastapi.middleware.cors import CORSMiddleware

config = dotenv_values(".env")

client = motor.motor_asyncio.AsyncIOMotorClient(config["MONGODB_URI"])
db_name = config["DB_Name"]

database = client.db_name 

user_collection = database.get_collection("users_collection")

'''Creating a quick helper functino for parsing the results from a db
   query into a python dict'''

def user_helper(user) -> dict:
    return {
        "name": user["name"],
        "email": user["email"],
        "password": user["password"]
    }

# Add a new user into the db
async def add_user(user_data: dict) -> dict:
    user = await user_collection.insert_one(user_data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)

# Find a user from the db
async def find_user(user_data: dict) -> dict:
    user = await user_collection.find_one(user_data)
    found_user = await user_collection.find_one({"email": user["email"]})
    return user_helper(found_user)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/addUser", response_description="User data added into the database")
async def add_user_data(user: UserCreate = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully.")

@app.post('/findUser', response_description="Finding specific user data from the database")
async def find_user_data(user: UserLogin = Body(...)):
    user = jsonable_encoder(user)
    found_user = await find_user(user)
    return ResponseModel(found_user, "User found successfully.")