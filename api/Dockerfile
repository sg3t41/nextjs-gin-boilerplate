FROM golang:latest

WORKDIR $GOPATH/src/github.com/sg3t41/syomei_api

COPY . $GOPATH/src/github.com/sg3t41/syomei_api 

# airをインストール
RUN go install github.com/air-verse/air@latest

# 環境変数PATHを設定
ENV PATH=$PATH:$GOPATH/bin

EXPOSE 8080
ENTRYPOINT ["air"]
