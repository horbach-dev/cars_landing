import React from 'react'
import style from "./style.module.scss";
import CardItem from "./CardItem";

const AdminTable = ({ dataUnaccepted, dataAccepted, data, setData }) => {

  if (!data.length) return <div className={style.empty}>Пока нет машинок...</div>

  return (
    <>
      <h4>Поток не подтвержденных (в реальном времени)</h4>
      <div className={style.cards}>
        {dataUnaccepted.map(item => (
          <CardItem
            key={item._id}
            item={item}
            setData={setData}
          />
        ))}
      </div>
      {dataAccepted.length ? (
        <>
          <h4>Подтвердженные</h4>
          <div className={style.cards}>
            {dataAccepted.map(item => (
              <CardItem
                key={item._id}
                item={item}
                setData={setData}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

export default AdminTable
