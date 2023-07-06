set -e
set -x

source scripts/config

aws s3 sync build s3://$S3_BUCKET_NAME
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --paths '/*'
