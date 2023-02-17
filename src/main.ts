import './style.css'
class Blackboard {
  constructor(public el = document.querySelector<HTMLCanvasElement>('#canvas')!, private app = el.getContext('2d')!,public height: number = el.height, public width: number = el.width, private btns: HTMLDivElement = document.createElement('div'), private bgColor = '#000', private lineColor = '#fff') {
    this.initCanvas()
    this.bindEvent()
    this.clear()
    this.setLineColor()
    this.erase()
    this.short()
  }
  private bindEvent() {
    const callback = this.drawLine.bind(this)
    this.el.addEventListener('mousedown', ()=>{
      // 开始画线
      this.app.beginPath()
      // 颜色
      this.app.strokeStyle = this.lineColor
      // 监听移动事件
      this.el.addEventListener('mousemove', callback)   
    })
    // 监听移动结束事件
    document.addEventListener('mouseup', ()=>{
      // 移除移动事件
      this.el.removeEventListener('mousemove', callback)
    })
  }
  private drawLine(event:MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY)
    this.app.stroke()
  }
  private initCanvas() {
    this.app.fillStyle = this.bgColor
    this.app.fillRect(0, 0, this.width, this.height)
    this.btns.classList.add('btns')
    this.el.insertAdjacentElement('afterend', this.btns)
  }
  private clear() {
    // 生成DOM
    const el = document.createElement('div')
    el.innerHTML = '清屏'
    el.classList.add('btn')
    this.btns.insertAdjacentElement('afterbegin', el)

    // 清屏事件
    el.addEventListener('click', ()=>{
      this.app.fillStyle = this.bgColor
      this.app.fillRect(0, 0, this.width, this.height)
    })
  }
  private setLineColor() {
    const colors = ['#1abc9c', '#3498db', '#9b59b6', '#ff9ff3', '#ff6b6b']
    const container = document.createElement('div')
    container.classList.add('color-container')
    colors.forEach(color => {
      const div = document.createElement('div')
      div.style.cssText = `width:30px;height:30px;background-color:${color};border-radius:50%;margin-left:10px;cursor:pointer;`
      container.insertAdjacentElement('afterbegin', div)
      div.addEventListener('click', ()=>{
        this.lineColor = color
        this.app.lineWidth = 1
      })
    })
    this.btns.insertAdjacentElement('beforeend', container)
  }
  private erase() {
    // 生成DOM
    const el = document.createElement('div')
    el.innerHTML = '橡皮擦'
    el.classList.add('btn')
    this.btns.insertAdjacentElement('afterbegin', el)

    // 橡皮擦事件：线条的颜色等于画布的颜色，之后的鼠标拖动事件不变
    el.addEventListener('click', ()=>{
      this.lineColor = this.bgColor
      this.app.lineWidth = 10
    })
  }
  private short() {
    // 生成DOM
    const el = document.createElement('div')
    el.innerHTML = '截图'
    el.classList.add('btn')
    this.btns.insertAdjacentElement('afterbegin', el)
    const img = document.createElement('img')
    // 截图
    el.addEventListener('click', ()=>{
      img.src = this.el.toDataURL('image/jpeg')
      // img.classList.add('imgShort')
      // this.btns.insertAdjacentElement('afterend', img)
      let alink = document.createElement("a");
      alink.href = img.src
      alink.download = `blackboard.jpeg`
      alink.click()
    })
  }
}
new Blackboard()
// 进页面就清屏
// instance.clear()