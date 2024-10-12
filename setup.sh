#!/bin/bash

# 既存のディレクトリがあれば削除してリポジトリをクローン
if [ -d devenv ]; then
  rm -rf devenv
fi
git clone https://github.com/sg3t41/dotfiles.git devenv

# コンテナをバックグラウンドで起動
docker compose up -d --build

# 開発作業用コンテナに入る
docker compose exec -it devenv bash

