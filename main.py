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


@app.route('/most_active')
def most_active():
    return render_template('most_active.html')


@app.route('/api/most_active')
def get_most_active():
    return jsonify(queries.get_all_actors())


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
