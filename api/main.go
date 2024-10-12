package main

import (
	"database/sql"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sg3t41/syomei_api/models"
	"github.com/sg3t41/syomei_api/pkg/setting"
	"github.com/sg3t41/syomei_api/pkg/util"

	_ "github.com/lib/pq"
)

func init() {
	setting.Setup()
	util.Setup()
	models.Setup()
}

type User struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	PasswordHash string `json:"password_hash"`
	CreatedAt    string `json:"created_at"`
}

func main() {
	r := gin.Default()

	// CORS設定
	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true, // すべてのオリジンを許可
		// AllowOrigins:     []string{"http://localhost:3000"}, // 特定のオリジンを許可
		// AllowMethods:     []string{"GET", "POST"},           // 許可するHTTPメソッド
		// AllowHeaders:     []string{"Origin", "Content-Type"}, // 許可するヘッダー
	}))

	r.GET("/post", func(c *gin.Context) {
		id, err := models.CreatePost(1, "title", "内容")
		if err != nil {
			fmt.Println(err)
		}
		c.JSON(200, gin.H{
			"result": id,
		})
	})

	r.GET("/user", func(c *gin.Context) {
		id, err := models.CreateUser("testuser", "testuser@gmail.com", "testpasswordhash")
		if err != nil {
			fmt.Println(err)
		}
		c.JSON(200, gin.H{
			"result": id,
		})
	})

	r.Run() // 0.0.0.0:8080
	connectDB()
}

func connectDB() []User {
	db, err := sql.Open("postgres", "host=syomei_db port=5432 user=myuser password=password dbname=mydb sslmode=disable")
	defer db.Close()

	if err != nil {
		fmt.Println(err)
	}

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		fmt.Println(err)
	}

	var us []User
	for rows.Next() {
		var u User
		err := rows.Scan(&u.ID, &u.Username, &u.Email, &u.PasswordHash, &u.CreatedAt)
		if err != nil {
			fmt.Println(err)
			continue
		}

		us = append(us, u)
	}

	return us
}
