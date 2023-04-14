import LoginCard from '../loginCard/loginCard'
import Link from 'next/link'
import styles from '../styles/login.module.css'
import Input from '../input/input'
import Styles from '../styles/link.module.css'
import Button from '../button/button'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
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
      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      if (response.status !== 200) throw new Error(json)

      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Entre em sua conta">
        <form className={styles.form} onSubmit={handleForm}>
          <Input
            type="email"
            placeholder="seu e-mail"
            value={formData.email}
            required
            onChange={e => {
              handleFormEdit(e, 'email')
            }}
          />
          <Input
            type="password"
            placeholder="sua senha"
            value={formData.password}
            required
            onChange={e => {
              handleFormEdit(e, 'password')
            }}
          />
          <Button>Entrar </Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link className={Styles.destaque} href="/cadastro">
            Ainda não possui conta?
          </Link>
        </form>
      </LoginCard>
    </div>
  )
}
