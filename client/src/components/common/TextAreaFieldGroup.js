import React from 'react'
import classNames from 'classNames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  klassName
}) => {
  return (
    <div className="text-area-input-container">
      <textarea 
        className={
          classnames('text-area-input', {
            'invalid': error,
            [klassName]: klassName
          })
        }
        placeholder = {placeholder}
        name={name} 
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

export default TextAreaFieldGroup;