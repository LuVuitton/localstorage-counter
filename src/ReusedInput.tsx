import React, {ChangeEvent} from 'react';
import s from './ReusedInput.module.css'

type PropsType ={
    value: number
    title:string,
    callback:(inputValue:string)=>void
}
export const ReusedInput = (props:PropsType) => {

    const onchangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        props.callback(e.currentTarget.value)
    }


    return (
        <div className={s.wrapper}>
            { props.title}
                <input
                    value={props.value}
                    type='number'
                    onChange={onchangeHandler}></input>
        </div>
    );
}

