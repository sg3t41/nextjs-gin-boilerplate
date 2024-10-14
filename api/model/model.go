package model

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"time"

	"github.com/sg3t41/syomei_api/config"
)

var DB *sql.DB

// Model : DBレコードに共通するフィールド
type Model struct {
	ID        int          `json:"id"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at"`
}

// Setup : データベースのセットアップ関数
func Setup() {
	var err error
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.DatabaseSetting.Host,
		config.DatabaseSetting.Port,
		config.DatabaseSetting.User,
		config.DatabaseSetting.Password,
		config.DatabaseSetting.Name)

	DB, err = sql.Open(config.DatabaseSetting.Type, dsn)
	if err != nil {
		log.Fatalf("models.Setup err: %v", err)
	}

	DB.SetMaxIdleConns(10)
	DB.SetMaxOpenConns(100)

	//DBへの疎通確認
	err = DB.Ping()
	if err != nil {
		log.Fatalf("db.Ping err: %v", err)
	}
}

// CloseDB : データベース接続を閉じる
func CloseDB() {
	if DB != nil {
		DB.Close()
	}
}

// CreateRecord : 新しいレコードを作成する関数
func CreateRecord(query string, args ...interface{}) (int64, error) {
	var lastInsertId int64
	nowTime := time.Now()
	args = append(args, nowTime, nowTime)
	err := DB.QueryRow(query+" RETURNING id", args...).Scan(&lastInsertId)
	if err != nil {
		return 0, err
	}
	return lastInsertId, nil
}

// UpdateRecord : レコードを更新する関数
func UpdateRecord(query string, args ...interface{}) (int64, error) {
	nowTime := time.Now()
	args = append(args, nowTime)
	result, err := DB.Exec(query, args...)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}

// SoftDeleteRecord : レコードをソフトデリートする関数
func SoftDeleteRecord(query string, args ...interface{}) (int64, error) {
	nowTime := time.Now()
	args = append(args, nowTime)
	result, err := DB.Exec(query, args...)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}