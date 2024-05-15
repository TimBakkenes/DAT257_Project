import psycopg2
from contextlib import contextmanager


@contextmanager
def database_context():
    conn = psycopg2.connect(host="localhost", dbname="agil", user="postgres", password="0", port="5432")
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
    

def add_user(id, user, bio):
    query = "INSERT INTO Users (id, username, bio) VALUES (%s, %s, %s)"
    val = (id, user, bio) 
    with database_context() as (cur, conn):
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
        return value


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


# Stores
def get_stores():
    query = "SELECT * FROM Stores;"
    with database_context() as (cur, conn):
        cur.execute(query)
        result = cur.fetchall()
        return result

def add_stores(id, owner, name, lat, long):
    query = "INSERT INTO Stores (id, owner, name, latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
    val = (id, owner, name, lat, long) 
    with database_context() as (cur, conn):
        cur.execute(query, val)
        conn.commit()
        return "Success"

def remove_stores(id):
    query = "DELETE FROM Stores WHERE (id = %s);"
    val = (id,)
    with database_context() as (cur, conn):
        cur.execute(query, val)
        conn.commit()
        return "Success"


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


        
        
    

        
