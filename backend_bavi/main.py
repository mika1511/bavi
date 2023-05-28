from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Body
from sqlalchemy.exc import IntegrityError
from fastapi import Response, status
import json
from fastapi.responses import JSONResponse

class Parameter(BaseModel):
    first_name_: str
    last_name_: str
    phone_: str
    address_: str
    gender_: str

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


import models.Customer
from models.ready_database import session


@app.exception_handler(IntegrityError)
async def handle_unique_constraint_violation(request, exc):
    return {
        "status_code" : "400",
        "content" : {'detail': 'Phone number already exists'}
    }
import models.Customer
from models.ready_database import session

@app.post("/create_acc")
async def add_account(params: Parameter, response: Response):
    session.add(models.Customer.Customer(first_name=params.first_name_, last_name=params.last_name_, 
                    Phone=params.phone_, Address=params.address_, Gender=params.gender_))
    try:
        session.commit()
        return {"Success" : "True"}
    except IntegrityError:
        session.rollback()
        response.status_code = status.HTTP_409_CONFLICT
        return {"Success" : "False"}
        
@app.get("/get_user_details/first_name")
async def get_details(phone_no: str):
    customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
    if customer:
        return JSONResponse(content={"m_response": customer.first_name})
    else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)

@app.get("/get_user_details/last_name")
async def get_details(phone_no: str):
    customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
    if customer:
        return JSONResponse(content={"m_response": customer.last_name})
    else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)

@app.get("/get_user_details/address")
async def get_details(phone_no: str):
    customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
    if customer:
        return JSONResponse(content={"m_response": customer.Address})
    else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)

@app.get("/get_user_details/gender")
async def get_details(phone_no: str):
    customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
    if customer:
        return JSONResponse(content={"m_response": customer.Gender})
    else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)


@app.get("/edit_details/first_name")
async def update(phone_no: str, new_name: str):
     customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
     if customer:
        customer.first_name = new_name
        session.commit()
        return {"Success" : "true"}
     else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)
     
@app.get("/edit_details/last_name")
async def update(phone_no: str, new_name: str):
     customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
     if customer:
        customer.last_name= new_name
        session.commit()
        return {"Success" : "true"}
     else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)
     
@app.get("/edit_details/address")
async def update(phone_no: str, new_name: str):
     customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
     if customer:
        customer.Address = new_name
        session.commit()
        return {"Success" : "true"}
     else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)
     
@app.get("/edit_details/gender")
async def update(phone_no: str, new_name: str):
     customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
     if customer:
        customer.Gender = new_name
        session.commit()
        return {"Success" : "true"}
     else:
        return JSONResponse(content={"m_response": "Customer not found"}, status_code=404)

# @app.get("/get_user_details")
# async def get_details(phone_no: str, response: Response):
#     try:
#         customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
#     except IntegrityError:
#         response.status_code = status.HTTP_404_NOT_FOUND
#         return {"Status" : "Not found"}
    
#     customer_data = {
#         "id" : customer.id,
#         "first_name": customer.first_name,
#         "last_name": customer.last_name,
#         "phone" : customer.Phone,
#         "address" : customer.Address,
#     }
#     return customer_data


import uvicorn
config = uvicorn.Config(app, host="0.0.0.0", port=6969, log_level="info", loop="asyncio")
server = uvicorn.Server(config=config)
server.run()