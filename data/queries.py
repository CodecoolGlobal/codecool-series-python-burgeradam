from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def list_all_year():
    return data_manager.execute_select('''
                                        SELECT EXTRACT(YEAR FROM year)::int AS years,
                                        ROUND(AVG(rating), 1) AS rating,
                                        COUNT(title) AS title
                                        FROM shows
                                        WHERE EXTRACT(YEAR from year) BETWEEN 1970 AND 2010
                                        GROUP BY years''')
