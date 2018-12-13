import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  klassName,
  containerKlassName
}) => {
  return (
    <div className={
      classNames('text-area-input-container', {
        'invalid': error,
        [containerKlassName]: containerKlassName
      })
    }>
      <textarea 
        className={
          classNames('text-area-input', {
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