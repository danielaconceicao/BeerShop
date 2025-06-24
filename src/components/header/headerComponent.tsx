import { Link } from "react-router-dom";
import style from './header.module.css';
import headerImage from '../../assets/beers-header.jpeg';
import { Dropdown, Nav } from 'react-bootstrap'

export default function Layout() {
    return (
        <>
            <section className={style.freeMessage}>Spedizione gratuita a partire da <strong style={{ color: '#F2BF27' }}>60€ di spesa</strong></section>
            <header>

                <Nav className="navbar navbar-expand-lg d-none">
                    <Dropdown>
                        <Dropdown.Toggle id='navbarDropdwn'>
                            <i className="bi bi-list"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item><i className="bi bi-person-fill"><span style={{ fontSize: '.8rem' }}>Accedi o Registrati</span></i></Dropdown.Item>
                            <Dropdown.Item><i className="bi bi-box2-heart-fill"><span style={{ fontSize: '.8rem' }}>WishList</span></i></Dropdown.Item>
                            <Dropdown.Item><i className="bi bi-cart-check-fill"></i><span style={{ fontSize: '.8rem' }}>Carrelo</span></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>

                <div className={style.headerTitle}>
                    <Link to={'/'}><img src={headerImage} alt="" /></Link>
                    <h1>BeerShop</h1>
                </div>

                <div className={style.search}>
                    <input type="text" placeholder="SEARCH BEER" />
                    <select className={style.formSelect} aria-label="Default select example">
                        <option value='categories'>Tutte le categorie</option>
                        <option value="abv">abv</option>
                        <option value="size">size</option>
                        <option value="style">style</option>
                        <option value="country">country</option>
                    </select>
                    <span><i className="bi bi-search"></i></span>
                </div>
                <div className={style.headerLink}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: '#BF3706' }}>
                        <span>
                            <i className="bi bi-person-fill"><span style={{ fontSize: '.8rem' }}>Accedi o Registrati</span></i>
                        </span>
                    </Link>

                    <span><i className="bi bi-box2-heart-fill"></i></span>
                    <span><i className="bi bi-cart-check-fill"></i></span>
                </div>
            </header>
        </>
    )
}