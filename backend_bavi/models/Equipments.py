from sqlalchemy import Column, Integer, String, ForeignKey,DateTime,func
from sqlalchemy.orm import relationship
from .Base import Base


class Equipment(Base):
    __tablename__ = "Equipment"
    id = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(200))
    Quantity = Column(Integer)
    Dealer = Column(String(200))

    def __init__(self, Name, Quantity, Dealer):
        self.Name = Name
        self.Quantity = Quantity
        self.Dealer = Dealer

    def __repr__(self):
        return f"Buyer('{self.Name}', '{self.Quantity}', '{self.Dealer})"
    



