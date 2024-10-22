package jwt

import (
	"time"

	// TODO: github.com/golang-jwt/jwt にする
	"github.com/dgrijalva/jwt-go"
	"github.com/sg3t41/syomei_api/pkg/util"
	_ "github.com/sg3t41/syomei_api/pkg/util/md5"
)

type Claims struct {
	UserID string `json:"user_id"`
	// Password string `json:"password"`
	Email    string `json:"email"`
	Username string `json:"username"`
	jwt.StandardClaims
}

// GenerateToken generate tokens used for auth
func GenerateToken(username, userID, email string) (string, error) {
	nowTime := time.Now()
	// fix
	expireTime := nowTime.Add(9999 * time.Hour)

	claims := Claims{
		// fixme パラメータの選定
		UserID:   userID,
		Username: username,
		Email:    email,
		// md5.Encode(username),
		// md5.Encode(userID),
		// md5.Encode(email),

		StandardClaims: jwt.StandardClaims{
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
