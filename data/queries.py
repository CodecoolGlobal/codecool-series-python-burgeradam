from data import data_manager
from psycopg2 import sql


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def search(usr_input):
    return data_manager.execute_select(sql.SQL('''
                                        SELECT shows.title, shows.rating, shows.year, shows.trailer
                                        FROM shows
                                        WHERE shows.title ILIKE CONCAT('%', {usr_input}, '%')''')
                                       .format(usr_input=sql.Literal(usr_input)))
