package routers

import (
	"github.com/gin-contrib/cors" // CORSパッケージのインポート
	"github.com/gin-gonic/gin"
	"github.com/sg3t41/syomei_api/router/api/v1/posts"
	"github.com/sg3t41/syomei_api/router/api/v1/users"
	"net/http"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// CORS設定
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 3600,
	}

	r.Use(cors.New(corsConfig))

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

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
