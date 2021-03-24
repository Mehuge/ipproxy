# ipproxy
A simple tcp proxy for Deno

# Usage
```
deno run --allow-net tcpproxy.js localPort remoteHost:remotePort
```

# Build standalone binary for current platform
```
deno compile --allow-net --unstable tcpproxy.js
```

# Using binary
```
tcpproxy localPort remoteHost:remotePort
```
