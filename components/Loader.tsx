'use client'
import { useState, useEffect } from 'react'

const loaderMsgs = ['Preparing', 'Crafting', 'Ready']

export default function Loader() {
  const [pct, setPct] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let timer: NodeJS.Timeout

    const start = () => {
      let current = 0
      interval = setInterval(() => {
        current += 6 + Math.random() * 4
        const val = Math.min(Math.round(current), 100)
        setPct(val)
        const step = Math.floor(val / 33)
        if (step > msgIdx && msgIdx < loaderMsgs.length - 1) {
          setMsgIdx(step)
        }
        if (val >= 100) {
          clearInterval(interval)
          timer = setTimeout(() => setDone(true), 200)
        }
      }, 30)
    }

    start()
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [msgIdx])

  if (done) return null

  return (
    <div id="loader">
      <div className="loader-logo">Cacao &amp; Craft</div>
      <div className="loader-counter">
        <span id="loaderCount">{pct}</span>%
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${pct}%` }}></div>
      </div>
      <div className="loader-text">{loaderMsgs[msgIdx]}</div>
    </div>
  )
}