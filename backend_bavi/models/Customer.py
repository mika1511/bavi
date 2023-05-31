from sqlalchemy import Column, Integer, String, ForeignKey,DateTime,func
from sqlalchemy.orm import relationship
from .Base import Base
from sqlalchemy import UniqueConstraint

class Customer(Base):
    __tablename__ = 'Customer'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(200))
    last_name = Column(String(200))
    Phone  = Column(String(12), unique=True)
    Address = Column(String(200))
    Gender = Column(String(50))
    Pending = Column(String(200))
    __table_args__ = (UniqueConstraint('Phone', name='_phone_uc_'),)


    def __init__(self, first_name, last_name, Phone, Address, Gender, Pending):
        self.first_name = first_name
        self.last_name = last_name
        self.Phone = Phone
        self.Address = Address
        self.Gender = Gender
        self.Pending = Pending

    # def __repr__(self):
    #     return f"Buyer('{self.first_name}', '{self.last_name}', '{self.Phone}', '{self.Address}', '{self.Gender}')"
