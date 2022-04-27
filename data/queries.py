from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_most_rated_shows():
    return data_manager.execute_select('''
            SELECT  title,
                    EXTRACT(YEAR from year)::numeric AS year,
                    runtime,
                    ROUND ( rating, 1 ) AS rating,
                    STRING_AGG( genres.name, ', ' ORDER BY genres.name ) AS genres,
                    trailer,
                    homepage
            FROM shows
            INNER JOIN show_genres ON shows.id = show_genres.show_id
            INNER JOIN genres ON show_genres.genre_id = genres.id
            GROUP BY title, year, rating, runtime, trailer, homepage
            ORDER BY rating DESC, title
            OFFSET 15
            LIMIT 15;''')

