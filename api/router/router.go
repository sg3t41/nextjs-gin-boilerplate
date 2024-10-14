package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/sg3t41/syomei_api/router/api/v1"
)

// InitRouter initialize routing information
func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	apiv1 := r.Group("/api/v1")
	// api_v1.Use(jwt.JWT())
	{
		apiv1.GET("/posts", v1.GetPost)
		apiv1.POST("/posts", v1.PostPost)
	}

	return r
}
