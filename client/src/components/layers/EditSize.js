import React from 'react';
import { useDispatch } from 'react-redux';
import {
    overImageDecSize,
    overImageIncSize,
} from '../../redux/action/overImage';

function EditSize() {
    const dispatch = useDispatch();
    return (
        <div className="edit-size">
            <h1>tăng giảm chiều rộng</h1>
            <div>
                <button onClick={() => dispatch(overImageIncSize())}>+</button>
                <button onClick={() => dispatch(overImageDecSize())}>-</button>
            </div>
            <h1>tăng giảm chiều cao</h1>
            <div>
                <button onClick={() => dispatch(overImageIncSize('h'))}>
                    +
                </button>
                <button onClick={() => dispatch(overImageDecSize('h'))}>
                    -
                </button>
            </div>
        </div>
    );
}

export default EditSize;
