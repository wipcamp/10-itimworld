import React from 'react'
import styled from 'styled-components'
import { Field, formValues } from 'redux-form'
import { actions } from '../../store/reducers/register'
import moment from 'moment'
import { normalizeCitizenId, normalizePhone, normalizeGpax, normalizeDate, normalizeThai, normalizeEng } from './normalizeForm'
import { province } from '../Register/data-dropdown.json'
import Datetime from 'react-datetime'

const inputStyle = {
  backgroundColor: '#f5f8fa',
  color: '#768694',
  minHeight: '38px',
  borderColor: '#ced4da',
  transition: 'all .3s ease-in-out'
}

const StyledInput = styled.input`

  background-color: ${inputStyle.backgroundColor};
  border-radius: 10px;
  padding: 4px 15px;
  outline: 0;
  color: ${inputStyle.color};
  min-height: ${inputStyle.minHeight};
  transition: ${inputStyle.transition};

  &:foucus {
    background-color: #D6D6D6 !important;
  }
`

const StyledSelect = styled.select`
  width: ${props => props.width};
  background-color: ${inputStyle.backgroundColor};
  border-radius: 10px;
  color: ${inputStyle.color};
  transition: ${inputStyle.transition};
`

const CheckRadio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 1px solid ${inputStyle.borderColor};
  border-radius: 100%;
  height: 20px;
  width: 20px;
  top: 4px;
  left: 5px;
  z-index: 5;
  transition: border .25s linear;
  background: ${inputStyle.backgroundColor};

  &::before {
    display: block;
    content: '';
    border-radius: 100%;
    height: 12px;
    width: 12px;
    margin: auto;
    transition: background 0.25s linear;
  }

`

const RadioContainer = styled.div`
  position: relative;

  & > label {
    display: inline-block;
    position: relative;
    left: -12px;
    padding: 2px 0px 2px 35px;
    margin: 0px auto;
    height: 30px;
    z-index: 9;
    cursor: pointer;
    transition: ${inputStyle.transition};
  }

  & > input[type=radio] {
    position: absolute;
    outline: none;
    left: 10px;
    top: 5px;
    z-index: -1;

    &:checked ~ ${CheckRadio}::before {
      background: ${inputStyle.color};
    }

    &:focus ~ ${CheckRadio} {
      border-color: #80bdff;
      background: #fff;
      box-shadow: 0 0 0 0.1rem rgba(0,123,255,.25);
    }
  }

  & > .inline-input {
    vertical-align: baseline;
    display: inline-block;
    /* width: calc(100% - 68px); */
    /* width: 50%; */
    width: calc(100% - 85px);
    margin-left: 15px;
    position: relative;
  }
`

const StyledTextArea = styled.textarea`
  background-color: ${inputStyle.backgroundColor};
  color: ${inputStyle.color};
  transition: ${inputStyle.transition};
`

const Error = styled.small`
  min-height: 18px;
  display: inline-block;
  color: #ea0c0c;
  padding: 0 10px;

  ${props => props.top && `
    /* for blood_group */
    position: relative;
    top: ${props.top};
  `}

  ${props => props.position && `
    /* position for other_blood_group */
    position: ${props.position}
  `}
  
`

const Label = styled.label`
  /* min-height: 50px; */
  padding-left: 10px;
  font-size: 20px;
`

const Input = ({
  label,
  input,
  type,
  meta: { touched, error },
  outerClass,
  innerClass,
  placeholder
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${input.name}-input`}>{label}</Label>
    <StyledInput {...input} type={type} placeholder={placeholder} className={innerClass} />
    <Error>{touched && error}</Error>
  </div>
)

const InputNoLabel = ({
  input,
  type,
  meta: { touched, error },
  outerClass,
  innerClass,
  placeholder,
  disabled
}) => (
  <div className={outerClass}>
    <StyledInput {...input} type={type} placeholder={placeholder} disabled={disabled} className={innerClass} />
    <Error position={`absolute`} className='text-left'>{touched && error}</Error>
  </div>
)

const MultipleSelect = ({
  input,
  innerClass,
  label,
  outerClass,
  placeholder,
  data,
  htmlFor,
  onChange
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${htmlFor}-multiple`}>{label}</Label>
    <div className='col-12 px-0'>
      <div className='row'>
        {
          data.map((field, index) => {
            switch (field.name) {
              case 'dob_mm':
                return (
                  <Field
                    key={index}
                    name={field.name}
                    component={Select}
                    innerClass={field.innerClass + ' col'}
                    outerClass={field.middleClass}
                    dropdown={field.dropdown}
                    values={field.values}
                    placeholder={placeholder}
                    onChange={(_, newValue) => actions.setField('selectedMoth', newValue)}
                  />
                )
              default:
                return (
                  <Field
                    key={index}
                    name={field.name}
                    component={Select}
                    innerClass={field.innerClass + ' col'}
                    outerClass={field.middleClass}
                    dropdown={field.dropdown}
                    placeholder={placeholder}
                    values={field.values}
                  />
                )
            }
          })
        }
      </div>
    </div>

  </div>
)

const Radio = ({
  label,
  input,
  outerClass,
  innerClass,
  data,
  name,
  htmlFor,
  blood
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${htmlFor}-input`}>{label}</Label>
    <div>
      {
        data.map((option, index) => {
          return option.value === 'other' ? (
            <RadioContainer
              key={index}
              className={option.innerClass}
            >
              <Field
                type={'radio'}
                name={name}
                component={`input`}
                value={option.value}
                id={`${option.htmlFor}-option`}
              />
              <Label htmlFor={`${option.htmlFor}-option`}>{option.label}</Label>
              <CheckRadio htmlFor={`${option.htmlFor}-option`} />
              <Field
                name={`other_blood_group`}
                type={`text`}
                innerClass={`form-control`}
                outerClass={`inline-input`}
                component={InputNoLabel}
                disabled={blood !== 'other'}
                placeholder={blood === 'other' ? 'ระบุ' : undefined}
              />
            </RadioContainer>
          ) : (
            <RadioContainer
              key={index}
              className={option.innerClass}
            >
              <Field
                type={'radio'}
                name={name}
                component={`input`}
                value={option.value}
                id={`${option.htmlFor}-option`}
              />
              <Label htmlFor={`${option.htmlFor}-option`}>{option.label}</Label>
              <CheckRadio htmlFor={`${option.htmlFor}-option`} />
            </RadioContainer>
          )
        }
        )
      }
    </div>
    <Field name={name} component={renderError} top='-4px' />
  </div>
)

