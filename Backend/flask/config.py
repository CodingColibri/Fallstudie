import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'ishouldntbehere'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@mariadb:3306/vorlesungsplaner' #for using without docker use localhost instead of mariadb
    JWT_SECRET_KEY = 'change_me_late_123'
    SQLALCHEMY_TRACK_MODIFICATIONS = False