import React, {useState, useEffect} from 'react';
import style from "./style.module.scss";

const colors = [
  '#90e894',
  '#fa5e67',
]

const CardItemDate = ({ date, setLost, isEnd }) => {
  const [seconds, setSeconds] = useState(0)

  const post = new Date(date)
  const postDate = (post.getDate() + 1) + '.' + post.getMonth() + '.' + post.getFullYear();
  const postTime = post.getHours() + ":" + post.getMinutes() + ":" + post.getSeconds();

  useEffect(() => {
    let interval;
    if(date) {
      interval = setInterval(() => {
        const lost = date - new Date().getTime()
        const res = -lost / 1000
        setSeconds(res)
        if (res > 10) {
          setLost(true)
          clearInterval(interval)
        }
      }, 100)
    }
    return () => {
      clearInterval(interval)
    }
  }, [date])

  return (
      <div className={style.date}>
        {isEnd ? (
          <div className={style.dateComplete}>
            <span className={style.dateCalendar}>{postDate}</span>
            <span className={style.dateTime}>{postTime}</span>
          </div>
        ) : (
          <div
            style={{
              width: `${Number(seconds * 10).toFixed()}%`,
              background: (seconds > 6) ? colors[1] : colors[0]
            }}
            className={style.dateLine}
          >
          </div>
        )}
      </div>
  )
}

export default CardItemDate
