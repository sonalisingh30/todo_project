import React, { useEffect, useState } from 'react'
import './style.css'

// get the local storage data
const getLocalData = () => {
  let list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState('');
  const [toggleButton, setToggleButton] = useState(false);

// add the items function
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } 
    else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      )
      setIsEditItem(null);
      setInputData([]);
      setToggleButton(false);
    }
     else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewInputData]);
      setInputData('');
    }
  };
  // edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setIsEditItem(index);
    setInputData(item_todo_edited.name);
    setToggleButton(!toggleButton);
  };


  // delete the items
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };


  // adding local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items));
  }, [items]);
  return (

    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./image/todolist.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className='addItems'>
            <input type="text" placeholder='✍ Add Items' className='form-control' value={inputData}
              onChange={(e) => setInputData(e.target.value)} />
            {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> :
              <i className="fa fa-plus add-btn" onClick={addItem}></i>}
            
          </div>
          { /* show our items */}
          <div className='showItems'>
            {
              items.map((CurElem, index) => (
                <div className='eachItem' key={CurElem.id}>
                  <h3>{CurElem.name}</h3>
                  <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={() => editItem(CurElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(CurElem.id)}></i>
                  </div>
                </div>
              ))
            }


          </div>
          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text='Remove Item' onClick={removeAll}>
              <span>CHECK LIST</span></button>

          </div>
        </div>

      </div>
    </>
  )
}

export default Todo
