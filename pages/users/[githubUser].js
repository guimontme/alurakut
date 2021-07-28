import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import UserGrid from '../../src/components/UserGrid';
import Box from '../../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../../src/lib/AluraCommons';
import { ProfileRelationsBox }  from '../../src/components/ProfileRelations';
import ProfileSidebar from '../../src/components/ProfileSidebar';

export default function UserPage() {
  const router = useRouter();
  const { githubUser } = router.query;
  const user = githubUser;

  const [userObj, setUserObj] = React.useState({});
  const fetchUser = () => {
    fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then(data => {
      setUserObj(data);
    }) 
    .catch((err) => {
      console.error(err);
    });
  };
  React.useEffect(fetchUser);

  return (
    <>
      <Head>
        <title>Alurakut - { user } </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AlurakutMenu githubUser={user} />
      <UserGrid>
        <div style={{ gridArea: 'profileArea' }} className="profileArea">
          <ProfileSidebar githubUser={user} />
        </div>
        
        <div style={{ gridArea: 'welcomeArea profileRelationsArea' }} className="welcomeArea">
          <Box>
            <h1 className="title">{ userObj.name ? userObj.name : userObj.login }'s Profile</h1>
            <p className="subTitle">About: { userObj.bio } </p>
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
      </UserGrid>
    </>
  )
}