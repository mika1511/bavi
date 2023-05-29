from .Base import Base
from .Customer import Customer
from .Doctor import Doctor
from .Orders import Order
from .Equipments import Equipment
from sqlalchemy import MetaData, create_engine
from sqlalchemy.orm import sessionmaker

db_name = "bavidb"
db_user = "cqvkn31krvkrlkk7a4jy"
db_password = "pscale_pw_l7FQ1hsF7fXteIp9JykY4lljtW1HWjfGHAFsncf8YJA"
db_host = "aws.connect.psdb.cloud"
db_port = 3306
ssl_ca = "/etc/ssl/certs/ca-certificates.crt"


#database_url = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}?ssl_ca={ssl_ca}"
engine = create_engine("sqlite:///C:\\Users\\iefle\\Desktop\\myDatabase.db", echo=True)

meta = MetaData()
meta.create_all(engine)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)


session = Session()

session.commit()