clean:
	rm -rf ./teleops-ui/src/dist

make-dirs: clean
	mkdir -p ./teleops-ui/src/dist/js

buf: make-dirs
	buf generate --timeout 5m --template ./buf.gen.yaml buf.build/googleapis/googleapis
	buf generate --timeout 5m --template ./buf.gen.yaml buf.build/erdaniels/gostream
	buf generate --timeout 5m --template ./buf.gen.yaml buf.build/viamrobotics/api
	mv ./teleops-ui/src/dist


