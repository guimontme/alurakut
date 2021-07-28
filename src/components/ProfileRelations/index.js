import styled from 'styled-components';
import Box from '../Box';
import { Link } from '../../lib/AluraCommons';

export function ProfileRelationsBox ( { type, title, items, max } ) {

  let newItems = [];
  if (type === 'friends') {
  newItems = items.map((item, index) =>{
      const obj = {
        id: index,
        title: item,
        image: `https://github.com/${item}.png`,
        url: `/users/${item}`
      };
      return obj; 
    });
  } 
  else if (type === 'followers') {
    newItems = items.map((item) =>{
        const obj = {
          id: item.id,
          title: item.login,
          image: `https://github.com/${item.login}.png`,
          url: `/users/${item.login}`
        };
        return obj; 
      });
  } 
  else if (type === 'communities') {
    newItems = items.map((item) =>{
        const obj = {
          id: item.id,
          title: item.title,
          image: item.imageUrl,
          url: `/communities/${item.id}`
        };
        return obj; 
      });
  } 
  else {
    newItems = items;
  }

    
  return (
    <ProfileRelationsBox.Wrapper>
        <h2 className="smallTitle">
          {title} <span className="numberBox">({items.length})</span>
        </h2>
        <ul>
          {newItems.map((item, index) => {
              if(index < max) {
                return (
                  <li key={item.id}>
                    <Link href={item.url} >
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              }
            })
          }
        </ul>
        <hr />
        <Link href={type} className="boxLink">Ver todas</Link>
    </ProfileRelationsBox.Wrapper>
  )
}

ProfileRelationsBox.Wrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
`;
