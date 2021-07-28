import nookies from "nookies";
import jwt from 'jsonwebtoken';



export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const token = cookies.USER_TOKEN;
    
    // verify is user right
  
    if(!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  
    const { githubUser } = jwt.decode(token);   
          
    return {
      props: {
        githubUser
      }, // will be passed to the page component as props
    }
  }