import { Link } from 'react-router-dom';
import Title from '../Title/Title';
import './AboutMe.css';
import me from '../../../images/me.png';

const AboutMe = () => {
  return (
    <section id="me" className="me">
      <Title>Студент</Title>
      <article className="me__article">
        <div className="me__wrapper">
          <h3 className="me__name">Виталий</h3>
          <p className="me__job">Фронтенд-разработчик, 30 лет</p>
          <p className="me__info">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link className="me__link link-hover"
                to="https://github.com/Nargiz-Gulushova"
                target="_blank"
                rel="noopener noreferrer"
          >
            Github
          </Link>
        </div>
        <img src={me}
             alt="Фотография студента"
             className="me__photo"
        />
      </article>
    </section>
  );
};

export default AboutMe;
