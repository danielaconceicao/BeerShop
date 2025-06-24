import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import { Link } from 'react-router-dom';
import style from './login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMenssage] = useState('');
    const [showPassword, setShowpassword] = useState(false);

    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error('L\'accesso deve essere utilizzato all\'interno di un AuthProvider');

    const { login, authError } = authContext;

    const handlesubmitFormLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMenssage('Compilare correttamente tutti i campi');
            return;
        }

        await login(email, password);
    }

    const passwordVisibility = () => {
        setShowpassword(!showPassword);
    }

    return (
        <div className='loginContainer'>
            <h1>Accesso cliente</h1>
            <form onSubmit={handlesubmitFormLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="latuaemail@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={style.position}>
                    <label htmlFor="inputPassword5">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        value={password} onChange={e => setPassword(e.target.value)}
                    />
                    <div className={style.eye} onClick={passwordVisibility}>
                        <i className={`${showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'} eye`}></i>
                    </div>
                </div>
                {(errorMessage || authError) && (
                    <div style={{ color: 'red' }}>
                        {errorMessage || authError}
                    </div>
                )}
                <button type="submit">enter</button>
            </form>
            <div className={style.loginActions}>
                <Link to={'/registration'} style={{ textDecoration: 'none', color: '#BF3706' }}><p>Non hai un Account? Registrati</p></Link>
                <p>Password dimenticata?</p>
            </div>
        </div>
    )
}
