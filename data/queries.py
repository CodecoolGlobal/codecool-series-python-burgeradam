from data import data_manager
from psycopg2 import sql


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_all_shows_plus_episode_count():
    return data_manager.execute_select('''SELECT shows.title, COUNT(episodes.episode_number), 
                                        ( CASE 
                                            WHEN COUNT(episodes.episode_number) > 100 THEN true
                                            WHEN COUNT(episodes.episode_number) < 100 THEN false END ) AS is_long
                                        FROM shows
                                        LEFT JOIN seasons ON shows.id = seasons.show_id
                                        LEFT JOIN episodes ON seasons.id = episodes.season_id
                                        GROUP BY shows.title''')

