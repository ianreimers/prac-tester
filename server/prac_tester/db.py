import sqlite3
from sqlite3 import Connection

import click
from flask import current_app, g, Flask

# g: special object unique to each request
# current_app: special object pointing to the flask app handling the request

def init_app(app: Flask):
    # tells flask to call the function provided after returning the response
    app.teardown_appcontext(close_db)

    # adds a new command that can be called with the `flask` command
    # similar to the `run` command
    app.cli.add_command(init_db_command)

def get_db() -> Connection:
    # connection is stored and reused in case this is called twice
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'], # key pointing to file value
            detect_types=sqlite3.PARSE_DECLTYPES
        )

        # tells connection to return rows that behave like dicts
        # allowing access to columns by name
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

# defines a cli command called 'init-db' that calls the init_db function
# showing a success message tot he user
@click.command('init-db') 
def init_db_command():
    """Clear the existing data and create new tables"""
    init_db()
    click.echo('Initialized the database')
