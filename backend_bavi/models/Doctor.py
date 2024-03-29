from sqlalchemy import Column, Integer, String, ForeignKey,DateTime,func
from sqlalchemy import Boolean
from sqlalchemy.orm import relationship
from .Base import Base
from .Customer import Customer 
from sqlalchemy import UniqueConstraint

class Doctor(Base):
    __tablename__ = "Doctor"
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(200))
    last_name = Column(String(200))
    Phone  = Column(String(12), unique=True)
    Address = Column(String(200))
    Gender = Column(String(50))
    Specialization = Column(String(200))
    isDoctor = Column(Boolean)
    __table_args__ = (UniqueConstraint('Phone', name='_phone_uc_'),)

    
    def __init__(self, first_name, last_name, Phone, Address, Gender, Specialization, isDoctor):
        self.first_name = first_name
        self.last_name = last_name
        self.Phone = Phone
        self.Address = Address
        self.Gender = Gender
        self.Specialization = Specialization
        self.isDoctor = isDoctor

    def __repr__(self):
        return f"Buyer('{self.first_name}', '{self.last_name}', '{self.Phone}', \
        '{self.Address}', '{self.Gender}', '{self.Specialization}', '{self.isDoctor}')"


