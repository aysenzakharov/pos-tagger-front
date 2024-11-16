yarn build
ssh vps@nsk-group.shop "rm -rf /home/vps/pos-tagger-front/build/*"
rsync -av --progress build/ vps@nsk-group.shop:/home/vps/pos-tagger-front/build
