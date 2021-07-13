import { AlurakutProfileSidebarMenuDefault } from '../../lib/AluraCommons';
import Box from '../Box';
export default function ProfileSidebar({ githubUser }) {
    return (
      <Box as="aside">
        <img src={`https://github.com/${githubUser}.png`} />
        <hr />
        <p>
            <a className="boxLink" href={`https://github.com/${githubUser}`} target="_blank">@{githubUser}</a>
        </p>
        <hr />
        <AlurakutProfileSidebarMenuDefault githubUser={ githubUser } />
      </Box>
    )
  }
