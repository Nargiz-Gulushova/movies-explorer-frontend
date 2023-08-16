import Title from '../Title/Title';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="about" className="about-project">
      <Title>О проекте</Title>
      <ul className="about-project__info">
        <li className="about-project__box">
          <h3 className="about-project__box-heading">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__box-caption">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__box">
          <h3 className="about-project__box-heading">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__box-caption">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about-project__spent-time">
        <h4 className="about-project__spent-heading about-project__spent-heading_type_front">1 неделя</h4>
        <h4 className="about-project__spent-heading">4 недели</h4>
        <p className="about-project__spent-caption">Back-end</p>
        <p className="about-project__spent-caption">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
