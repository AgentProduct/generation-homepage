## 会话管理

### JWT 认证

JWT（JSON Web Token）是一种用于认证和授权的紧凑型 Token，其核心特点是自包含——将用户信息直接编码在 Token 中，服务端无需存储会话状态。它由三部分组成：Header、Payload 和 Signature，每部分经过 Base64Url 编码后以点号分隔。

- Header：一个 JSON 对象，包含 Token 类型（typ，通常为"JWT"）和签名算法（alg，如 HS256 或 RS256）。
- Payload：一个 JSON 对象，包含用户身份信息（如 user_id、角色等）以及其他声明（claims），如过期时间（exp）、签发时间（iat）等。
- Signature：对 Header 和 Payload 使用指定算法和密钥生成的签名串，用于验证 Token 在传输过程中未被篡改，并确认签发者的合法性。

**认证流程：**

1. 登录签发：用户登录成功后，服务端生成一对 Token——access_token（短时效，如 15 分钟）和 refresh_token（长时效，如 7 天），并返回给客户端。
2. 携带发送：客户端将两个 Token 存储在安全位置（通常将 refresh_token 置于 HttpOnly Cookie 中防 XSS，access_token 可置于内存或 Authorization 头），后续请求时在请求头中自动携带 access_token。
3. access_token 验证：服务端收到请求后，首先验证 access_token 的签名和过期时间。若验证通过，直接放行，用户身份认证成功。
4. 尝试刷新：若 access_token 验证失败（过期或无效），服务端不立即拒绝请求，而是尝试使用 refresh_token 进行刷新。服务端验证 refresh_token 的签名和过期时间，并检查其是否在有效期内且未被撤销。
5. 重新签发：若 refresh_token 有效，服务端生成新的 access_token（同时可选择是否刷新 refresh_token，视安全策略而定），并将新 Token 返回给客户端。客户端收到后更新本地存储，并用新 access_token 重试原请求。
6. 拒绝访问：若 refresh_token 也无效（过期、签名错误或被列入黑名单），则判定用户身份认证失败，返回 401 Unauthorized，客户端需引导用户重新登录。

**node 为例**

```js
const jwt = require("jsonwebtoken");
const secret = "your-secret-key";

// 生成 token
const accessToken = jwt.sign({ userId: 1 }, secret, { expiresIn: "15m" }); // 15 分钟过期
const refreshToken = jwt.sign({ userId: 1 }, secret, { expiresIn: "7d" }); // 7 天过期
console.log(accessToken);
console.log(refreshToken);

// 验证 access token
const decoded = jwt.verify(accessToken, secret);
console.log(decoded);

// 验证 refresh token
const decodedRefresh = jwt.verify(refreshToken, secret);
console.log(decodedRefresh);
```

### Session ID 认证

Session ID 是一种用于保存用户会话信息的手段。用户在登录成功后，服务器会生成一个唯一标识符（即 Session ID），并将其存储在服务端（通常为内存或 Redis 等高速缓存中），同时将 Session ID 返回给客户端。服务端通过 Session ID 关联当前会话的用户身份、权限及其他上下文信息，后续请求中客户端携带该 ID，服务端即可识别并维持用户的登录状态。

**认证流程：**

- 生成：用户登录成功后，服务器为其生成一个全局唯一的 Session ID（通常为一串随机字符串）。
- 存储：服务端将 Session ID 与对应的用户信息（如用户 ID、权限、登录时间等）绑定，并存储在后端存储介质中（常见的有 Redis、Memcached 或数据库）。
- 传递：服务器将 Session ID 返回给客户端，通常通过 Cookie 方式自动携带。
- 验证：客户端后续发起请求时携带该 Session ID，服务端据此查询存储介质，还原用户会话信息，从而完成身份识别与状态维持。

**node 为例**

```js
// 生成 session id
const sessionId = uuidv4();
console.log(sessionId);
```
