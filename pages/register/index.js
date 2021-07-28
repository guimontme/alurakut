import React from 'react';
import Head from 'next/head';
import { Link } from '../../src/lib/AluraCommons';

export default function RegisterPage() {
    return (
    <>
        <Head>
            <title>Alurakut - Register</title>
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
                    }}
                >
                    <p className="pForm">
                        Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                    </p>
                    <input  
                    placeholder="Usuário"
                    />
                    <input 
                        type="password"
                        placeholder="Senha" 
                    />
                    <button type="submit">Login</button>
                </form>

                <footer className="box">
                    <p>Já é membro?<br />
                    <Link href="/login">
                        <strong>
                        ENTRAR JÁ
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