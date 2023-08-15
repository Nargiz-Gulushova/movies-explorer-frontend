import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__wrapper">
        <p className="footer__copyright">Nargiz Gulushova © 2023</p>
        <nav className="footer__links">
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="footer__link link-hover"
                    to="https://practicum.yandex.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </Link>
            </li>
            <li className="footer__item">
              <Link className="footer__link link-hover"
                    to="https://github.com/Nargiz-Gulushova"
                    target="_blank"
                    rel="noopener noreferrer"
              >
                Github
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
