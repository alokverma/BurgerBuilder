import React from 'react';
import Aux from '../../hoc/Auxilary';
import clasess from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'

const layout = (props) => {
    return (
        <Aux>
            <Toolbar/>
            <main className = {clasess.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;