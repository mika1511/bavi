from sqlalchemy import Column, Integer, String, ForeignKey,DateTime,func
from sqlalchemy.orm import relationship
from .Base import Base
from sqlalchemy import UniqueConstraint

class Customer(Base):
    __tablename__ = 'Customer'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String)
    last_name = Column(String)
    Phone  = Column(String, unique=True)
    Address = Column(String)
    Gender = Column(String)
    Pending = Column(String)
    __table_args__ = (UniqueConstraint('Phone', name='_phone_uc_'),)


    def __init__(self, first_name, last_name, Phone, Address, Gender, Pending=True):
        self.first_name = first_name
        self.last_name = last_name
        self.Phone = Phone
        self.Address = Address
        self.Gender = Gender

    # def __repr__(self):
    #     return f"Buyer('{self.first_name}', '{self.last_name}', '{self.Phone}', '{self.Address}', '{self.Gender}')"
