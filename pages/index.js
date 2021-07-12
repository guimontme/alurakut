import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';

export default function Home() {
  return (
    <MainGrid>
      <div style={{ gridArea: 'profileArea' }}>
      <Box>
        <img src="https://github.com/guimontme.png" />
      </Box>
      </div>
      
      <div tyle={{ gridArea: 'welcomeArea' }}>
      <Box>
        Bem-vindo
      </Box>
      </div>

      <div tyle={{ gridArea: 'relationsArea' }}>
      <Box>
        Pessoas importantes
      </Box>
      <Box>
        Comunidades
      </Box>
      </div>
    </MainGrid>
  )
}
