package redis

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"github.com/sg3t41/syomei_api/config"
)

var rdb *redis.Client

func SetUp() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     config.RedisSetting.Host,
		Password: config.RedisSetting.Password,
		DB:       0,
	})
}

func Set(c *gin.Context, key, value string) {
	ctx := c.Request.Context()
	err := rdb.Set(ctx, key, value, 0).Err()
	if err != nil {
		panic(err)
	}
}

func Get(c *gin.Context, key string) {
	ctx := c.Request.Context()
	val, err := rdb.Get(ctx, key).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println(key, val)
}

func IsExists(c *gin.Context, key string) {
	ctx := c.Request.Context()
	val, err := rdb.Get(ctx, key).Result()
	if err == redis.Nil {
		fmt.Println("既に存在します")
	} else if err != nil {
		panic(err)
	} else {
		fmt.Println(key, val)
	}
}
