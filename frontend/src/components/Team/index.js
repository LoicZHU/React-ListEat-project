import React from 'react';
import './team.scss';

import TeamMember from './TeamMember';
import AvatarSylvain from 'src/assets/img/avatars/sylvain.jpg';
import AvatarDamien from 'src/assets/img/avatars/damien.png';
import AvatarLoic from 'src/assets/img/avatars/loic.jpg';
import AvatarLiza from 'src/assets/img/avatars/liza.jpg';
import LogoSymfony from 'src/assets/img/tech-logos/symfony.png';
import LogoReact from 'src/assets/img/tech-logos/react.png';

const Team = () => {
  return (
    <main>
      <h1>L'équipe derrière ListEat</h1>
      <div id="hi-there">  
          <span><strong>Développeurs web formés chez O'clock</strong>, école de formation 100% à distance, nous avons suivi un parcours intensif de 5 mois. Nous sommes spécialisés en React.js pour la partie front et Symfony pour la partie back.</span>
          <span><strong>Cette application web est le projet de fin de formation</strong> : nous avions un mois pour rédiger notre cahier des charges, cadrer notre projet, le développer et le mettre en ligne. Tout cela en partant de 0.</span>
        </div>
      <div id="team-container">
        <TeamMember name="Liza Ta" role="Scrum Master" linkedinURL="https://www.linkedin.com/in/liza-t-xls/" avatar={AvatarLiza} tech={LogoSymfony}/>
        <TeamMember name="Damien Hugueny" role="Lead dev back" linkedinURL="https://www.linkedin.com/in/damien-hugueny-717376194" avatar={AvatarDamien} tech={LogoSymfony}/>
        <TeamMember name="Loïc Zhu" role="Lead dev front" linkedinURL="https://fr.linkedin.com/in/loiczhu" avatar={AvatarLoic} tech={LogoReact}/>
        <TeamMember name="Sylvain Payet" role="Product Owner, Git Master" linkedinURL="https://www.linkedin.com/in/sylvainpayet" avatar={AvatarSylvain} tech={LogoReact}/>
      </div>
    </main>
  )
};

export default Team;
