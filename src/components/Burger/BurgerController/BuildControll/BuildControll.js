import React from 'react';
import classes from './BuildControll.css'

const buildControll = (props)=>{
    return (
       
        <div className = {classes.BuildControl}>
            <div className = {classes.Label}>{props.label}</div>
            <button 
            className = {classes.More}
            onClick = {props.added}
            > More </button>
            <button  
            onClick = {props.removed}
            disabled = {props.disabled}
            className = {classes.Less}> Less </button>
        </div>
    )
}

export default buildControll;