import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__wrapper">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__time">
          <div className="about-project__group">
            <h3 className="about-project__group-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__group-info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__group">
            <h3 className="about-project__group-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__group-info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__lines">
          <div className="about-project__timeline about-project__timeline_type_green">1 неделя</div>
          <div className="about-project__timeline">4 недели</div>
          <div className="about-project__time-info">Back-end</div>
          <div className="about-project__time-info">Front-end</div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
