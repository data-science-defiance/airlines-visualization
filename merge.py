import os
import sys
# from pprint import pprint
import pandas as pd

df_money = pd.read_json('data/AllStates.json', orient='records')
df_states = pd.read_json('data/AllFlights.json', orient='records')

df_states = df_states.rename(index=str, columns={'origin': 'origin_abr', 'dest': 'dest_abr'})
cols_to_use = df_money.columns.difference(df_states.columns)
print(df_money)
print(df_states)
df = pd.merge(
    df_money,
    df_states,
    how='inner',
    left_on=['origin', 'dest', 'quarter', 'year'],
    right_on=['origin_state', 'dest_state', 'quarter', 'year'])
print(df)
print(df.columns)
df.to_json('data/USAFlights.json', orient='records')
