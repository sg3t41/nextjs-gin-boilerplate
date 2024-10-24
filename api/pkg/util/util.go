package util

import "github.com/sg3t41/api/config"

var JwtSecret []byte

// Setup Initialize the util
func Setup() {
	JwtSecret = []byte(config.AppSetting.JwtSecret)
}
