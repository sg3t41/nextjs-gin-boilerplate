package routers

import (
	"github.com/gin-contrib/cors" // CORSパッケージのインポート
	"github.com/gin-gonic/gin"
	"github.com/sg3t41/syomei_api/router/api/v1/posts"
	"github.com/sg3t41/syomei_api/router/api/v1/users"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// CORS設定
	corsConfig := cors.Config{
		AllowOrigins:     []string{"*", "http://localhost:3000", "http://frontend:3000"}, // すべてのオリジンを許可
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},            // 許可するHTTPメソッド
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},            // 許可するヘッダー
		ExposeHeaders:    []string{"Content-Length"},                                     // エクスポーズするヘッダー
		AllowCredentials: true,                                                           // Cookieを使用する場合はtrueに設定
		MaxAge:           12 * 3600,                                                      // プリフライトリクエストのキャッシュ時間
	}

	r.Use(cors.New(corsConfig)) // CORSミドルウェアを使用

	apiv1 := r.Group("/api/v1")
	// apiv1.Use(jwt.JWT())
	{
		apiv1.GET("/posts", posts.Get)
		apiv1.POST("/posts", posts.Post)

		apiv1.GET("/users", users.Get)
		apiv1.POST("/users", users.Post)
		apiv1.OPTIONS("/users", users.Options)
	}

	return r
}

