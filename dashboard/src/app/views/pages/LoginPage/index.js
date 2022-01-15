import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// path of folder
// import Input from '../../components/Input'
// import Button from '../../components/Button'
import styles from './LoginPage.module.scss'
import {getItem, setItem} from 'app/localStorage/localStorage'
import {useCancelToken} from 'app/common/hooks/useClearToken'
import {keysLocal} from 'app/localStorage/keys'
import authAPI from 'app/api/auth'
import {setUserInfo} from 'app/redux/action/action.user'
import Input from 'app/views/components/Input'
import Button from 'app/views/components/Button'

function LoginPage() {
  const [formData, setFormData] = useState({userName: '', password: ''})
  const [isError, setIsError] = useState(false)
  const {newCancelToken} = useCancelToken()

  const dispatch = useDispatch() //dispatch data to redux
  const naviga = useNavigate() // navigation
  useEffect(() => {
    const token = getItem(keysLocal.token) // token
    Boolean(token) && naviga('/home')
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await authAPI.login(formData, newCancelToken()) // call api get data user
      setIsError(false) // delete mess error
      pushToken(userData) //push token to local storage
      dispatch(setUserInfo(userData)) // set user infor to redux
      naviga('/home', {replace: true}) // navigation to home page
    } catch (e) {
      console.log(e)
      setIsError(true) // notification error display
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.mainForm}>
        <div className={styles.form}>
          <h2 className={styles.title}>Đăng nhập hệ thống</h2>
          <form onSubmit={handleSubmit}>
            <Input
              className={styles.input}
              label={'Email'}
              name='userName'
              onChange={handleChange}
              value={formData.userName}
            />
            <Input
              className={styles.input}
              label={'Password'}
              type='password'
              name='password'
              onChange={handleChange}
              value={formData.password}
            />
            {isError && <span>Tên đăng nhập hoặc mật khẩu sai</span>}
            <div className={styles.groupBtn}>
              <Button text='Đăng nhập' maxWidth primary rounded />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

const pushToken = (userData) => {
  if (localStorage) {
    // push token to local
    const tokenData = userData[0].data.token
    setItem(keysLocal.token, tokenData)
  } else {
    console.log('Không có local storage')
  }
}

export default LoginPage
