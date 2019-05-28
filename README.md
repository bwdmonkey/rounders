# Rounders

2019S UBC CPSC304 Project

## Group Members

```txt
Name           Student No  CS ID  Tutorial  Email
-------------- ----------- ------ --------- ---------------------------
...
```

## Requirements

- `Python>=3.7.3` [General](https://www.python.org/downloads/release/python-373/)
- `PostgreSQL>=11.2` [General](https://www.postgresql.org/download/) [macOS](https://postgresapp.com/)

Check via running the following commands in your terminal:

```bash
$ python3 --version
Python 3.7.3
$ psql -U postgres -c "SELECT version();" -tA
PostgreSQL 11.3 on x86_64-apple-darwin16.7.0, compiled by Apple LLVM version
8.1.0 (clang-802.0.42), 64-bit
```

## Installation

```bash
# rounders/
$ make install
[...]
Database Initialized. DB version:
    PostgreSQL 11.3 on x86_64-apple-darwin16.7.0, compiled by Apple LLVM version
    8.1.0 (clang-802.0.42), 64-bit
```

## Routes

```bash
# rounders/
$ flask routes
Endpoint       Methods    Rule
-------------  ---------  -----------------------
auth.login     GET, POST  /auth/login
auth.logout    GET        /auth/logout
auth.register  GET, POST  /auth/register
index          GET        /
static         GET        /static/<path:filename>
```

## Production

If you are starting with this boilerplate to build an application for prod deployment, there is a `serve.py` that wraps the Flask application with a basic logger.

## Issues

If you run into permission issues like below,

```bash
# rounders/
$ make install
virtualenv venv
make: ./make-venv: Permission denied
make: *** [install] Error 1
$ chmod +x make-venv # should fix the issue
```

If you run into issues installing `psycopg2` on macOS, refer to [this StackOverflow post](https://stackoverflow.com/questions/22313407/clang-error-unknown-argument-mno-fused-madd-python-package-installation-fa). Personally, I had to set following flags such that compiler can find `openssl`:

``` bash
export LDFLAGS="-L/usr/local/opt/openssl/lib"
export CPPFLAGS="-I/usr/local/opt/openssl/include"
```
