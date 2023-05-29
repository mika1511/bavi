from sqlalchemy import Column, Integer, String, ARRAY, ForeignKey,DateTime,func
from sqlalchemy.orm import relationship
from .Base import Base


class Order(Base):
    __tablename__ = "Orders"
    id = Column(Integer, primary_key=True, autoincrement=True)
    ServiceName = Column(String(300))
    TotalPrice = Column(Integer)
    PhoneNumber = Column(String(12))

    def __init__(self, ServiceName, TotalPrice, PhoneNumber):
        self.ServiceName = ServiceName
        self.TotalPrice= TotalPrice
        self.PhoneNumber= PhoneNumber

    def __repr__(self):
        return f"Buyer('{self.Name}', '{self.Quantity}', '{self.Dealer})"
    

