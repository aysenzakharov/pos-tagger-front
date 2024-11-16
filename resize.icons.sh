rm -rf icons
mkdir icons
for size in 192 512; do
	convert -background none -resize ${size}x${size} public/logo.svg public/logo${size}.png
done
convert public/logo.svg -define icon:auto-resize=64,32,24,16 public/favicon.ico
