import psycopg2
from pydantic import BaseModel
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


# def get_users():
#     query = """SELECT * FROM Users;"""
#     cur.execute(query)
#     value = cur.fetchall()
#     return value

# def add_user(id, user, bio):
#     query = "INSERT INTO Users (id, username, bio) VALUES (%s, %s, %s)"
#     val = (id, user, bio) 
#     cur.execute(query, val)
#     conn.commit()
#     return "Success"

# def add_stores(id, owner, name, lat, long):
#     query = "INSERT INTO Stores (id, owner, name latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
#     val = (id, owner, name, lat, long) 
#     cur.execute(query, val)
#     conn.commit()
#     return "Success"


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

# def remove_user(id):
#     query = "DELETE FROM Users WHERE (id = %s);"
#     val = (id,)
#     cur.execute(query, val)
#     conn.commit()
#     return "Success"

# def get_stores():
#     query = "SELECT * FROM Stores;"
#     cur.execute(query)
#     result = cur.fetchall()
#     return "Success"

# def remove_stores(id):
#     query = "DELETE FROM Stores WHERE (id = %s);"
#     val = (id,)
#     cur.execute(query, val)
#     conn.commit()
#     return "Success"

# def get_ratings(user, store):
#     query = "SELECT store FROM Ratings WHERE user_id = %s, store = %s"
#     val = (user,store)
#     cur.execute(query, val)
#     result = cur.fetchall()
#     return result

# def get_all_stores_rating():
#     query = "SELECT * FROM Agg_Ratings;"
#     cur.execute(query)
#     result = cur.fetchall()
#     return result

# def add_rating( user, store, rating):
#     query = "INSERT INTO Ratings (user_id, store, rating) VALUES (%s, %s, %s);"
#     val = (user, store, rating)
#     cur.execute(query, val)
#     conn.commit()
#     return "Success"

# def remove_rating(user, store):
#     query = "DELETE FROM Ratings WHERE (user_id = %s, store = %s)"
#     val = (user, store)
#     cur.execute(query, val)
#     conn.commit()
#     return "Success"


        
        
        

        
