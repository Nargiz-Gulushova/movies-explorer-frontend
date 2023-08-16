import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link className="portfolio__link link-hover"
                to="https://github.com/Nargiz-Gulushova/how-to-learn"
                target="_blank"
                rel="noopener noreferrer"
          >
            Статичный сайт
            <span className="portfolio__link-span">↗</span>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link link-hover"
                to="https://github.com/Nargiz-Gulushova/russian-travel"
                target="_blank"
                rel="noopener noreferrer"
          >
            Адаптивный сайт
            <span className="portfolio__link-span">↗</span>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link link-hover"
                to="https://github.com/Nargiz-Gulushova/react-mesto-api-full-gha"
                target="_blank"
                rel="noopener noreferrer"
          >
            Одностраничное приложение
            <span className="portfolio__link-span">↗</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
