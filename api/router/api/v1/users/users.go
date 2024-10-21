package users

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sg3t41/syomei_api/pkg/redis"
	"github.com/sg3t41/syomei_api/pkg/util/jwt"
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

	userID, err := sp.Add()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "add user"})
		return
	}

	// todo 存在チェック

	// jwtトークンの発行
	strUserID := strconv.FormatInt(userID, 10)
	token, err := jwt.GenerateToken(ui.Username, strUserID, ui.Email)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "error auth token"})
		return
	}

	// Redis
	// Redisにユーザー情報を保存
	userKey := "user:" + strUserID
	userData := map[string]interface{}{
		"username":      ui.Username,
		"email":         ui.Email,
		"password_hash": ui.PasswordHash,
	}

	if err := redis.HSet(c, userKey, userData); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save user to Redis"})
		return
	}

	// トークンをRedisに保存（オプション）
	if err := redis.Set(c, "token:"+token, strUserID); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save token to Redis"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
