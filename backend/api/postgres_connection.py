import psycopg2

class DatabaseConnection():
    
    @staticmethod
    def get_connection():
        conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="postgres", port="5432") 
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
    
    def log_in(self, username, password):
        query = "SELECT EXISTS (SELECT * FROM Passwords WHERE c_user = %s AND password = %s);"
        val = (username, password)
        self.cur.execute(query, val)
        value = self.cur.fetchall()
        return value[0][0]

    
    def add_stores(self, id, owner, name, lat, long):
        query = "INSERT INTO Stores (id, owner, name latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
        val = (id, owner, name, lat, long) 
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"
    
    def get_favourites(self, user):
        query = "SELECT store FROM Favourites WHERE user_id = %s"
        val = (user,)
        self.cur.execute(query, val)
        result = self.cur.fetchall()
        return result
    
    def add_favourite(self, user, store):
        query = "INSERT INTO Favourites (user_id, store) VALUES (%s, %s);"
        val = (user, store)
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"
    
    def remove_favourite(self, user, store):
        query = "DELETE FROM Favourites WHERE (user_id = %s AND stores = %s);"
        val = (user, store)
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"
    
    def remove_user(self, id):
        query = "DELETE FROM Users WHERE (id = %s);"
        val = (id,)
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"

    def get_stores(self):
        query = "SELECT * FROM Stores;"
        self.cur.execute(query)
        result = self.cur.fetchall()
        return "Success"

    def remove_stores(self, id):
        query = "DELETE FROM Stores WHERE (id = %s);"
        val = (id,)
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"
    
    def get_ratings(self, user, store):
        query = "SELECT store FROM Ratings WHERE user_id = %s, store = %s"
        val = (user,store)
        self.cur.execute(query, val)
        result = self.cur.fetchall()
        return result
    
    def get_all_stores_rating(self):
        query = "SELECT * FROM Agg_Ratings;"
        self.cur.execute(query)
        result = self.cur.fetchall()
        return result

    def add_rating(self, user, store, rating):
        query = "INSERT INTO Ratings (user_id, store, rating) VALUES (%s, %s, %s);"
        val = (user, store, rating)
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"

    def remove_rating(self, user, store):
        query = "DELETE FROM Ratings WHERE (user_id = %s, store = %s)"
        val = (user, store)
        self.cur.execute(query, val)
        self.conn.commit()
        return "Success"


        
        
        
d = DataBaseManager()
d.get_conn()
d.get_cursor()

print(d.log_in('11111111', 'a'))

        
