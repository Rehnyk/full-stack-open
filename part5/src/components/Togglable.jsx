import PropTypes from 'prop-types';
import { useState, forwardRef, useImperativeHandle } from 'react';


const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };


    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.viewButton}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.hideButton}</button>
            </div>
        </div>
    );

});
Togglable.displayName = 'Togglable';

Togglable.propTypes = {
    viewButton: PropTypes.string.isRequired,
    hideButton: PropTypes.string.isRequired
};
export default Togglable;