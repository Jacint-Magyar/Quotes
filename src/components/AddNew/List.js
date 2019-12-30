import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Buttons from './Buttons';

// const list = {
//   title: '',
//   marker: 'number',
//   childmarker: 'arrow',
//   items: [
//     {
//       text: '',
//       child: '',
//       sibling: ''
//     },
//     {
//       text: '',
//       child: '',
//       sibling: ''
//     }
//   ]
// }

const List = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState({});
  const [inputs, addInput] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const setDisabled = (item) => {
    if (item === 1) return false;

    if (!items[`item_${item - 1}`]) {
      return true;
    }
  };

  const itemHandler = ({ target: { name, value } }) => {
    setItems(currentItems => ({
      ...currentItems,
      [name]: value
    }));

    const index = +name.slice(5)

    if (name === `item_${inputs.length}` && inputs.length < index + 2) {
      addInput(currentInputs => (
        [...currentInputs, currentInputs.length + 1]
      ))
    }
  };

  const saveList = () => {
    const list = {
      title,
      items: Object.values(items)
    }
    axios.post('http://localhost:5000/quotes/add/list', { list })
      .then(res => console.log(res.data));
  };

  return (
    <>
      <Wrapper>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
        <ListItems>
          {inputs.map(item =>
            <ListItem key={item}>
              <input
                type="text"
                name={`item_${item}`}
                placeholder={item === 1 ? "List items..." : ""}
                onChange={itemHandler}
                style={{
                  background: items[`item_${item}`] && items[`item_${item}`].length > 0
                    ? "url('/assets/bullet.svg') no-repeat 32px center"
                    : 'none'
                }}
                disabled={setDisabled(item)}
              />
            </ListItem>
          )}
        </ListItems>
      </Wrapper>
      <Buttons onSave={saveList} />
    </>
  );
};

export default List;;

const Wrapper = styled.div`
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 50px;
  color: #404040;
  width: 100%;
  backdrop-filter: blur(4px);

  input[name="title"] {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.85);
    outline: none;
    padding: 20px 32px;
    border: none;
    border-bottom: 2px solid #B6B6B6;
    border-radius: 8px 8px 0 0;
    color: #404040;
    font-size: 24px;
    overflow: auto;

    &::-webkit-input-placeholder {
      font-style: italic;
    }
  }
`;
const ListItems = styled.div`
  height: 376px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ListItem = styled.div`

  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.85);
  }
  &:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.7);
  }
  &:first-child {
    input {
      background: url('/assets/bullet.svg') no-repeat 32px center !important;
    }
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  input {
    width: 100%;
    padding: 12px 24px 12px 52px;
    outline: none;
    border: none;
    color: #404040;
    font-size: 20px;
    background: none;
  }
`;