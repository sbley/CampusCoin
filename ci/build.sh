#!/usr/bin/env sh
set -x
set -e
ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" --port 7545 > /dev/null &
GANACHE_PID=$!
trap "kill $GANACHE_PID" EXIT INT TERM

truffle compile
truffle migrate
truffle test

npm test
ng e2e
ng lint


#(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
#(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
#(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef

#(P0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
