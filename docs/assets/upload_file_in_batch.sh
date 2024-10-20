#!/usr/bin/env bash

upload_file() {
  local filepath="$1"
  curl -s --request POST \
    --url http://127.0.0.1:3000/api/v1/file/upload \
    --header 'Content-Type: multipart/form-data' \
    --header 'User-Agent: insomnia/10.1.0' \
    --form "file=@${filepath}"
}

for file in ./Faturas/**/*.pdf; do
  echo "INFO: uploading: '$file'"
  upload_file "$file" | jq
done
