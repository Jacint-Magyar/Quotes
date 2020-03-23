import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Buttons from 'components/Buttons';
import { IconRemove } from 'components/Icons';
import { List, Dispatch } from 'types';

interface Props {
  list: List;
  dispatch: Dispatch;
}

const EditList: React.FC<Props> = ({ list, dispatch }) => {
  const history = useHistory();
  const [title, setTitle] = useState(list.title);
  const [items, setItems] = useState(list.items);

  const itemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = +name.slice(5) - 1;

    setItems(currentItems => {
      return [
        ...currentItems.slice(0, index),
        value,
        ...currentItems.slice(index + 1)
      ];
    });
  };

  const removeItem = (index: number) => {
    setItems(currentItems => {
      return currentItems.filter((item, i) => i !== index);
    });
  }

  const addItem = () => {
    if (items[items.length - 1] === '') {
      return;
    } else {
      setItems(currentItems => ([...currentItems, '']));
    }
  }

  const saveList = () => {
    axios.post(`http://localhost:5000/lists/update/${list._id}`, { title, items })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    dispatch({ type: 'UPDATE_LISTS', payload: [] });
    history.push({ pathname: '/library', state: { updated: true, tab: 'lists' } });
  };

  return (
    <>
      <Wrapper>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <ListItems>
          {items.map((item, i) =>
            <ListItem key={i}>
              <input
                type="text"
                name={`item-${i + 1}`}
                value={item}
                onChange={itemHandler}
                autoFocus
              />
              <IconRemove onClick={() => removeItem(i)} />
            </ListItem>
          )}
          <AddItem onClick={addItem}>+ Add item</AddItem>
        </ListItems>
      </Wrapper>
      <Buttons cancelPath='/library' onSave={saveList} />
    </>
  );
};

export default EditList;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  color: #404040;
  backdrop-filter: blur(4px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;

  input[name="title"] {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.85);
    outline: none;
    padding: 20px 32px;
    border: none;
    border-bottom: 1px solid #B6B6B6;
    box-shadow: ${props => props.theme.bsLight};
    border-radius: 8px 8px 0 0;
    color: #404040;
    font-size: 24px;
    overflow: auto;
    font-weight: 600;
    position: relative;

    &::-webkit-input-placeholder {
      font-style: italic;
      font-weight: 600;
    }
  }
`;
const ListItems = styled.div`
  height: 376px;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.7);

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;

  &:hover svg {
    opacity: 1;
  }

  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.5);
  }
  input {
    flex: 1;
    padding: 12px 32px;
    outline: none;
    border: none;
    color: #404040;
    font-size: 20px;
    background-color: transparent;
  }
  svg {
    width: 34px;
    height: 34px;
    padding: 8px;
    cursor: pointer;
    opacity: 0;

    &:hover {
      fill: #333333;
    }
  }
`;
const AddItem = styled.div`
  font-size: 15px;
  line-height: 47px;
  font-weight: 600;
  padding: 0 32px;
  margin-top: -1px;
  color: #666666;
  cursor: pointer;
  border-top: 1px solid rgba(255, 255, 255, 0.5);

  &:hover {
    color: #333333;
  }
`;