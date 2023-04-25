import React from 'react';
import './About.css'; // імпорт стилів

function About() {
  return (
    <div className="about-container">
      <h1>Covid19 Stats</h1>
      <p>Цей додаток дозволяє переглядати статистику по Covid19 в світі та окремих країнах.</p>
      <p>На WorldWide сторінці ви можете переглянути загальну статистику заражених, померлих та одужалих у світі.</p>
      <p>На CountryStats сторінці ви можете обрати країну та побачити статистику для неї з можливістю фільтрації за різними критеріями.</p>
    </div>
  );
}

export default About;