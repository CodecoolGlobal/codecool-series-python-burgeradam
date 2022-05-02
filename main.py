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


@app.route('/search')
def search():
    return render_template('average_actors.html')


@app.route('/api/get_year/<user_input>')
def average_actors(user_input):
    return jsonify(queries.average_actors(user_input))


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
