import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "Aqueeb@31"),
        database=os.getenv("DB_NAME", "vtube_db"),
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )

