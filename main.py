from flask import Flask, render_template, url_for, jsonify
from data import queries
import math
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)


@app.route('/shows')
def shows_runtime():
    get_top10_shows = queries.top10_shows_by_runtime()
    get_actors = queries.actors_in_top10_shows()
    return render_template('shows.html', get_top10_shows=get_top10_shows, get_actors=get_actors)


@app.route('/design')
def design():
    return render_template('design.html')


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