const renderError = ({
  meta: {touched, error},
  top
}) => <Error top={top} >{ touched && error }</Error>

const SingleSelect = ({
  label,
  name,
  outerClass,
  innerClass,
  dropdown,
  values,
  province,
  placeholder
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${name}-input`} >{label}</Label>
    <Field
      name={name}
      component={Select}
      dropdown={dropdown}
      values={values}
      innerClass={innerClass}
      placeholder={placeholder}
      disabled={name === 'addr_dist' && !province}
    />
  </div>
)

const Select = ({
  input,
  meta: { touched, error, warning },
  innerClass,
  outerClass,
  dropdown,
  width = '100%',
  values,
  disabled,
  placeholder
}) => (
  <div className={outerClass}>
    <StyledSelect {...input} className={innerClass} disabled={disabled} width={width}>
      <option value='' >{disabled ? '-' : `${placeholder || 'โปรดเลือก'}`}</option>
      {
        dropdown.map((v, i) => (
          <option key={i} value={values[i]}>{v}</option>
        ))
      }
    </StyledSelect>
    <Error>{touched && error}</Error>
  </div>
)

const TextArea = ({
  input,
  meta: { touched, error, warning },
  innerClass,
  outerClass,
  label,
  name,
  placeholder
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${name}-textarea-input`}>{label}</Label>
    <StyledTextArea {...input} rows='4' className={innerClass} placeholder={placeholder} />
    <Error>{touched && error}</Error>
  </div>
)

const DataList = ({
  input,
  meta: { touched, error, warning },
  innerClass,
  dropdown,
  list,
  outerClass,
  label,
  name
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${name}-input`}>{label}</Label>
    <div>
      <StyledInput list={list} className={innerClass} {...input} />
      <datalist id={list} >
        {
          dropdown.map((v, i) => (
            <option key={i} value={v} />
          ))
        }
      </datalist>
      <Error>{touched && error}</Error>
    </div>
  </div>
)

const range = {
  start: moment('1998 GMT+7'),
  end: moment('2004 GMT+7')
}

const DateInput = ({
  input,
  meta: { touched, error, warning },
  label,
  outerClass,
  placeholder
}) => (
  <div className={outerClass} >
    <Label>{label}</Label>
    <Datetime
      {...input}
      timeFormat={false}
      renderInput={props => <StyledInput {...props} placeholder={placeholder} />}
      isValidDate={(cur) => cur.isBetween(range.start, range.ed)}
      viewMode={'years'}
    />
    <Error>{touched && error}</Error>
  </div>

)

export {
  Input,
  MultipleSelect,
  Radio,
  SingleSelect,
  DataList,
  TextArea
}

const FieldInput = (props) => {
  switch (props.component) {
    case 'input':
      if (props.type === 'tel') {
        return <Field {...props} component={Input} normalize={normalizePhone} />
      } else if (props.name === 'citizen_id') {
        return <Field {...props} component={Input} normalize={normalizeCitizenId} />
      } else if (props.name === 'edu_gpax') {
        return <Field {...props} component={Input} normalize={normalizeGpax} />
      } else if (['first_name', 'last_name'].includes(props.name)) {
        return <Field {...props} component={Input} normalize={normalizeThai} />
      } else if (props.name.includes('_en')) {
        return <Field {...props} component={Input} normalize={normalizeEng} />
      }
      return <Field {...props} component={Input} />

    case 'multiple-select':
      if (props.data[0].name === 'dob_dd') {
        return <MultipleSelect {...props} />
      }
      return <MultipleSelect {...props} />

    case 'radio':
      return <Radio {...props} />

    case 'select':
      if (props.name === 'addr_prov') {
        props = {
          ...props,
          name: 'addr_prov',
          dropdown: province,
          values: province
        }
      }
      return <SingleSelect {...props} />

    case 'datalist':
      return <Field {...props} component={DataList} />

    case 'textarea':
      return <Field {...props} component={TextArea} />

    case 'date':
      return <Field {...props} component={DateInput} normalize={normalizeDate} />

    case 'header':
      return <div className='col-12 text-left'>
        <h1>{props.label}</h1>
        <hr />
      </div>

    case 'hr':
      return <div className={props.class}><hr /></div>

    case 'newline':
      return <div className={props.class} />
    default:
      return <div />
  }
}

export default formValues({
  province: 'addr_prov',
  blood: 'blood_group'
})(FieldInput)
