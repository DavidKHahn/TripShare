import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './IndexStyles';
import SimpleModalLauncher from './SimpleModalLauncher/SimpleModalLauncher';

const App = ({ sheet: { classes } }) =>
    <div className={classes.appWrapper}>
        <header>
            
        </header>

        <SimpleModalLauncher buttonLabel="Open image modal">
            <div className={classes.imageModal}>
                <img
                    className={classes.imageInModal}
                    src="https://placeimg.com/800/450/nature"
                    alt="Nature"
                />
            </div>
        </SimpleModalLauncher>
    </div>;

App.propTypes = {
    sheet: PropTypes.object,
    classes: PropTypes.object
};

const StyledApp = injectSheet(styles)(App);

render(<StyledApp />, document.getElementById("root"));
