import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'ishouldntbehere'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/vorlesungsplaner' #{db_user}:{db_password}@{db_url}:{port}/{db_name}
    JWT_SECRET_KEY = 'change_me_late_123'
    SQLALCHEMY_TRACK_MODIFICATIONS = False