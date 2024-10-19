#!/bin/bash

# 既存のディレクトリがあれば削除してリポジトリをクローン
if ! [ -d devenv ]; then
  git clone https://github.com/sg3t41/dotfiles.git devenv
fi

# コンテナをバックグラウンドで起動
docker compose up -d

# 開発作業用コンテナに入る
docker compose exec -it devenv bash

