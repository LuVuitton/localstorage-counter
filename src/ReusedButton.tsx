import React from 'react';
import s from './ReusedButton.module.css'

type PropsType = {
    title: string,
    callback: () => void,
    disable: boolean
}
export const ReusedButton = (props: PropsType) => {

    const onCLickHandler = () => {
      props.callback()
    }
    // class="button-86" role="button"

    return (
        <div className={s.reusButtonWrapper}>

            <button
                className={s.reusButton}
                disabled={props.disable}
                onClick={onCLickHandler}>{props.title}
            </button>


        </div>
    );
}

