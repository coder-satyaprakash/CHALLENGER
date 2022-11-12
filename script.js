let i = 0
setTimeout(() => {
    setInterval(change = () => {
        i++
        i >= 100 ? i = 100 : i++
        number.innerHTML = i + "%"
        circle.style.strokeDashoffset = `${450 / 100 * i}`
    }, 50)
}, 800)
setTimeout(() => {
    front.style.transform = "scale(0)"
    back.style.transform = "scale(1)"
    back.style.animation = "blur 1.5s ease-in-out"
}, 4100)
setTimeout(() => intro.style.transform = "scale(0)", 7500)
onclick = () => {
    r = Math.floor(Math.random() * 255),g = Math.floor(Math.random() * 255),b= Math.floor(Math.random() * 255),a = Math.floor(Math.random() * 9)
    touch.style.background = `rgba(${r}, ${g}, ${b}, ${a})`
    touch.style.left = event.x-(touch.offsetHeight/2)+"px"
    touch.style.top = event.y-(touch.offsetWidth/2)+"px"
    touch.style.display = "block"
    setTimeout(() => touch.style.display = "none", 500)
}
let SwipeDetector = (function(){
    let touchStart = null
    let lastTouch = null
    let timeout = 500
    let threshold = 375 / 3
    let eventHandlers = [] 
    let lastTime = NaN
    let disabled = false    
    class vec2D{
        constructor(x,y){
            this.x = x 
            this.y = y
        }        
        mag(){
            return Math.sqrt(this.x**2+this.y**2)
        }
    }
    function vec2DSubtract(a,b){
        return (new vec2D(a.x-b.x,a.y-b.y))
    }    
    function handleTouchStart(event){
        touchStart = new vec2D(
            event.touches[0].clientX,
            event.touches[0].clientY
        )
        lastTime = Date.now()
    }    
    function handleTouchMove(event){
        lastTouch = new vec2D(
            event.touches[0].clientX,
            event.touches[0].clientY
        )
    }    
    function handleTouchEnd(event){
        if(disabled === true) return
        lastTouch = lastTouch || touchStart
        let swipeVector = vec2DSubtract(touchStart,lastTouch)
        let eventName = ""
        let timeDiff = Date.now() - lastTime
        if(swipeVector.mag() < threshold || 
        timeDiff > timeout)
            return
        if(Math.abs(swipeVector.x) > Math.abs(swipeVector.y)){
           eventName = (swipeVector.x < 0)?"swipeRight":"swipeLeft";
        } else {
           eventName = (swipeVector.y < 0)?"swipeDown":"swipeUp"
        }
        
        if(typeof eventHandlers[eventName] === "function"){
            eventHandlers[eventName](
            touchStart,
            lastTouch)
        }
    }    
    window.addEventListener("touchstart", handleTouchStart)
        window.addEventListener("touchmove",handleTouchMove) 
           window.addEventListener("touchend",handleTouchEnd)
    return {
        addEventListener : function(event,handler){
            eventHandlers[event] = handler
        },
        setSwipeThreshold : function(value){
            threshold = (value>0)?value:50
        },
        setSwipeTimeout : function(value){
            timeout = (value>0)?value:500
        },
        disable : function(){
            disabled = true
        },
        enable : function(){
            disabled = false
        }
    }
})()
SwipeDetector.addEventListener(
    "swipeRight",
    () => {
        side.style.left = "0"
        app.style.transform = "translate3d(60px,0,0)"
    }
)
SwipeDetector.addEventListener(
    "swipeLeft",
    () => {
        side.style.left = "-62px"
        app.style.transform = "translate3d(0,0,0)"
    }
)
const closeSide = () => {
    side.style.left = "-62px"
    app.style.transform = "translate3d(0,0,0)"
}
ToHome.onclick = () => {
    closeSide()
    home.style.display = "flex"
    me.style.display = "none"
    settings.style.display = "none"
}
ToMe.onclick = () => {
    closeSide()
    home.style.display = "none"
    me.style.display = "flex"
    settings.style.display = "none"
}
ToSet.onclick = () => {
    closeSide()
    home.style.display = "none"
    me.style.display = "none"
    settings.style.display = "flex"
}
modes.onclick = () => {
    if(modes.classList.contains("bx-sun")){
        modes.classList.remove("bx-sun")
        modes.classList.add("bx-moon")
        side.style.background = "#f4f4f4"
        home.style.background = "#fff"
        me.style.background = "#fff"
        settings.style.background = "#fff"
        document.querySelector("#theme").content = "#f4f4f4"
    } else if(modes.classList.contains("bx-moon")){
        modes.classList.remove("bx-moon")
        modes.classList.add("bx-sun")
        side.style.background = "#323232"
        home.style.background = "#151515"
        me.style.background = "#151515"
        settings.style.background = "#151515"
        document.querySelector("#theme").content = "#151515"
    }
}