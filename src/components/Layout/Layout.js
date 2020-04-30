import React from 'react';
import Aux from '../../hoc/Aux';
import clasess from './Layout.css';

const layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className = {clasess.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;