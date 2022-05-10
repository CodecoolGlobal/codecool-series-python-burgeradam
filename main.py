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


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/genres')
def genres_filter():
    genres = queries.get_genres()
    return render_template('genre_filter.html', genres=genres)


@app.route('/api/filtered_shows/<user_input>')
def get_filtered_shows(user_input):
    filtered_shows = queries.get_shows_with_filter(user_input)
    return jsonify(filtered_shows)


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
