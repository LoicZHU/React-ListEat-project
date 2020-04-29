import React from 'react';
import './teammember.scss';


const TeamMember = ({name, linkedinURL, role, avatar, tech}) => {
  return (
      <div className="team-member">
        <img id="avatar" style={{backgroundImage: `url(${avatar})`}} />
        <img id="techno-logo" src={tech} />
        <h2>{name} <a href={linkedinURL} ><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></h2> 
        <span>{role}</span>
      </div>
  )
};

export default TeamMember;
