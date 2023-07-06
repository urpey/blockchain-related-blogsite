set -e
set -x

docker build -t blockchain-okd-image .

# docker run -it -p 8100:8100  blockchain-okd-container
docker compose up --build