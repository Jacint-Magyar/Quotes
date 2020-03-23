import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Buttons from 'components/Buttons';
import { IconAdd, IconRemove } from 'components/Icons';

const List = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const history = useHistory();

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
    const list = {
      title,
      items: Object.values(items)
    }

    axios.post('http://localhost:5000/lists/new', { ...list })
      .then(res => console.log(res.data))
      .then(err => console.log(err));

    history.push({ pathname: '/library', state: { updated: true } });
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
          <AddItem onClick={addItem}>
            <IconAdd />
            Add item
          </AddItem>
        </ListItems>
      </Wrapper>
      <Buttons cancelPath='/' onSave={saveList} />
    </>
  );
};

export default List;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  color: #404040;
  backdrop-filter: blur(4px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;

  input[name="title"] {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
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
    margin-right: 16px;
    cursor: pointer;
    opacity: 0;

    &:hover {
      fill: #333333;
    }
  }
`;
const AddItem = styled.div`
  font-size: 16px;
  line-height: 47px;
  font-weight: 600;
  padding: 0 32px;
  margin-top: -1px;
  color: #595959;
  cursor: pointer;
  border-top: 1px solid rgba(255, 255, 255, 0.5);

  &:hover {
    color: #262626;

    svg {
      fill: #262626;
    }
  }

  svg {
    width: 16px;
    margin-right: 8px;
    position: relative;
    top: 1px;
  }
`;