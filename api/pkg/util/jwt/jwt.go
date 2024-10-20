package jwt

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/sg3t41/syomei_api/pkg/util"
	"github.com/sg3t41/syomei_api/pkg/util/md5"
)

type Claims struct {
	UserID   string `json:"user_id"`
	Password string `json:"password"`
	Email    string `json:"email"`
	jwt.StandardClaims
}

// GenerateToken generate tokens used for auth
func GenerateToken(username, userID, email string) (string, error) {
	nowTime := time.Now()
	expireTime := nowTime.Add(3 * time.Hour)

	claims := Claims{
		// fixme パラメータの選定
		md5.Encode(username),
		md5.Encode(userID),
		md5.Encode(email),
		jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(),
			Issuer:    "syomeiapp-tmp",
		},
	}

	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := tokenClaims.SignedString(util.JwtSecret)

	return token, err
}

// ParseToken parsing token
func ParseToken(token string) (*Claims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return util.JwtSecret, nil
	})

	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
			return claims, nil
		}
	}

	return nil, err
}
