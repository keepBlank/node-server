import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from 'path';
import * as url from "url";

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public')
let cacheAge = 3600 * 24 *365;

// 监听server的request,如果服务器被人请求了
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url: path, headers} = request
    const {pathname, search} = url.parse(path as string)
    if(method !== 'GET'){
        // 405表明服务器禁止了使用当前HTTP 方法的请求
        response.statusCode = 405;
        response.end();
        return
    }
    // response.setHeader('Content-Type', 'text/html;charset=utf-8')
    let fileName = (pathname as string).substr(1)
    if(fileName === ''){
        fileName = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
        if (error) {
            console.log(error)
            if (error.errno === -4058) {
                // 404表示网页或文件未找到
                response.statusCode = 404
                console.log(p.resolve(publicDir, '404.html'))
                fs.readFile(p.resolve(publicDir, '404.html'), (err, data) => {
                    response.end(data)
                })
            // 访问的的是纯目录路径,403表示服务器端有能力处理该请求，但是拒绝授权访问
            }else if(error.errno === -4068){
                response.statusCode = 403
                response.setHeader('Content-Type', 'text/html;charset=utf-8')
                response.end('无权查看纯目录了路径')
            } else {
                response.statusCode = 500
                response.setHeader('Content-Type', 'text/html;charset=utf-8')
                response.end('服务器繁忙，请稍后再试')
            }
        } else {
            // 添加缓存
            response.setHeader('Cache-Control',`public,max-age=${cacheAge}`)
            // 返回文件内容
            response.end(data)
        }
    })


});

// 监听端口
server.listen(8888);