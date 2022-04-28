from flask import Flask, render_template, url_for
from data import queries
from util import json_response
import math
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/shows')
@app.route('/shows/most-rated')
def most_rated_shows():
    return render_template('most-rated.html')


@app.route('/shows/most-rated/<offset>/<selector>/<filter_direction>')
@json_response
def get_most_rated_shows(offset, selector, filter_direction):
    return queries.get_most_rated_shows(offset, selector, filter_direction)


@app.route('/shows/length')
@json_response
def get_length():
    return queries.get_all_shows_length()


def main():
    app.run(
        host="0.0.0.0",
        debug=False)


if __name__ == '__main__':
    main()
