import psycopg2

conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="postgres", port="5432")

cur = conn.cursor()

cur.execute("""DROP TABLE person;""")

cur.execute("""CREATE TABLE IF NOT EXISTS person (
            id INT PRIMARY KEY,
            name VARCHAR(255),
            age INT);""")

cur.execute("""INSERT INTO person (id, name, age) VALUES
            (1, 'Axel', 22)""")

cur.execute("""SELECT * FROM person;""")
print(cur.fetchone())

conn.commit()

cur.close()
conn.close()
