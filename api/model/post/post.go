package post

import (
	"fmt"
	"log"

	"github.com/sg3t41/syomei_api/model"
)

type Post struct {
	model.Model
	Title   string `json:"title"`
	Content string `json:"content"`
}

// CreatePost : 新しいPostレコードを作成する関数
func CreatePost(userID int, title, content string) (int64, error) {
	query := "INSERT INTO posts (user_id, title, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)"
	id, err := model.CreateRecord(query, userID, title, content)
	if err != nil {
		return 0, fmt.Errorf("CreatePost: %v", err)
	}
	return id, nil
}

// UpdatePost : 既存のPostレコードを更新する関数
func UpdatePost(id int, title, content string) (int64, error) {
	query := "UPDATE posts SET title = $1, content = $2, updated_at = $3 WHERE id = $4"
	rows, err := model.UpdateRecord(query, title, content, id)
	if err != nil {
		return 0, fmt.Errorf("UpdatePost: %v", err)
	}
	return rows, nil
}

// SoftDeletePost : Postレコードをソフトデリートする関数
func SoftDeletePost(id int) (int64, error) {
	query := "UPDATE posts SET deleted_at = $1 WHERE id = $2"
	rows, err := model.SoftDeleteRecord(query, id)
	if err != nil {
		return 0, fmt.Errorf("SoftDeletePost: %v", err)
	}
	return rows, nil
}

func GetPosts(limit, offset int) ([]Post, error) {
	query := "SELECT id, title, content, created_at, updated_at, deleted_at FROM posts WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2"
	rows, err := model.DB.Query(query, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("GetPosts: %v", err)
	}
	defer rows.Close()

	posts := []Post{}
	for rows.Next() {
		var post Post
		if err := rows.Scan(&post.ID, &post.Title, &post.Content, &post.CreatedAt, &post.UpdatedAt, &post.DeletedAt); err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		posts = append(posts, post)
	}

	return posts, rows.Err()
}

func GetPostByID(id int) (*Post, error) {
	query := "SELECT id, title, content, created_at, updated_at, deleted_at FROM posts WHERE id = $1 AND deleted_at IS NULL"
	row := model.DB.QueryRow(query, id)

	var post Post
	err := row.Scan(&post.ID, &post.Title, &post.Content, &post.CreatedAt, &post.UpdatedAt, &post.DeletedAt)
	if err != nil {
		return nil, fmt.Errorf("GetPostByID: %v", err)
	}

	return &post, nil
}

func GetPostsByTitle(title string, limit, offset int) ([]Post, error) {
	query := "SELECT id, title, content, created_at, updated_at, deleted_at FROM posts WHERE title ILIKE $1 AND deleted_at IS NULL ORDER BY created_at DESC LIMIT $2 OFFSET $3"
	rows, err := model.DB.Query(query, "%"+title+"%", limit, offset)
	if err != nil {
		return nil, fmt.Errorf("GetPostsByTitle: %v", err)
	}
	defer rows.Close()

	posts := []Post{}
	for rows.Next() {
		var post Post
		if err := rows.Scan(&post.ID, &post.Title, &post.Content, &post.CreatedAt, &post.UpdatedAt, &post.DeletedAt); err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		posts = append(posts, post)
	}

	return posts, rows.Err()
}

func GetRecentPosts(limit int) ([]Post, error) {
	query := "SELECT id, title, content, created_at, updated_at, deleted_at FROM posts WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1"
	rows, err := model.DB.Query(query, limit)
	if err != nil {
		return nil, fmt.Errorf("GetRecentPosts: %v", err)
	}
	defer rows.Close()

	posts := []Post{}
	for rows.Next() {
		var post Post
		if err := rows.Scan(&post.ID, &post.Title, &post.Content, &post.CreatedAt, &post.UpdatedAt, &post.DeletedAt); err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		posts = append(posts, post)
	}

	return posts, rows.Err()
}
