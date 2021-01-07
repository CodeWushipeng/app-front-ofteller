var  confPara = require ('../../mock/conf.para.json')
var waitSentSocketContent = [];

/**
 * websocket 單例
 */

class WebSocketClass {
  constructor() {
    this.instance = null;
    this.ws = new WebSocket('ws://'+ confPara.url +':' + confPara.port);
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocketClass();
    }
    window.WebSocketClass = this.instance
    return this.instance;
  }

  connect(cb) {
    this.ws.onopen = e => {
      this.status = 'open';
      console.log(`连接成功:`+confPara.url+':'+confPara.port, e);
      this.heartCheck();
      //this.getMessage();

      //判断是否有待发送内容
      for(let key in waitSentSocketContent){
        this.ws.send(waitSentSocketContent[key]);
      }
      waitSentSocketContent = {}
      if (cb){
        cb()
      }
    };
  }

  heartCheck() {
    // 心跳机制的时间可以自己与后端约定
    this.pingPong = 'ping'; // ws的心跳机制状态值
    this.pingInterval = setInterval(() => {
      if (this.ws.readyState === 1) {
        // 检查ws为链接状态 才可发送
        this.ws.send('ping'); // 客户端发送ping
      }
    }, 30000);
    this.pongInterval = setInterval(() => {
      if (this.pingPong === 'ping') {
        this.closeHandle('pingPong没有改变为pong'); // 没有返回pong 重启webSocket
      }
      // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
      //console.log('返回pong');
      this.pingPong = 'ping';
    }, 60000);
  }

  closeHandle(e = 'err') {
    // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
    if (this.status !== 'close') {
      console.log(`断开，重连websocket`, e);
      if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
        // 清除定时器
        clearInterval(this.pingInterval);
        clearInterval(this.pongInterval);
      }
      this.connect(); // 重连
    } else {
      console.log(`websocket手动关闭,或者正在连接`);
    }
  }

  /**
   * 接受信息
   */
  getMessage(cb) {
    this.ws.onmessage = e => {
      if (e.data === 'pong') {
        this.pingPong = 'pong'; // 服务器端返回pong,修改pingPong的状态
      } else {
        if (e.data) {
          console.log(e.data);
        }
      }
      if(cb && (e.data != 'pong')){
        cb(e.data)
      }
    };
  }

  /**
   * 断开连接
   */
  close() {
    clearInterval(this.pingInterval);
    clearInterval(this.pongInterval);
    this.status = 'close';
    this.ws.send('close');
    this.ws.close();
    message.info('已断开连接');
    console.log('close');
  }

  /**
   * websockt发送信息
   * @param
   */
  onsentContent(text){
    if(this.ws.readyState == 1){
      this.ws.send(text);
    } else if(this.ws.readyState == 0){
      waitSentSocketContent.push(text)
    } else {
      if (this.pingInterval !== undefined && this.pongInterval !== undefined) {
        // 清除定时器
        clearInterval(this.pingInterval);
        clearInterval(this.pongInterval);
      }
      this.connect(); // 重连
    }
  }
}

// 返回单例
let getWebsocket = (function () {
  return WebSocketClass.getInstance()
})()

export default getWebsocket ;

