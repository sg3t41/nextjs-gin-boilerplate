/**
 * ユーザーテーブルの作成
 */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- パスワードハッシュを追加
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

/**
 * 投稿テーブルの作成
 */
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/**
 * コメントテーブルの作成
 */
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/**
 * カテゴリーテーブルの作成
 */
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

/**
 * 投稿とカテゴリーの関連テーブルの作成
 */
CREATE TABLE post_categories (
    post_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

/**
 * トリガー関数の作成
 */
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/**
 * トリガーを各テーブルに作成
 */
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_post_categories_updated_at
BEFORE UPDATE ON post_categories
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

/**
 * テスト用ユーザーデータの挿入
 */
INSERT INTO users (username, email, password_hash) VALUES
('alice', 'alice@example.com', 'hashed_password_1'),
('bob', 'bob@example.com', 'hashed_password_2'),
('charlie', 'charlie@example.com', 'hashed_password_3');

/**
 * テスト用カテゴリーデータの挿入
 */
INSERT INTO categories (name, description) VALUES
('General Discussion', 'A place for general discussions.'),
('Announcements', 'Important announcements and updates.'),
('Feedback', 'Your feedback on the platform.');

/**
 * テスト用投稿データの挿入
 */
INSERT INTO posts (user_id, title, content) VALUES
(1, 'Welcome to the forum!', 'This is the first post in the General Discussion category.'),
(2, 'Latest Updates', 'Here are the latest updates about our platform.'),
(1, 'Feedback Request', 'Please let us know your thoughts on our new features.');

/**
 * テスト用コメントデータの挿入
 */
INSERT INTO comments (post_id, user_id, content) VALUES
(1, 2, 'Thanks for starting this discussion!'),
(1, 3, 'I am excited to see where this goes.'),
(2, 1, 'Looking forward to the updates!');

/**
 * テスト用投稿とカテゴリーデータの挿入
 */
INSERT INTO post_categories (post_id, category_id) VALUES
(1, 1),
(2, 2),
(3, 3);

