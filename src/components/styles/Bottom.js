import styled from 'styled-components'

export const Bottom = styled.div`
  flex-grow: 0;
  display: flex;
  justify-content: center;
  color: white;
  z-index: 800;
`

export const BottomLink = styled.div`
  margin: 0 20px;
  padding: 10px 0;
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-shadow: ${props => props.theme.ts};

  & img {
    width: 20px;
    margin-right: 12px;
    color: white;
    filter: drop-shadow(${props => props.theme.ts});
  }
`