import styles from '../styles/login.module.css'
import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Styles from '../styles/link.module.css'
import Input from '../input/input'
import Button from '../button/button'
import LoginCard from '../loginCard/loginCard'

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const router = useRouter()

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value
    })
  }

  const handleForm = async event => {
    try {
      event.preventDefault()
      const response = await fetch(`/api/user/cadastro`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      if (response.status !== 201) throw new Error(json)

      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div className={styles.background}>
      <LoginCard title="crie sua conta">
        <form onSubmit={handleForm} className={styles.form}>
          <Input
            type="text"
            placeholder="seu nome"
            require
            value={formData.name}
            onChange={e => {
              handleFormEdit(e, 'name')
            }}
          />
          <Input
            type="email"
            placeholder="seu e-mail"
            require
            value={formData.email}
            onChange={e => {
              handleFormEdit(e, 'email')
            }}
          />
          <Input
            type="password"
            placeholder="sua senha"
            require
            value={formData.password}
            onChange={e => {
              handleFormEdit(e, 'password')
            }}
          />
          <Button>Cadastrar</Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link className={Styles.destaque} href="/login">
            Já possui uma conta ?{' '}
          </Link>
        </form>
      </LoginCard>
    </div>
  )
}
