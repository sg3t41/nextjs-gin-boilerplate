package models

import (
	"fmt"
)

type User struct {
	Model
	Username     string `json:"username"`
	Email        string `json:"email"`
	PasswordHash string `json:"password_hash"`
}

// CreateUser : 新しいUserレコードを作成する関数
func CreateUser(username, email, passwordHash string) (int64, error) {
	query := "INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)"
	id, err := CreateRecord(query, username, email, passwordHash)
	if err != nil {
		return 0, fmt.Errorf("CreateUser: %v", err)
	}
	return id, nil
}

// UpdateUser : 既存のUserレコードを更新する関数
func UpdateUser(id int, username, email, passwordHash string) (int64, error) {
	query := "UPDATE users SET username = $1, email = $2, password_hash = $3, updated_at = $4 WHERE id = $5"
	rows, err := UpdateRecord(query, username, email, passwordHash, id)
	if err != nil {
		return 0, fmt.Errorf("UpdateUser: %v", err)
	}
	return rows, nil
}

// SoftDeleteUser : Userレコードを論理削除する関数
func SoftDeleteUser(id int) (int64, error) {
	query := "UPDATE users SET deleted_at = $1 WHERE id = $2"
	rows, err := SoftDeleteRecord(query, id)
	if err != nil {
		return 0, fmt.Errorf("SoftDeleteUser: %v", err)
	}
	return rows, nil
}

