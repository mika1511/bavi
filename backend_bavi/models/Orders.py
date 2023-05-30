from sqlalchemy import Column, Integer, String, ARRAY, ForeignKey,DateTime,func,BOOLEAN
from sqlalchemy.orm import relationship
from .Base import Base


class Order(Base):
    __tablename__ = "Orders"
    id = Column(Integer, primary_key=True, autoincrement=True)
    FirstName = Column(String)
    ServiceName = Column(String(300))
    TotalPrice = Column(Integer)
    PhoneNumber = Column(String(12))
    Pending = Column(BOOLEAN)
    PaymentOption = Column(String)

    def __init__(self, FirstName, ServiceName, TotalPrice, PhoneNumber, Pending, PaymentOption):
        self.FirstName = FirstName
        self.ServiceName = ServiceName
        self.TotalPrice= TotalPrice
        self.PhoneNumber= PhoneNumber
        self.Pending = Pending
        self.PaymentOption = PaymentOption

    def __repr__(self):
        return f"Buyer('{self.Name}', '{self.Quantity}', '{self.Dealer})"
    

