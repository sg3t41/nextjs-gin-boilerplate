package e

var MsgFlags = map[int]string{
	SUCCESS:                        "ok",
	ERROR:                          "fail",
	INVALID_PARAMS:                 "リクエストパラメータが不正です",
	ERROR_AUTH_CHECK_TOKEN_FAIL:    "トークン認証に失敗しました",
	ERROR_AUTH_CHECK_TOKEN_TIMEOUT: "トークンの有効期限が切れています",
	ERROR_AUTH_TOKEN:               "トークンの生成に失敗しました",
	ERROR_AUTH:                     "トークンエラー",
}

func GetMsg(code int) string {
	msg, ok := MsgFlags[code]
	if ok {
		return msg
	}

	return MsgFlags[ERROR]
}
