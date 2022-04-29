from data import data_manager
from psycopg2 import sql


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_most_rated_shows(offset=0, selector='rating', filter_direction='DESC'):
    return data_manager.execute_select(sql.SQL('''
            SELECT  title,
                    EXTRACT(YEAR from year)::numeric AS year,
                    runtime,
                    ROUND ( rating, 1 ) AS rating,
                    STRING_AGG( genres.name, ', ' ORDER BY genres.name ) AS genres,
                    trailer,
                    homepage
            FROM shows
            LEFT JOIN show_genres ON shows.id = show_genres.show_id
            LEFT JOIN genres ON show_genres.genre_id = genres.id
            GROUP BY title, year, rating, runtime, trailer, homepage
            ORDER BY 
                (CASE WHEN {selector} = 'rating' AND {filter_direction} = 'DESC' THEN rating END) DESC,
                (CASE WHEN {selector} = 'rating' AND {filter_direction} = 'ASC' THEN rating END) ASC,
                (CASE WHEN {selector} = 'title' AND {filter_direction} = 'DESC' THEN title END) DESC,
                (CASE WHEN {selector} = 'title' AND {filter_direction} = 'ASC' THEN title END) ASC,
                (CASE WHEN {selector} = 'year' AND {filter_direction} = 'DESC' THEN year END) DESC,
                (CASE WHEN {selector} = 'year' AND {filter_direction} = 'ASC' THEN year END) ASC,
                (CASE WHEN {selector} = 'runtime' AND {filter_direction} = 'DESC' THEN runtime END) DESC,
                (CASE WHEN {selector} = 'runtime' AND {filter_direction} = 'ASC' THEN runtime END) ASC
            OFFSET {offset}
            LIMIT 15;''').format(selector=sql.Literal(selector),
                                 filter_direction=sql.Literal(filter_direction),
                                 offset=sql.Literal(offset)))


def get_all_shows_length():
    return data_manager.execute_select('''
            SELECT COUNT(id) FROM shows''')
