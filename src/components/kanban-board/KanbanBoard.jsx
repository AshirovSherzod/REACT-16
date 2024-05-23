import React, { useRef, useState } from 'react'
import { DATA } from '../../static'


let statuses = ["ready", "working", "stuck", "done"]
const KanbanBoard = () => {

    const [data, setData] = useState(DATA)
    const [status, setStatus] = useState(null)

    const title = useRef()
    const desc = useRef()

    const handleChangeStatus = (id, newStatus) => {
        setData(prev => prev.map(el => (
            el.id === id ? { ...el, status: newStatus } : el
        )));
    };

    const filterByStatus = (status) => {
        return data.filter(el=> el.status === status)?.map(el => (
                <div key={el.id} className="kanban__item">
                    <p>{el.title}</p>
                    <p className='kanban__commit'>
                        Status: {el.status}
                    </p>
                    <div className="kanban__status">
                        <select value={el.status} onChange={(e)=>handleChangeStatus(el.id, e.target.value)}  name="" id="">
                            {statuses?.map((status) => (
                            <option value={status} key={status}>
                                {status}
                            </option>
                            ))}
                        </select>
                        <span>09:04</span>
                    </div>
                </div>
    ))}

    let readyItems = filterByStatus("ready")
    let workingItems = filterByStatus("working")
    let stuckItems = filterByStatus("stuck")
    let doneItems = filterByStatus("done")

    // const handleAddItem = status => {
        
    //     setStatus(true)
    // }

    const handleCreateItem = e => {
        e.preventDefault()
        let id = new Date().getTime()
        let newItems = {
            id,
            title: title.current.value,
            desc: desc.current.value,
            status
        }

        setData(prev => [...prev, newItems])
        
        setStatus(null)
        title.current.value = ""
        desc.current.value = ""
    }

  return (
    <section>
        <div className="kanban">
            <div className='container'>
                <h2 className='kanban__title'>Kanban Board</h2>
                <div className="kanban__header">
                    <button className='kanban__btn'>Add</button>
                </div>
                <form action="" onSubmit={handleCreateItem} className={`form ${status ? "show" : ""}`}>
                    <h3>Create your list</h3>
                    <div className="form__inputs">
                        <input ref={title} type="text" required placeholder='Title name'/>
                        <input ref={desc} type="text"  placeholder='description'/>
                        <button>Create Item</button>
                    </div>
                </form>
                <div className="kanban__wrapper">
                    <div className="kanban__box ready">
                        <div className="kanban__heading">
                            <p>Ready to start / {readyItems.length}</p>
                        </div>
                        <div className="kanban__block">
                            { readyItems.length === 0 ? <p>Empty item</p> : readyItems } 
                        </div>
                        <button onClick={()=> setStatus("ready")} className='kanban__add_btn'>Add item</button>
                    </div>
                    <div className="kanban__box working">
                        <div className="kanban__heading">
                            <p>Working to start / {workingItems.length}</p>
                        </div>
                        <div className="kanban__block ">
                            { workingItems.length === 0 ? <p>Empty item</p> : workingItems }
                        </div>
                        <button onClick={()=> setStatus("working")} className='kanban__add_btn'>Add item</button>
                    </div>
                    <div className="kanban__box stuck">
                        <div className="kanban__heading">
                            <p>Stuck to start / {stuckItems.length}</p>
                        </div>
                        <div className="kanban__block">
                            { stuckItems.length === 0 ? <p>Empty item</p> : stuckItems }
                        </div>
                        <button onClick={()=> setStatus("stuck")} className='kanban__add_btn'>Add item</button>
                    </div>
                    <div className="kanban__box done">
                        <div className="kanban__heading">
                            <p>Done to start / {doneItems.length}</p>
                        </div>
                        <div className="kanban__block">
                            { doneItems.length === 0 ? <p>Empty item</p> : doneItems }
                        </div>
                        <button onClick={()=> setStatus("done")} className='kanban__add_btn'>Add item</button>
                    </div>
                  
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default KanbanBoard