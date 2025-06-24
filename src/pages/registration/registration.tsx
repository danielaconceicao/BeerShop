import style from './registration.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RegistrationContext } from '../../context/registration/registrationContext';

export default function Registration() {
    const context = useContext(RegistrationContext);

    if (!context) throw new Error('L\'accesso deve essere utilizzato all\'interno di un AuthProvider');

    const { name, email, password, setName, setEmail, setPassword, handleFormRegistration, errorMessage, successMessage} = context;

    const navigator = useNavigate();

    return (
        <div className='registrationContainer'>
            <h2>Registrati</h2>
            <form onSubmit={handleFormRegistration}>
                <div>
                    <label htmlFor="">Nome*</label>
                    <input type="text" placeholder='inserisci il tuo nome' required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Email*</label>
                    <input type="email" required placeholder='inserisci la tua email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='position'>
                    <label htmlFor="">Password*</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                </div>
                <button type='submit'>Crea Account</button>

                {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
                {successMessage && <p className={style.successMessage}>{successMessage}</p>}
            </form>
            <button onClick={() => navigator(-1)} className={style.btn}>Torna alla Login</button>
        </div>
    )
}
