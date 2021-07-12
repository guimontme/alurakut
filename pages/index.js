import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper }  from '../src/components/ProfileRelations';
import Head from 'next/head';

function ProfileSidebar(props) {
  return (
    <Box>
    <img src={`https://github.com/${props.githubUser}.png`} />
  </Box>
  )
}

export default function Home() {
  const user = 'guimontme';
  const userName = 'GuiMont'
  const communityFriends = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  return (
    <>
    <Head>
      <title>Alurakut - { userName }</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <AlurakutMenu />
      <MainGrid>
        <div style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar className="profileArea" githubUser={user} />
        </div>
        
        <div tyle={{ gridArea: 'welcomeArea' }}>
        <Box>
          Bem-vindo(a) {userName}
          <OrkutNostalgicIconSet fans={1000} sexy={3} />
        </Box>
        </div>

        <div tyle={{ gridArea: 'relationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({communityFriends.length})
            </h2>
            <ul>
            {communityFriends.map((friend) => {
                return (
                  <li>
                    <a href={`/users/${friend}`} key={friend}>
                      <img src={`https://github.com/${friend}.png`} />
                      <span>{friend}</span>
                    </a>
                  </li>
                )
              })
            }
             </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
