from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
   name: str
   email: EmailStr
   password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str
