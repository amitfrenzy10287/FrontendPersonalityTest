import React from 'react';

import PersonalityTestLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={PersonalityTestLogo} alt="PersonalityTestLogo" />
    </div>
);

export default logo;