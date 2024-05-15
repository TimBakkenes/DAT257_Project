import psycopg2
from contextlib import contextmanager


@contextmanager
def database_context():
    conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="postgres", port="5432")
    cur = conn.cursor()
    try:
        yield cur, conn
    finally:
        cur.close()
        conn.close()

# Login
def log_in(username, password):
    query = "SELECT EXISTS (SELECT * FROM Passwords WHERE c_user = %s AND password = %s);"
    val = (username, password)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        value = cur.fetchall()
        return value[0][0]
                

# Users
def get_users():
    query = """SELECT * FROM Users;"""
    with database_context() as (cur, conn):
        cur.execute(query)
        value = cur.fetchall()
        return value
    
def get_user_by_id(user_id):
    query = "SELECT username, bio FROM Users WHERE id = %s;"
    with database_context() as (cur, conn):
        cur.execute(query, (user_id,))
        user_row = cur.fetchone()
        return {'username': user_row[0], 'bio': user_row[1]}
    
    
def add_store(name, owner, descripiton, lat, long):
    query = "INSERT INTO Stores (name, owner, description, latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
    with database_context() as (cur, conn):
        val = (name, owner, descripiton, lat, long) 
        cur.execute(query, val)
        conn.commit()
        return "Success"
    

def remove_user(id):
    query = "DELETE FROM Users WHERE (id = %s);"
    val = (id,)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        conn.commit()
        return "Success"



# favourites 
def get_favourites(user):
    query = "SELECT store FROM Favourites WHERE user_id = %s"
    val = (user,)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        value = cur.fetchall()
        val_array = []
        for row in value:
            val_dict ={'name': row[0]}
            val_array.append(val_dict)
        return val_array


def add_favourite(user:str, store:str):
    query = "INSERT INTO Favourites (user_id, store) VALUES (%s, %s);"
    val = (user, store)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        conn.commit()
        return "Success"

def remove_favourite(user:str, store:str):
    query = "DELETE FROM Favourites WHERE (user_id = %s AND store = %s);"
    val = (user, store)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        conn.commit()
        return "Success"


def remove_store(self, id):
    query = "DELETE FROM Stores WHERE (id = %s);"
    val = (id,)
    self.cur.execute(query, val)
    self.conn.commit()

# Stores
def get_stores():
    query = "SELECT * FROM Stores;"
    with database_context() as (cur, conn):
        cur.execute(query)
        result = cur.fetchall()
        keys = ["name", "owner", "description", "latitude", "longitude"]
        return [zip(keys, row) for row in result]
        




# Ratings
def get_ratings(user, store):
    query = "SELECT store FROM Ratings WHERE user_id = %s AND store = %s"
    val = (user, store)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        result = cur.fetchall()
        return result

def get_all_stores_rating():
    query = "SELECT * FROM Agg_Ratings;"
    with database_context() as (cur, conn):
        cur.execute(query)
        result = cur.fetchall()
        return result

def add_rating(user, store, rating):
    query = "INSERT INTO Ratings (user_id, store, rating) VALUES (%s, %s, %s);"
    val = (user, store, rating)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        conn.commit()
        return "Success"

def remove_rating(user, store):
    query = "DELETE FROM Ratings WHERE (user_id = %s AND store = %s)"
    val = (user, store)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        conn.commit()
        return "Success"


        
        
    

        
