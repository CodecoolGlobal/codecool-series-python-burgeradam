from data import data_manager
from psycopg2 import sql


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def average_actors(user_input):
    return data_manager.execute_select(sql.SQL('''SELECT actors.name,
                                        actors.birthday,
                                        ROUND(AVG(shows.rating), 2) AS average_rating
                                        FROM actors
                                        LEFT JOIN show_characters sc ON actors.id = sc.actor_id
                                        LEFT JOIN shows ON sc.show_id = shows.id
                                        WHERE actors.birthday > CONCAT({user_input}, '-01-01')::date
                                        GROUP BY actors.id
                                        LIMIT 200''').format(user_input=sql.Literal(user_input)))


