yarn build
ssh vps@part-of-speech-tool.info "rm -rf /home/vps/pos-tagger-front/build/*"
rsync -av --progress build/ vps@part-of-speech-tool.info:/home/vps/pos-tagger-front/build
