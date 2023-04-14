import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { verifica } from '../../services/user'
export default function Home() {
  return <div>Pagina Segura - Perfil Do Usuário </div>
}
export const getServerSiteProps = async (req, res) => {
  try {
    const token = getCookie('authorization', { req, res })
    console.log(token)

    return {
      props: {}
    }
  } catch (err) {
    return {
      props: {}
    }
  }
}
