from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Body
from sqlalchemy.exc import IntegrityError
from fastapi import Response, status
import json
from fastapi.responses import JSONResponse
from sqlalchemy.sql import desc


career_data = {}

class Parameter(BaseModel):
    first_name_: str
    last_name_: str
    phone_: str
    address_: str
    gender_: str
    Pending: str

class Order(BaseModel):
    FirstName: str
    ServiceName: str
    TotalPrice: int
    PhoneNumber: str
    Pending: bool
    PaymentOption: str

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
import models.Orders

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
                    Phone=params.phone_, Address=params.address_, Gender=params.gender_, Pending=params.Pending))
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

@app.get("/register_as")
async def register(phone_no, career, specialization):
    customer = session.query(models.Customer.Customer).filter(models.Customer.Customer.Phone == phone_no).first()
    if customer:
        customer.Pending = career
        session.commit()
        return {"Success" : "true"}
    else:
        return {"Success" : "fucked"}


@app.post("/create_order")
async def create(order: Order):
    try:
        # Add the new order to the database
        session.add(models.Orders.Order(FirstName=order.FirstName, ServiceName=order.ServiceName, TotalPrice=order.TotalPrice, PhoneNumber=order.PhoneNumber, Pending=order.Pending, PaymentOption=order.PaymentOption))
        session.commit()

        # Fetch all the Order tables in descending order by ID
        order_tables = session.query(models.Orders.Order.__table__).order_by(desc(models.Orders.Order.id)).all()

        # Check if there are more than 100 tables
        if len(order_tables) > 100:
            # Keep the latest 10 tables
            latest_tables = order_tables[:10]
            latest_table_ids = [table.id for table in latest_tables]

            # Delete tables that are not in the latest 10
            session.query(models.Orders.Order.__table__).filter(models.Orders.Order.id.notin_(latest_table_ids)).delete(synchronize_session=False)
            session.commit()

        return {"Success": "true"}
    except Exception as e:
        session.rollback()
        print(e)
        return {"Success": str(e)}


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