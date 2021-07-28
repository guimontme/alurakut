import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Link } from '../../src/lib/AluraCommons';
import nookies from 'nookies';

export default function LoginPage() {

  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');
  const [messageError, setMessageError] = React.useState('');

  return (
    <>
    <Head>
        <title>Alurakut - A maior rede social de devs.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form 
            className="box"
            onSubmit={ (e) => {
              e.preventDefault();
              if(githubUser.length === 0) {
                setMessageError('Preencha o usuário');
              } else {
                 fetch('https://alurakut.vercel.app/api/login', {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/json'  
                     },
                     body: JSON.stringify({ githubUser: githubUser })
                 })
                 .then(async (res) => {
                     const data = await res.json()
                     const token = data.token;
                     nookies.set(null, 'USER_TOKEN', token, {
                         path: '/',
                         maxAge: 86400 * 7 
                     })
                     router.push('/')
                 })
              }
               
            }}
          >
            <p className="pForm">
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input  
              placeholder="Usuário"
              value={githubUser}
              onChange={(e) => {
                setMessageError('');
                setGithubUser(e.target.value)
              }}
             />
             <p className="error">{ messageError }</p>
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>Ainda não é membro? <br />
              <Link href="/register">
                <strong>
                  REGISTRE JÁ
              </strong>
              </Link>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
    </>
  )
} 

