package login

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sg3t41/syomei_api/pkg/redis"
	"github.com/sg3t41/syomei_api/pkg/util/jwt"
	service "github.com/sg3t41/syomei_api/service/user"
)

type UserInput struct {
	Email string `json:"email"`
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
		Email:        ui.Email,
		PasswordHash: ui.PasswordHash,
	}

	user, err := sp.GetByEmailAndPassword()
	if err != nil {
		fmt.Println(err)
		// ユーザーが見つからなかった場合のメッセージ
		//		if err.Error() == "GetUserByEmailAndPassword: user not found" {
		//			c.JSON(http.StatusUnauthorized, gin.H{"message": "ユーザーが見つかりませんでした。メールアドレスまたはパスワードが正しいか確認してください。"})
		//			return
		//		}
		c.JSON(http.StatusUnauthorized, gin.H{"message": "ユーザーが見つかりませんでした。メールアドレスまたはパスワードが正しいか確認してください。"})
		return
	}

	// jwtトークンの発行
	token, err := jwt.GenerateToken(user.Username, user.ID, ui.Email)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "error auth token"})
		return
	}

	// Redis
	// Redisにユーザー情報を保存
	userKey := "user:" + user.ID
	userData := map[string]interface{}{
		"userID":   user.ID,
		"username": user.Username,
		"email":    user.Email,
		//		"password_hash": ui.PasswordHash,
	}

	if err := redis.HSet(c, userKey, userData); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save user to Redis"})
		return
	}

	// トークンをRedisに保存（オプション）
	if err := redis.Set(c, "token:"+token, user.ID); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save token to Redis"})
		return
	}

	fmt.Println("[debug]ログイン")
	fmt.Println(user)

	c.JSON(http.StatusOK, gin.H{"token": token})
}
