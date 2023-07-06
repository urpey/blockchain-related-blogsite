set -e
set -x

source scripts/config

npm i
CI=true npm test
npm run build
./scripts/deploy.sh
