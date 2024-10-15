package users

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	service "github.com/sg3t41/syomei_api/service/user"
)

func Get(c *gin.Context) {
	sp := service.User{}
	p, err := sp.Get()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch post"})
		return
	}
	c.JSON(http.StatusOK, p)
}

type UserInput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	// クライアント側でSHA256×1されたもの
	PasswordHash string `json:"password_hash"`
}

func Post(c *gin.Context) {
	fmt.Println("呼ばれたよ")
	c.Header("Access-Control-Allow-Origin", "*")                                // すべてのオリジンを許可
	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") // 許可するメソッドを設定
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")     // 許可するヘッダーを設定
	c.Status(http.StatusOK)                                                     // 200 OK を返す
	var ui UserInput
	if err := c.ShouldBindJSON(&ui); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	sp := service.User{
		Username:     ui.Username,
		Email:        ui.Email,
		PasswordHash: ui.PasswordHash,
	}

	id, err := sp.Add()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "add user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": id})
}

// OPTIONSメソッドのハンドラーを追加
func Options(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")                                // すべてのオリジンを許可
	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") // 許可するメソッドを設定
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")     // 許可するヘッダーを設定
	c.Status(http.StatusOK)                                                     // 200 OK を返す
}
