package util

import "github.com/sg3t41/syomei_api/pkg/setting"

var JwtSecret []byte

// Setup Initialize the util
func Setup() {
	JwtSecret = []byte(setting.AppSetting.JwtSecret)
}
