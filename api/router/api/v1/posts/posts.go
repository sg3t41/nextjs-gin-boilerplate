package posts

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	service "github.com/sg3t41/api/service/post"
)

func Get(c *gin.Context) {
	sp := service.Post{}
	p, err := sp.Get()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch post"})
		return
	}
	c.JSON(http.StatusOK, p)
}

func Post(c *gin.Context) {
	sp := service.Post{}
	sp.Add()
}
