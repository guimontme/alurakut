import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBox }  from '../src/components/ProfileRelations';
import Head from 'next/head';
import ProfileSidebar from '../src/components/ProfileSidebar';
import React from 'react';

export default function Home() {
  const user = 'guimontme';

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

  const [followers, setFollowers] = React.useState([]);
  const fetchFollowers = async () => {
      await fetch(`https://api.github.com/users/${user}/followers`)
      .then( async (response) => {
        const data = await response.json();
        setFollowers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  React.useEffect(fetchFollowers, [])

  const [communities, setCommunities] = React.useState([]);
  const fetchCommunities = async () => {
    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'fce62a3ab1103a4030135f092bda5e',
      }, 
      body: JSON.stringify({"query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`})
    };
    await fetch('https://graphql.datocms.com/', options)
      .then(response => response.json())
      .then((dataJson) => {
        const comunidadesFromDato = dataJson.data.allCommunities;
        setCommunities(comunidadesFromDato);
      })
     

  };
  React.useEffect(fetchCommunities, []);


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
            <p className="subTitle"> { userObj.bio } </p>
            <OrkutNostalgicIconSet fans={1000} sexy={3} />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={ function handleCriarComunidade(e) {
                e.preventDefault();
                const dadosForm = new FormData(e.target);
                const title = dadosForm.get('title');
                const image = dadosForm.get('image');
                const condition = (title && (image.includes('http://') || image.includes('https://')));

                if(condition) {
                  const community = {
                    title: dadosForm.get('title'),
                    imageUrl: dadosForm.get('image'), // Provisório
                    creatorSlug: user,
                  }
                  fetch('/api/communities', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(community),
                  })
                  .then(async (response) => {
                    const dados = await response.json();
                    const communityNew = dados.registerCreated;
                    const updatedCommunities = [communityNew, ...communities];
                    setCommunities(updatedCommunities);
                  })
                }
               

            }}>
              <input 
                type="text"
                placeholder="Qual vai ser o nome da sua comunidade?"
                aria-label="Qual vai ser o nome da sua comunidade?"
                name="title"
                required
               />
              <input 
                type="text"
                placeholder="Coloque uma URL para usarmos de capa"
                aria-label="Coloque uma URL para usarmos de capa"
                name="image"
                required
               />
               <button type="submit">Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div style={{ gridArea: 'profileRelationsArea' }} className="welcomeArea">
          <ProfileRelationsBox type="communities" title="Comunidades" max="6" items={communities} />
          <ProfileRelationsBox title="Seguidores" type="followers" max="6" items={followers} />
          <ProfileRelationsBox type="friends" title="Pessoas da comunidade" max="6" items={communityFriends} />
        </div>
      </MainGrid>
    </>
  )
}
