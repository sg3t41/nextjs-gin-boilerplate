package redis

import (
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

// Setは文字列を保存します
func Set(c *gin.Context, key, value string) error {
	ctx := c.Request.Context()
	err := rdb.Set(ctx, key, value, 0).Err()
	if err != nil {
		return err
	}
	return nil
}

// Getは文字列を取得します
func Get(c *gin.Context, key string) (string, error) {
	ctx := c.Request.Context()
	val, err := rdb.Get(ctx, key).Result()
	if err != nil {
		return "", err
	}
	return val, nil
}

// HSetはハッシュを保存します
func HSet(c *gin.Context, key string, fields map[string]interface{}) error {
	ctx := c.Request.Context()
	err := rdb.HSet(ctx, key, fields).Err()
	if err != nil {
		return err
	}
	return nil
}

// HGetはハッシュからフィールドを取得します
func HGet(c *gin.Context, key, field string) (string, error) {
	ctx := c.Request.Context()
	val, err := rdb.HGet(ctx, key, field).Result()
	if err != nil {
		return "", err
	}
	return val, nil
}

// SAddはセットに要素を追加します
func SAdd(c *gin.Context, key string, members ...interface{}) error {
	ctx := c.Request.Context()
	err := rdb.SAdd(ctx, key, members...).Err()
	if err != nil {
		return err
	}
	return nil
}

// SMembersはセットの要素を取得します
func SMembers(c *gin.Context, key string) ([]string, error) {
	ctx := c.Request.Context()
	members, err := rdb.SMembers(ctx, key).Result()
	if err != nil {
		return nil, err
	}
	return members, nil
}

// LPushはリストの先頭に要素を追加します
func LPush(c *gin.Context, key string, values ...interface{}) error {
	ctx := c.Request.Context()
	err := rdb.LPush(ctx, key, values...).Err()
	if err != nil {
		return err
	}
	return nil
}

// LRangeはリストの範囲を取得します
func LRange(c *gin.Context, key string, start, stop int64) ([]string, error) {
	ctx := c.Request.Context()
	values, err := rdb.LRange(ctx, key, start, stop).Result()
	if err != nil {
		return nil, err
	}
	return values, nil
}

// IsExistsはキーの存在を確認します
func IsExists(c *gin.Context, key string) (bool, error) {
	ctx := c.Request.Context()
	_, err := rdb.Get(ctx, key).Result()
	if err == redis.Nil {
		return false, nil // キーが存在しない
	} else if err != nil {
		return false, err // エラー
	}
	return true, nil // キーが存在する
}

