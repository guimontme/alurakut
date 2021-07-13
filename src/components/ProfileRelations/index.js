import styled from 'styled-components';
import Box from '../Box';

export function ProfileRelationsBox ( { type, title, elements, max } ) {
  const newElements = elements.map((element, index) =>{
    if (type === 'friends') {
      const obj = {
        id: index,
        title: element,
        image: `https://github.com/${element}.png`,
        url: `/users/${element.title}`
      };
      return obj; 
    } 
    return element;
  });
  return (
    <ProfileRelationsBox.Wrapper>
        <h2 className="smallTitle">
          {title} ({elements.length})
        </h2>
        <ul>
          {newElements.map((element, index) => {
              if(index < max) {
                return (
                  <li key={element.id}>
                    <a href={element.url} >
                      <img src={element.image} />
                      <span>{element.title}</span>
                    </a>
                  </li>
                )
              }
            })
          }
        </ul>
        <hr />
        <a href="/" className="boxLink">Ver todas</a>
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