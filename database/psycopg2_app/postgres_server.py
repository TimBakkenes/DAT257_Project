import psycopg2

# conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="postgres", port="5432")

# cur = conn.cursor()

# cur.execute("""DROP TABLE person;""")

# cur.execute("""CREATE TABLE IF NOT EXISTS person (
#             id INT PRIMARY KEY,
#             name VARCHAR(255),
#             age INT);""")

# cur.execute("""INSERT INTO person (id, name, age) VALUES
#             (1, 'Axel', 22)""")

# cur.execute("""SELECT * FROM person;""")

# print(cur.fetchone())

# conn.commit()

# cur.close()
# conn.close()

class DatabaseConnection():
    
    @staticmethod
    def get_connection():
        conn = psycopg2.connect(host="localhost", dbname="agil", user="postgres", password="0", port="5432") 
        return conn
    
    @staticmethod
    def get_cursor(conn):
        return conn.cursor()
    

class DataBaseManager():
    def __init__(self):
        self.conn = DatabaseConnection.get_connection()
        self.cur = DatabaseConnection.get_cursor(self.conn)

    def get_users(self):
        query = """SELECT * FROM users;"""
        self.cur.execute(query)
        value = self.cur.fetchall()
        return value
    
    def add_user(self, id, user):
        query = "INSERT INTO users (id, username) VALUES (%s, %s)"
        val = (id, user) 
        self.cur.execute(query, val)
        self.conn.commit()

db = DataBaseManager()

