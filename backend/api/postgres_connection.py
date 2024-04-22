import psycopg2

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
        self.conn = None
        self.cur = None
    
    def get_conn(self):
        self.conn = DatabaseConnection.get_connection()
    
    def get_cursor(self):
        self.cur = DatabaseConnection.get_cursor(self.conn)
    
    def disconnect(self):
        self.conn.close()
        self.cur.close()


    def get_users(self):
        query = """SELECT * FROM Users;"""
        self.cur.execute(query)
        value = self.cur.fetchall()
        return value
    
    def add_user(self, id, user, bio):
        query = "INSERT INTO Users (id, username, bio) VALUES (%s, %s, %s)"
        val = (id, user, bio) 
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"
    
    def add_stores(self, id, owner, name, lat, long):
        query = "INSERT INTO Stores (id, owner, name latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
        val = (id, owner, name, lat, long) 
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"
    
    def get_favourites(self, user):
        query = "SELECT store FROM Favourites WHERE user_id = %s"
        val = (user)
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"
        

        
