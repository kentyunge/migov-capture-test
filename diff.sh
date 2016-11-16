Black='\033[0;30m'
Green='\033[0;32m'
Yellow='\033[1;33m'
NC='\033[0m' # No Color
RED='\033[0;31m'
CYAN='\033[0;36m'

echo -e "${CYAN} Creating Directories ${NC}"
mkdir -p new
mkdir -p old

echo -e "${CYAN} Removing old images ${NC}"
rm -rf ./old/*

echo -e "${CYAN} Copying images from new to old ${NC}"
cp -r ./new/. ./old/

echo -e "${CYAN} Capturing screenshots ${NC}"
cd new
capture < ../urls.json

echo -e "${CYAN} Running compare ${NC}"
cd ..
node app.js