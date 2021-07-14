import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBox }  from '../src/components/ProfileRelations';
import Head from 'next/head';
import ProfileSidebar from '../src/components/ProfileSidebar';
import React from 'react';

export default function Home() {
  const user = 'guimontme';
  const [communities, setCommunities] = React.useState([{
    id: '12324120992838',
    title: 'Alura',
    image: 'https://picsum.photos/200/300?random=1',
    url: 'alura'
  }]);

  const [followers, setFollowers] = React.useState([]);
  const fetchFollowers = () => {
    fetch(`https://api.github.com/users/${user}/followers`)
      .then(response => response.json())
      .then(data => {
        setFollowers(data);
      }) 
      .catch((err) => {
        console.error(err);
      });
  };
  React.useEffect(fetchFollowers, [])

  const [userObj, setUser] = React.useState({});
  const fetchUser = () => {
    fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then(data => {
      setUser(data);
    }) 
    .catch((err) => {
      console.error(err);
    });
};
  React.useEffect(fetchUser, []);


  const communityFriends = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'guimontme'
  ]
  return (
    <>
      <Head>
        <title>Alurakut - { userObj.name }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div style={{ gridArea: 'profileArea' }} className="profileArea">
          <ProfileSidebar githubUser={user} />
        </div>
        
        <div style={{ gridArea: 'welcomeArea' }} className="welcomeArea">
          <Box>
            <h1 className="title">Bem-vindo(a), { userObj.name }</h1>
            <OrkutNostalgicIconSet fans={1000} sexy={3} />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={ function handleCriarComunidade(e) {
                e.preventDefault();
                const dadosForm = new FormData(e.target);

                const title = dadosForm.get('title');
                const url = title.toLowerCase().replaceAll(' ', '-');
                const id = new Date().getTime();

                const community = {
                  id: id,
                  title: dadosForm.get('title'),
                  image: `https://picsum.photos/200/300?random=${dadosForm.get('image')}`, // Provisório
                  url: `/community/${url+'-'+id}`
                }
                const updatedCommunities = [...communities, community];
                setCommunities(updatedCommunities);
            }}>
              <input 
                type="text"
                placeholder="Qual vai ser o nome da sua comunidade?"
                aria-label="Qual vai ser o nome da sua comunidade?"
                name="title"
               />
              <input 
                type="text"
                placeholder="Coloque uma URL para usarmos de capa"
                aria-label="Coloque uma URL para usarmos de capa"
                name="image"
               />
               <button type="submit">Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div style={{ gridArea: 'profileRelationsArea' }} className="welcomeArea">
          <ProfileRelationsBox title="Seguidores" type="followers" max="6" items={followers} />
          <ProfileRelationsBox type="communities" title="Comunidades" max="6" items={communities} />
          <ProfileRelationsBox type="friends" title="Pessoas da comunidade" max="6" items={communityFriends} />
        </div>
      </MainGrid>
    </>
  )
}
