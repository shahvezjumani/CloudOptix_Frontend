import { useEffect, useRef } from 'react'

const ParticleField = ({ count = 60, color = '#6c63ff' }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let W = (canvas.width = window.innerWidth)
        let H = (canvas.height = window.innerHeight)

        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.8 + 0.4,
            alpha: Math.random() * 0.5 + 0.15,
        }))

        const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return `${r},${g},${b}`
        }
        const rgb = hexToRgb(color)

        const draw = () => {
            ctx.clearRect(0, 0, W, H)

            // Draw connection lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 130) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(${rgb},${0.12 * (1 - dist / 130)})`
                        ctx.lineWidth = 0.6
                        ctx.stroke()
                    }
                }
            }

            // Draw particles
            particles.forEach((p) => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${rgb},${p.alpha})`
                ctx.fill()

                p.x += p.vx
                p.y += p.vy
                if (p.x < 0 || p.x > W) p.vx *= -1
                if (p.y < 0 || p.y > H) p.vy *= -1
            })

            animId = requestAnimationFrame(draw)
        }

        draw()

        const onResize = () => {
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }
        window.addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', onResize)
        }
    }, [count, color])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0.7 }}
        />
    )
}

export default ParticleField
