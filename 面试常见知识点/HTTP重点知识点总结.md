# HTTP 重点知识总结

[HTTP 重点知识总结](https://www.nowcoder.com/discuss/634359?source_id=profile_create_nctrack&channel=-1)

## 1. HTTP 报文结构

HTTP报文由 **报文首部** 和 **报文主体** 构成，中间由一个 **空行分隔**。**报文首部包含请求行和请求头部**，报文主体主要包含被发送的信息。

报文首部是客户端或服务端需要处理请求或响应的内容及属性，可以传递额外的信息。

一个HTTP报文示例：

```http
GET /index.html HTTP/1.1
Host: www.enjoytoday.cn
Connection: keep-alive
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: http://www.enjoytoday.cn/posts/326
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8

username=hfcai&sex=man
```

### 1.1 请求报文

一个 HTTP 请求报文由 **请求行，请求头部，空行和请求数据** 4部分组成

![http请求报文.drawio](https://s2.loli.net/2022/03/03/ohwEH3WaI86XQiF.png)

请求行：

- 方法
- URI
- HTTP版本

请求头部：首部字段名和字段值构成，中间用 **:** 风格。

- 首部字段格式：首部字段名:字段值

### 1.2 响应报文

HTTP 响应报文由 **状态行，响应头部，空行和响应体** 4部分组成

![http响应报文](https://s2.loli.net/2022/03/03/z8ba5HS1IVvXymd.png)

状态行：HTTP版本 + 状态码 + 响应短语

## 2. HTTP 首部字段

### 2.1 HTTP 通用首部字段

通用首部字段是请求报文和响应报文都会使用的字段，例如：

|   通用头部字段    | HTTP1.0 | HTTP1.1 |                             含义                             |
| :---------------: | :-----: | :-----: | :----------------------------------------------------------: |
|     **Date**      |   有    |         | 表示请求和响应生成的日期，GTM时间。例如 `Tue, 02 Mar 2021 12:31:25 GMT` |
|      Pragma       |   有    |         |               表示数据是否允许被缓存的通信选项               |
| **Cache-Control** |         |   有    |                      控制缓存的相关信息                      |
|  **Connection**   |         |   有    |            设置发送响应之后 TCP 连接是否继续保持             |
| Transfer-Encoding |         |   有    |                    表示消息主体的编码格式                    |
|        Via        |         |   有    |                   记录途中经过的代理和网关                   |

### 2.2 HTTP 请求头部字段

|        通用头部字段         | HTTP1.0 | HTTP1.1 |                             含义                             |
| :-------------------------: | :-----: | :-----: | :----------------------------------------------------------: |
|            Host             |         |   有    |                接受请求的服务器IP地址和端口号                |
|           Accept            |   有    |   有    |                    客户端可支持的数据类型                    |
|       **User-Agent**        |   有    |   有    |              客户端软件的名称和版本号等相关信息              |
| **If-Modified-S\**\*rong>** |   有    |   有    |             UMT时间，表示该时间之后资源是否修改              |
|      **If-None-Match**      |         |   有    |                  返回服务器响应头的 Etag 值                  |
|           Referer           |   有    |   有    | 通过点击超链接进入下一个页面时，在这里会记录上一个页面的 URI |
|       Accept-Encoding       |   有    |   有    |                    客户端可支持的编码格式                    |
|       Accept-Language       |   有    |   有    |                      客户端可支持的语言                      |
|          If-Match           |         |   有    |                                                              |
|     If-Unmodified-Since     |         |   有    |                                                              |
|            Range            |         |   有    |  当只需要回去部分数据时，可通过这个字段指定要获取的数据范围  |

### 2.3 HTTP 响应头部字段

| 通用头部字段 | HTTP1.0 | HTTP1.1 |               含义               |
| :----------: | :-----: | :-----: | :------------------------------: |
|   Location   |   有    |   有    |   表示信息的准确位置，绝对路径   |
|    Server    |   有    |   有    | 服务器程序的名称和版本号相关信息 |

### 2.4 HTTP 实体（消息体）首部字段

|   通用头部字段    | HTTP1.0 | HTTP1.1 |                含义                |
| :---------------: | :-----: | :-----: | :--------------------------------: |
|       Allow       |   有    |   有    |     表示指定的 URI 支持的方法      |
| Content-Encoding  |   有    |   有    |           消息的编码格式           |
|  Content-Length   |   有    |   有    |            消息体的长度            |
|   Content-Type    |   有    |   有    |          消息体的数据类型          |
|    **Expires**    |   有    |   有    |      消息体的有效期，UMT 时间      |
| **Last-Modified** |   有    |   有    |         数据最后更新的日期         |
|     **Etag**      |         |   有    | 资源的唯一标识符，控制是否使用缓存 |

## 3. HTTP 方法

根据 HTTP 标准，HTTP 请求可以使用多种请求方法。

HTTP1.0 定义了三种请求方法：GET、POST 和 HEAD 方法

HTTP1.1 新增了六种方法：OPTIONS、PUT、PATCH、DELETE、TRACE 和 CONNECT 方法

|  方法   |                             描述                             |
| :-----: | :----------------------------------------------------------: |
|   GET   |                     用于从服务器获取数据                     |
|  HEAD   | 类似于 GET 请求，只不过响应中没有具体的内容，**用户获取报头** |
|  POST   | 向指定资源提交数据进行处理请求。数据被包含在请求体中，POST请求可能导致新的资源的建立或已有资源的修改 |
|   PUT   |          客户端向服务器传送的数据取代指定的文档内容          |
| DELETE  |                   请求服务器删除指定的资源                   |
| OPTIONS |                  允许客户端查看服务器的性能                  |
| CONNECT |  HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。   |
|  TRACE  |          回显服务器收到的请求，主要用于测试或诊断。          |
|  PATCH  |      是对 PUT 方法的补充，用来对已知资源进行局部更新 。      |

GET与POST方法的区别：

1. get 是从指定的资源请求数据，post 是向指定的资源提交要处理的数据 
2. get 请求可以被缓存，post 请求不会被缓存 
3. get 请求传输的数据有长度限制，一般为 2048 字符，post 请求传输的数据没有大小限制 
4. get 请求的数据一般追加在 URL 的末尾，post 请求的数据在 http 请求体中 

一般不使用 GET 请求发送如密码这样的敏感信息。我认为 get 请求比 post 请求更安全。

## 4. HTTP 常见状态码

| 状态码  |            英文名称             |                             描述                             |
| :-----: | :-----------------------------: | :----------------------------------------------------------: |
|   100   |            Continue             |                   继续。客户端应继续其请求                   |
|   101   |       Switching Protocols       | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
| **200** |             **OK**              |             **请求成功。一般用于GET与POST请求**              |
|   201   |             Created             |               已创建。成功请求并创建了新的资源               |
|   202   |            Accepted             |              已接受。已经接受请求，但未处理完成              |
|   203   |  Non-Authoritative Information  | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| **204** |         **No Content**          | **无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档** |
|   205   |          Reset Content          | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| **206** |       **Partial Content**       |          **部分内容。服务器成功处理了部分GET请求**           |
|   300   |        Multiple Choices         | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| **301** |      **Moved Permanently**      | **永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替** |
| **302** |            **Found**            | **临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI** |
|   303   |            See Other            |        查看其它地址。与301类似。使用GET和POST请求查看        |
| **304** |        **Not Modified**         | **未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源** |
|   305   |            Use Proxy            |            使用代理。所请求的资源必须通过代理访问            |
|   306   |             Unused              |                    已经被废弃的HTTP状态码                    |
|   307   |       Temporary Redirect        |           临时重定向。与302类似。使用GET请求重定向           |
|         |                                 |                                                              |
| **400** |         **Bad Request**         |           **客户端请求的语法错误，服务器无法理解**           |
| **401** |        **Unauthorized**         |                  **请求要求用户的身份认证**                  |
|   402   |        Payment Required         |                        保留，将来使用                        |
| **403** |          **Forbidden**          |      **服务器理解请求客户端的请求，但是拒绝执行此请求**      |
| **404** |          **Not Found**          | **服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面** |
|   405   |       Method Not Allowed        |                   客户端请求中的方法被禁止                   |
|   406   |         Not Acceptable          |          服务器无法根据客户端请求的内容特性完成请求          |
|   407   |  Proxy Authentication Required  | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
|   408   |        Request Time-out         |           服务器等待客户端发送的请求时间过长，超时           |
|   409   |            Conflict             | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突 |
|   410   |              Gone               | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
|   411   |         Length Required         |    服务器无法处理客户端发送的不带Content-Length的请求信息    |
|   412   |       Precondition Failed       |                 客户端请求信息的先决条件错误                 |
|   413   |    Request Entity Too Large     | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
|   414   |      Request-URI Too Large      |        请求的URI过长（URI通常为网址），服务器无法处理        |
|   415   |     Unsupported Media Type      |               服务器无法处理请求附带的媒体格式               |
|   416   | Requested range not satisfiable |                     客户端请求的范围无效                     |
|   417   |       Expectation Failed        |               服务器无法满足Expect的请求头信息               |
| **500** |    **Internal Server Error**    |               **服务器内部错误，无法完成请求**               |
|   501   |         Not Implemented         |             服务器不支持请求的功能，无法完成请求             |
| **502** |         **Bad Gateway**         | **作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应** |
|   503   |       Service Unavailable       | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| **504** |      **Gateway Time-out**       |    **充当网关或代理的服务器，未及时从远端服务器获取请求**    |
|   505   |   HTTP Version not supported    |        服务器不支持请求的HTTP协议的版本，无法完成处理        |

## 5. HTTP-304 状态码

304状态码是在协商缓存，缓存命中的时候服务器返回的，告诉客户端，服务器资源没有修改，可以使用客户端自己的缓存。

浏览器缓存分**为强缓存（本地缓存）和协商缓存（弱缓存）**。

![image-20220303144435096](https://s2.loli.net/2022/03/03/RQsaZ5zN8yf1AEx.png)

如上图所示，在浏览器第一次发出请求之后，需要再次发送请求的时候，浏览器首先获取该资源缓存的 header 信息，然后根据 Cache-Control 和 Expires 字段判断缓存是否过期。如果没有过期，直接使用浏览器缓存，并不会与服务器通信。该过程为判断是否使用强缓存，即本地缓存。

1. Cache-control

    该字段是 HTTP1.1 规范，一般利用该字段的 max-age 属性来判断，这个值是一个相对时间，单位为 s，代表资源的有效期。例如：

    ```http
    Cache-Control:max-age=3600
    ```

    除此之外还有几个常用的值：

    - no-cache：表示**不使用强缓存**，需要使用协商缓存 
    - no-store：禁止**浏览器缓存数据**，每次请求下载完整的资源 
    - public：可以被所有用户缓存，包括终端用户和中间代理服务器 
    - private：只能被终端用户的浏览器缓

2. Expires

    该字段是 HTTP1.0 规范，他是一个绝对时间的 GMT 格式的时间字符串。例如：

    ```http
    expires:Mar, 06 Apr 2020 10:57:09 GMT这个时间代表资源的失效时间，只要发送请求的时间在这之前，都会使用强缓存。
    ```

    由于失效时间是一个绝对时间，因此当**服务器时间与客户端时间偏差较大时，就会导致缓存混乱**。

    如果缓存过期，浏览器会向服务器发送请求，即使用协商缓存。本次请求会带着第一次请求返回的有关缓存的 header 字段信息，比如以下两个字段：

    1. **Etag/If-None-Match**

        判断响应头中是否存在 Etag 字段，如果存在，浏览器则发送一个带有 If-None-Match 字段的请求头的请求，该字段的值为 Etag 值。服务器通过对比客户端发过来的Etag值是否与服务器相同。如果相同，说明缓存命中，服务器返回 304 状态码，并将 If-None-Match 设为 false，客户端继续使用本地缓存。如果不相同，说明缓存未命中，服务器返回 200 状态码，并将 If-None-Match 设为 true，并且返回请求的数据。

    2. **Last-Modified/If-Modified-S\**\*rong>**

        除了 Etag 字段之外，客户端还会通过服务器返回的 Last-Modified 字段判断是否继续使用缓存，该字段为服务器返回的资源的最后修改时间，为UMT时间。浏览器发送一个带有 If-Modified-Since 字段的请求头的请求给服务器，该字段的值为 Last-Modified 值。服务器收到之后，通过这个时间判断，在该时间之后，资源有无修改，如果未修改，缓存命中，返回 304 状态码；如果未命中，返回 200 状态码，并返回最新的内容。

**Cache-Control 与 Expires 的优先级：**

两者可以在服务端配置同时使用，**Cache-Control 的优先级高于 Expires。**

**Last-Modified/If-Modified-Since 已经可以判断缓存是否失效了，为什么出现 Etag/If-None-Match?**

 Etag/If-None-Match 是实体标签，是一个资源的唯一标识符，资源的变化都会导致 ETag 的变化。出现 Etag 的主要原因是解决 Last-Modified 比较难解决的问题：

- 一些文件也许会周期性的修改，但是他的内容并不发生改变，这个时候我们并不希望客户端认为这个文件修改了 
- 某些文件在秒以下的时间内进行修改了，If-Modified-Since无法判断。UNIX时间只能精确到秒 

Last-Modified 和 Etag 可以一起使用， **Etag 的优先级更高**。

**刷新页面的问题：**

F5刷新：不使用强缓存，使用协商缓存

ctrl+F5：二者都不使用

## 6. HTTP 与 HTTPS 的区别与实现方式

### 6.1 基本概念

- **HTTP是超文本传输协议**，是一个简单的**请求-响应协议**，它默认工作在**TCP的80端口**。它指定了**客户端可能发送给服务器什么样的消息以及得到什么样的响应**。协议以明文的方式进行发送，不提供任何方式的数据加密。因此HTTP协议不适合传输一些敏感信息

- **HTTPS是超文本传输安全协议**，是一种安全通信的传输协议。HTTPS经**由HTTP进行通信，但利用 SSL/TSL 来进行加密数据包**。HTTPS开发的主要目的是提供网站服务器的身份认证，保护数据交换的隐私与完整性。

    SSL（Secure Sockets Layer ）

    HTTPS默认工作在 TCP 的443 端口，它的工作方式如下：

    - TCP三次同步握手 
    - 客户端验证服务端数字证书 
    - DH [算法]()协商对称加密加密[算法]()的密钥、hash [算法]()的密钥 
    - SSL 安全加密隧道协商完成 
    - 网页以加密的方式进行传输，用协商的对称加密[算法]()和密钥加密，保障数据机密性；用协商的 hash [算法]()进行数据完整性保护，保证数据不被篡改。 

### 6.2 HTTP 与 HTTPS 的区别

- HTTP 使用明文传输，数据都是未**加密**的，安全性较差；HTTPS 数据传输过程是加密的，安全性较好； 

- 使用 HTTPS 一般需要到 CA 申请**证书** 

- HTTP页面的响应比 HTTPS **快**，主要是因为 HTTPS 除了 TCP 的三个包之外，还要加上 ssl 握手的 9 个包 

- HTTP 和 HTTPS 是完全不同连接方式，用的**端口**也不一样， 前者是80， 后者是 443 

- HTTPS 其实就是建构在 SSL/TSL 之上的 HTTP 协议，所以要比 HTTP 更消耗**服务器资源**

### 6.3 HTTPS 的工作方式

![image-20220303145524295](https://s2.loli.net/2022/03/03/AmrhqD49Pso2BJQ.png)

1. 客户端发起 HTTPS 请求

​		建立TCP连接之后，客户端发起请求

2. 服务端的配置

​		服务端收到请求之后，会有一套公钥和私钥，这对公钥和私钥其实就是一套数字证书，一般都是由受信任的		证书颁发机构进行签发。

3. 传送公钥

​		服务端将公钥传递给客户端，里面包含很多信息，如证书的颁发机构，证书的过期时间

4. 客户端解析证书

​		这部分工作由客户端的 TSL 来完成，首先验证证书是否有效。如果没有问题，就会随机生成一个 key，然后		利用公钥对 key 的值进行加密。

5. 传送加密的信息（key）

​		将加密过后的 key 传递给服务器

6. 使用私钥解析加密信息（key）

​		服务器使用自己的私钥解密加密信息得到 key

7. 使用客户端的 key，利用对称加密加密信息，并发送给客户端

​		把内容通过该 key 进行对称加密，并传输给客户端

8. 客户端使用 key 解密信息

​		客户端收到信息之后利用 key 进行解密

**重点：客户端会生成 key，key 的传输使用非对称加密，而数据的传输使用 key 进行对称加密。**

对称加密：加密密钥和解密密钥是同一个，效率较高

非对称加密：加密密钥和解密密钥不是同一个，效率较低

**由于非对称加密的效率比较低，因此我们通常不使用非对称加密对整个文件进行加密，而采用对称加密对文件加密，非对称加密对对称加密的密钥加密，然后将对称加密后的文件和非对称加密后的密钥一起在网上传送。**

### 6.4 SSL 的位置

![image-20220303145947981](https://s2.loli.net/2022/03/03/irhoNALBbuwcTFn.png)

在发送方，SSL接受应用层的数据（如HTTP或者IMAP报文），对数据进行加密，然后把加了密的数据送往TCP套接字。

在接收方，SSL从TCP套接字读取数据，解密后把数据交给应用层。

使用非对称加密进行文件传输。通信双方在传输时需要交换各自的公钥。

**SSL提供以下三个功能：**

（1）SSL服务器鉴别：允许用户证实服务器的身份。具有SSL功能的浏览器维持一个表，上面有一些可信赖的认证中心CA（Certificate Authority）和它们的公钥。

（2）加密的SSL会话：客户和服务器交互的所有数据都在发送方加密，在接收方解密。

（3）SSL客户鉴别：允许服务器证实客户的身份。

## 7. HTTP1.0与HTTP1.1以及HTTP2，0的区别

1. **长连接**

​		在HTTP1.0中，TCP每建立一次连接就只能发送一个 HTTP 请求并得到一个响应，当需要再次发送请求的时		候，又得重新建立 TCP 连接，这样就会很耗时间，传输效率较低。

​		HTTP1.1中支持长连接和流水线传输，在一个 TCP 连接中可以传送多个 HTTP 请求和响应，减少了建立和关		闭连接的消耗和延迟。在 HTTP1.1 中默认开启 Connection: Keep-Alive，一定程度上弥补了 HTTP1.0 的缺点

2. **缓存处理**

​		在 HTTP1.0 中主要使用 Expires、Last-Modified、If-Modified-Since 头部字段来作为缓存判断的标准

​		在 HTTP1.1 中增加了 Cache-Control、Etag、If-None-Match、If-Match 等头部字段来提供可选的更多的缓		存策略

3. **带宽优化及网络连接的使用**

​		HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过		来了。

​		HTTP1.1 中引入了 Range 头部字段，它允许只请求资源的某个部分，即返回状态码是 206

4. **Host头处理**

​		在 HTTP1.0 中认为每台服务器绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名。但随		着虚拟技术的发展，在一台物理设备上可以存在多台虚拟主机，并且他们共享同一 IP 地址 。在 HTTP1.1 的		请求消息和响应消息中都应支持 HOST 头域，且请求消息中没有 HOST 头域会报一个错误。

5. **错误通知的管理**

​		HTTP1.1 中新增了 24 个错误状态码，如 409 表示请求的资源与资源的当前状态发生冲突；410表示服务器上		的某个资源被永久性删除。

![image-20220303150952567](https://s2.loli.net/2022/03/03/FNX2nwkqDEVjfBJ.png)

### http2.0

1. 多路复用，如上

2. 在 1.1 中消息体一般都会经过gzip压缩或者本身传输的就是压缩过后的二进制文件，而**消息头部是以文本进行传输的**。但是在2.0中对消息头部进行了压缩。

3. 服务器推送

    服务端推送是一种在客户端请求之前发送数据的机制。

    在HTTP1.1中这些资源每一个都必须明确地请求。这是一个很慢的过程。浏览器从获取HTML开始，然后在它解析和评估页面的时候，增量地获取更多的资源。因为服务器必须等待浏览器做每一个请求，网络经常是空闲的和未充分使用的。

     为了改善延迟，HTTP2.0引入了server push，它允许服务端推送资源给浏览器，在浏览器明确地请求之前，免得客户端再次创建连接发送请求到服务器端获取。这样客户端可以直接从本地加载这些资源，不用再通过网络。

![image-20220303151057990](https://s2.loli.net/2022/03/03/MSVb2zJHvLIk1Gt.png)

## 8. HTTP建立持久连接的意义

在 HTTP1.0 中每发送一次请求都要重新建立 TCP 连接并且关闭连接。这样做是很耗费时间的。而在HTTP1.1 中默认开启长连接，一次TCP连接可以发送多个HTTP请求，避免了重复建立释放连接的开销，加速了数据的传输，节省了时间和带宽。

**那么长连接什么时候会释放呢？**

客户端的长连接不可能一直拿着，会有一个超时时间，服务器会告诉客户端超时时间，譬如：

```http
Access-Control-Allow-Origin: http://mall.sillywa.com
Connection: keep-alive
Content-Length: 43574
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Mar 2021 07:34:49 GMT
Keep-Alive: timeout=5
Vary: Origin
```

**Keep-Alive: timeout=5 表示这个 TCP 通道可以保持 5s**。**另外还可能有 max=xxx，表示这个长连接最多接受xxx次请求就断开**。对于客户端来说，如果服务端没有告诉是客户端超时时间也没关系，服务端可能主动发起四次挥手断开TCP连接，客户端就能够知道该TCP连接已经无效。

**长连接数据传送完成识别：**

1. 判断传输的数据是否达到了 Content-Length 指示的大小 
2. 没有 Content-Length，由于数据是分块传输的，这时候就要根据块的编码来判断了，最后一个一个编码的数据是一个空块，表明本次传输结束 

## 9. Cookie、Session 和 Token

![彻底理解cookie，session，token](https://s2.loli.net/2022/03/03/GawzAXHQb9nO3PZ.jpg)

- **Cookie**

    cookie 是一个非常具体的东西，指的就是浏览器里面能永久存储的一种数据，仅仅是浏览器实现的一种数据存储功能。

    **cookie由服务器生成，发送给浏览器**，浏览器把cookie以kv形式保存到某个目录下的文本文件内，下一次请求同一网站时会把该cookie发送给服务器。由于cookie是存在客户端上的，所以浏览器加入了一些限制确保cookie不会被恶意使用，同时不会占据太多磁盘空间，所以每个域的cookie数量是有限的。

- **Session**

    session 从字面上讲，就是会话。这个就类似于你和一个人交谈，你怎么知道当前和你交谈的是张三而不是李四呢？对方肯定有某种特征（长相等）表明他就是张三。

    session  也是类似的道理，服务器要知道当前发请求给自己的是谁。为了做这种区分，服务器就要给每个客户端分配不同的“身份标识”，然后客户端每次向服务器发请求的时候，都带上这个“身份标识”，服务器就知道这个请求来自于谁了。至于客户端怎么保存这个“身份标识”，可以有很多种方式，对于浏览器客户端，大家都默认采用 cookie 的方式。

    服务器使用session把用户的信息临时保存在了服务器上，用户离开网站后session会被销毁。这种用户信息存储方式相对cookie来说更安全，可是session有一个缺陷：如果web服务器做了负载均衡，那么下一个操作请求到了另一台服务器的时候session会丢失。

- **Token**

    在Web领域基于Token的身份验证随处可见。在大多数使用Web API的互联网公司中，tokens 是多用户下处理认证的最佳方式。

    以下几点特性会让你在程序中使用基于Token的身份验证

    1. 无状态、可扩展
    2. 支持移动设备
    3. 跨程序调用
    4. 安全

## 10. Cookie 相关首部字段

