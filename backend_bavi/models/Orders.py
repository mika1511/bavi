from sqlalchemy import Column, Integer, String, ARRAY, ForeignKey,DateTime,func,BOOLEAN, text
from sqlalchemy.orm import relationship
from .Base import Base


class Order(Base):
    __tablename__ = "Orders"
    id = Column(Integer, primary_key=True, autoincrement=True)
    FirstName = Column(String(200))
    ServiceName = Column(String(200))
    TotalPrice = Column(Integer)
    PhoneNumber = Column(String(12))
    Pending = Column(BOOLEAN)
    PaymentOption = Column(String(200))
    OrderType = Column(String(100))
    OrderTime = Column(DateTime(timezone=True), server_default=func.now())
    
    def __init__(self, FirstName, ServiceName, TotalPrice, PhoneNumber, Pending, PaymentOption, OrderType):
        self.FirstName = FirstName
        self.ServiceName = ServiceName
        self.TotalPrice= TotalPrice
        self.PhoneNumber= PhoneNumber
        self.Pending = Pending
        self.PaymentOption = PaymentOption
        self.OrderType = OrderType

    def __repr__(self):
        return f"Buyer('{self.Name}', '{self.Quantity}', '{self.Dealer})"
    

