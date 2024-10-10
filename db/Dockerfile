# PostgreSQLの公式イメージを使用
FROM postgres:latest

# 環境変数で初期設定
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=mydb

# 初期化スクリプトを追加（必要に応じて）
COPY ./init.sql /docker-entrypoint-initdb.d/

# ポート番号
EXPOSE 5432
