import utils, { randomColor, randomIntFromRange, randomRadius } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const gravity = 1
const friction = 0.95
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2,
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
	mouse.x = event.clientX
	mouse.y = event.clientY
})

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
	

	init()
})

addEventListener('click',()=>init())

// Objects
class Ball {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x
		this.y = y
		this.dy = dy
		this.dx = dx
		this.radius = radius
		this.color = color
	}

	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
		c.stroke()
		c.closePath()
	}

	update() {
		if (this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy * friction
		} else {
			this.dy += gravity
		}

		if (this.x + this.radius >= canvas.width|| this.x-this.radius<=0) {
			this.dx = -this.dx
		}
		// if (this.x+this.radius+this.dx>=0){
		// 	this.dx +=this.dx
		// }
		this.x += this.dx
		this.y += this.dy

		this.draw()
	}
}

// Implementation
let ball
let ballArray
function init() {
	ballArray = []
	for (let i = 0; i < 500; i++) {
		const radius = randomRadius(10, 20)
		let x = randomIntFromRange(radius, canvas.width - radius)
		let y = randomIntFromRange(0, canvas.height - radius)
		let dx = randomIntFromRange(-2,2)
		let dy = randomIntFromRange(-2,2)
		ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)))
	}

	ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'green')
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)

	// c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
	// objects.forEach(object => {
	//  object.update()
	// })
	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update()
	}
	// ball.update()
}

init()
animate()
