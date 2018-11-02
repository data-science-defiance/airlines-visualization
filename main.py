import os
# from pprint import pprint
import pandas as pd
import psycopg2

conn = psycopg2.connect(
    dbname=os.getenv('AIRLINES_VISUALIZATION_DB_NAME'),
    user=os.getenv('AIRLINES_VISUALIZATION_DB_USER'),
    password=os.getenv('AIRLINES_VISUALIZATION_DB_PASS'),
    host=os.getenv('AIRLINES_VISUALIZATION_DB_HOST'),
    port=os.getenv('AIRLINES_VISUALIZATION_DB_PORT'),
)
cur = conn.cursor()
# cur.execute('''
#     SELECT * 
#     FROM ics484.routes
# ''')
cur.execute('''
    SELECT * 
    FROM ics484.routes
    WHERE ORIGIN_STATE_ABR = 'HI' AND DEST_STATE_ABR = 'CA';
''')
df = pd.DataFrame(cur.fetchall())
df.columns = [desc[0] for desc in cur.description]
print(df)
print(df.columns)
df.to_json('data/HawaiiFlights.json')

# # Getting Airports
# cur.execute('''
#     SELECT *
#     FROM ics484.airports
# ''')
# df_airports = pd.DataFrame(cur.fetchall())

