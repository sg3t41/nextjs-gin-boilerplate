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
func CreatePost(title, content string) (int64, error) {
	query := "INSERT INTO posts (title, content, created_on, modified_on) VALUES ($1, $2, $3, $4)"
	id, err := CreateRecord(query, title, content)
	if err != nil {
		return 0, fmt.Erpackage models

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"time"

	"github.com/sg3t41/syomei_api/pkg/setting"
)

var db *sql.DB

// Model : DBレコードに共通するフィールド
type Model struct {
	ID         int `json:"id"`
	CreatedAt  int `json:"created_at"`
	ModifiedAt int `json:"modified_at"`
	DeletedAt  int `json:"deleted_at"`
}

// Setup : データベースのセットアップ関数
func Setup() {
	var err error
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		setting.DatabaseSetting.Host,
		setting.DatabaseSetting.Port,
		setting.DatabaseSetting.User,
		setting.DatabaseSetting.Password,
		setting.DatabaseSetting.Name)

	db, err = sql.Open(setting.DatabaseSetting.Type, dsn)
	if err != nil {
		log.Fatalf("models.Setup err: %v", err)
	}

	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)

	//DBへの疎通確認
	err = db.Ping()
	if err != nil {
		log.Fatalf("db.Ping err: %v", err)
	}
}

// CloseDB : データベース接続を閉じる
func CloseDB() {
	if db != nil {
		db.Close()
	}
}

// CreateRecord : 新しいレコードを作成する関数
func CreateRecord(query string, args ...interface{}) (int64, error) {
	nowTime := time.Now().Unix()
	args = append(args, nowTime, nowTime) // CreatedOnとModifiedOn用
	result, err := db.Exec(query, args...)
	if err != nil {
		return 0, err
	}
	return result.LastInsertId()
}

// UpdateRecord : レコードを更新する関数
func UpdateRecord(query string, args ...interface{}) (int64, error) {
	nowTime := time.Now().Unix()
	args = append(args, nowTime) // ModifiedOn用
	result, err := db.Exec(query, args...)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}

// SoftDeleteRecord : レコードをソフトデリートする関数
func SoftDeleteRecord(query string, args ...interface{}) (int64, error) {
	nowTime := time.Now().Unix()
	args = append(args, nowTime) // DeletedOn用
	result, err := db.Exec(query, args...)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}
rorf("CreatePost: %v", err)
	}
	return id, nil
}

// UpdatePost : 既存のPostレコードを更新する関数
func UpdatePost(id int, title, content string) (int64, error) {
	query := "UPDATE posts SET title = $1, content = $2, modified_on = $3 WHERE id = $4"
	rows, err := UpdateRecord(query, title, content, id)
	if err != nil {
		return 0, fmt.Errorf("UpdatePost: %v", err)
	}
	return rows, nil
}

// SoftDeletePost : Postレコードをソフトデリートする関数
func SoftDeletePost(id int) (int64, error) {
	query := "UPDATE posts SET deleted_on = $1 WHERE id = $2"
	rows, err := SoftDeleteRecord(query, id)
	if err != nil {
		return 0, fmt.Errorf("SoftDeletePost: %v", err)
	}
	return rows, nil
}
