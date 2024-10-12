package models

import (
	"fmt"
)

type Post struct {
	Model
	Title   string `json:"title"`
	Content string `json:"content"`
}

// CreatePost : 新しいPostレコードを作成する関数
func CreatePost(userID int, title, content string) (int64, error) {
	query := "INSERT INTO posts (user_id, title, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)"
	id, err := CreateRecord(query, userID, title, content)
	if err != nil {
		return 0, fmt.Errorf("CreatePost: %v", err)
	}
	return id, nil
}

// UpdatePost : 既存のPostレコードを更新する関数
func UpdatePost(id int, title, content string) (int64, error) {
	query := "UPDATE posts SET title = $1, content = $2, updated_at = $3 WHERE id = $4"
	rows, err := UpdateRecord(query, title, content, id)
	if err != nil {
		return 0, fmt.Errorf("UpdatePost: %v", err)
	}
	return rows, nil
}

// SoftDeletePost : Postレコードをソフトデリートする関数
func SoftDeletePost(id int) (int64, error) {
	query := "UPDATE posts SET deleted_at = $1 WHERE id = $2"
	rows, err := SoftDeleteRecord(query, id)
	if err != nil {
		return 0, fmt.Errorf("SoftDeletePost: %v", err)
	}
	return rows, nil
}

