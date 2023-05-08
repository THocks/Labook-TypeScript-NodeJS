-- Active: 1683546655610@@127.0.0.1@3306

CREATE TABLE
    users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
        updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL
    );

INSERT INTO
    users (name, email, password, role)
VALUES (
        'João Silva',
        'joao.silva@example.com',
        'senha123',
        'NORMAL'
    ), (
        'Maria Santos',
        'maria.santos@example.com',
        'outraSenha456',
        'ADMIN'
    ), (
        'Pedro Costa',
        'pedro.costa@example.com',
        'maisUmaSenha789',
        'NORMAL'
    );

SELECT * FROM users;

CREATE TABLE
    post (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes BIGINT DEFAULT 0 NOT NULL,
        dislikes BIGINT DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
        updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
        report_count INTEGER DEFAULT 0 NOT NULL,
        FOREIGN KEY (created_id) REFERENCES users(id)
    );

INSERT INTO
    post (
        created_id,
        content,
        likes,
        dislikes,
        report_count
    )
SELECT *
FROM post;

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
        updated_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );