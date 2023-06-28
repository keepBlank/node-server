## node实现静态服务器

### 1.项目地址

https://github.com/keepBlank/node-snippet/tree/main/node-server

### 2. 功能

#### A: 只要访问的路径/文件存在就都可以在浏览器中访问，使用`url.parse`处理查询参数

![](https://s2.loli.net/2023/06/26/6amCIrgktzPD8wR.png)
![](https://s2.loli.net/2023/06/26/85QGEc4gwiVv6YD.png)
![](https://s2.loli.net/2023/06/25/XGEmBjvTfyr51bQ.png)

#### B: 如果访问的路径/文件不存在就展示404页面

![](https://s2.loli.net/2023/06/27/ejvyVuK3aD9EW6T.png)

#### C: 如果访问的是纯目录的路径，就返回403

![](https://s2.loli.net/2023/06/26/ckJxMXndA5KC79m.png)

#### D: 对method进行过滤，阻止用户发送post请求，返回405

![](https://s2.loli.net/2023/06/26/b64CqaAjK8sv2cB.png)

#### E: 使用`Cache-Concol`添加缓存选项，减少第二次请求相同路径的时间

![](https://s2.loli.net/2023/06/26/Ji2e5TMzKwAP6Uc.png)



