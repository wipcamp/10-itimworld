import React from 'react'
import styled from 'styled-components'
import {Field} from 'redux-form'
import { actions } from '../../store/reducers/register'
import { normalizeCitizenId, normalizePhone, normalizeGpax } from './normalizeForm'
import { province } from '../Register/data-dropdown.json'

const inputStyle = {
  backgroundColor: '#f5f8fa',
  color: '#768694',
  minHeight: '38px',
  borderColor: '#ced4da'
}

const StyledInput = styled.input`

  background-color: ${inputStyle.backgroundColor};
  border-radius: 10px;
  padding: 4px 15px;
  outline: 0;
  color: ${inputStyle.color};
  min-height: ${inputStyle.minHeight};

  &:foucus {
    background-color: #D6D6D6 !important;
  }
`

const StyledSelect = styled.select`
  width: ${props => props.width};
  background-color: ${inputStyle.backgroundColor};
  border-radius: 10px;
  color: ${inputStyle.color};

  & select {
    appearance: none;
    background-color: #fff;
    height: 100px;
  }
  &:after {
    content: "/";
    color: pink;
  }
  &:last-child:after {
    content: "";
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
    transition: all 0.25s linear;
  }

  & > input[type=radio] {
    position: absolute;
    /* visibility: hidden; */
    /* top:7px;
    left: 7px;
     */
    outline: none;
    left: 10px;
    top: 5px;
    z-index: -1;

    &:checked ~ div.check::before {
      background: ${inputStyle.color};
    }

    &:focus ~ div.check {
      border-color: #80bdff;
      background: #fff;
      box-shadow: 0 0 0 0.1rem rgba(0,123,255,.25);
    }
  }

  & > div.check {
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
  }

  & > .inline-input {
    display: inline-block;
    width: 60%;
  }
`

const StyledTextArea = styled.textarea`
  background-color: ${inputStyle.backgroundColor};
  color: ${inputStyle.color};
`

const Error = styled.small`
  min-height: 18px;
  color: #ea0c0c;
  padding: 0 10px;
  display: block;
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
    {touched && error && <Error>{error}</Error>}
  </div>
)

const InputNoLabel = ({
  input,
  type,
  meta: { touch, error },
  outerClass,
  innerClass,
  placeholder,
  disabled
}) => (
  <div className={outerClass}>
    <StyledInput {...input} type={type} placeholder={placeholder} disabled={disabled} className={innerClass} />
  </div>
)

const MultipleSelect = ({
  input,
  innerClass,
  label,
  outerClass,
  middleClass,
  placeholder,
  data,
  htmlFor,
  onChange
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${htmlFor}-multiple`}>{label}</Label>
    <div>
      {
        data.map((field, index) => {
          console.log('field > ', field.name)
          switch (field.name) {
            case 'dob_mm':
              return (
                <Field
                  key={index}
                  name={field.name}
                  component={Select}
                  innerClass={field.innerClass + ' col'}
                  outerClass={middleClass}
                  dropdown={field.dropdown}
                  values={field.values}
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
                  outerClass={middleClass}
                  dropdown={field.dropdown}
                  values={field.values}
                />
              )
          }
        })
      }
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
              <div htmlFor={`${option.htmlFor}-option`} className='check' />
              <Field
                name={`other_blood_group`}
                type={`text`}
                innerClass={`form-control`}
                outerClass={`inline-input`}
                component={InputNoLabel}
                disabled={blood !== 'other'}
                placeholder={blood === 'other' && 'ระบุ'}
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
              <div htmlFor={`${option.htmlFor}-option`} className='check' />
            </RadioContainer>
          )
        }
        )
      }
    </div>
    {/* {touched && error && <Error>{error}</Error>} */}
  </div>
)

const SingleSelect = ({
  label,
  name,
  outerClass,
  innerClass,
  dropdown,
  values
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${name}-input`} >{label}</Label>
    <Field
      name={name}
      component={Select}
      dropdown={dropdown}
      values={values}
      innerClass={innerClass}
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
  values
}) => (
  <div className={outerClass}>
    <StyledSelect {...input} className={innerClass} width={width}>
      <option value='' >โปรดเลือก</option>
      {
        dropdown.map((v, i) => (
          <option key={i} value={values[i]}>{v}</option>
        ))
      }
    </StyledSelect>
    {touched && error && <Error>{error}</Error>}
  </div>
)

const TextArea = ({
  input,
  meta: { touched, error, warning },
  innerClass,
  outerClass,
  label,
  name
}) => (
  <div className={outerClass}>
    <Label htmlFor={`${name}-textarea-input`}>{label}</Label>
    <StyledTextArea {...input} className={innerClass} />
    {touched && error && <Error>{error}</Error>}
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
      {touched && error && <Error>{error}</Error>}
    </div>
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
      }
      return <Field {...props} component={Input} />

    case 'multiple-select':
      if (props.data[0].name === 'dob_dd') {
        // props.data[0].dropdown = props.sp
        // props.data[0].values = props.sp
        return <MultipleSelect {...props} />
      }
      return <MultipleSelect {...props} />

    case 'radio':
      return <Radio {...props} />

    case 'select':
      if (props.name === 'addr_prov') {
        props = {
          ...props,
          dropdown: province,
          values: province
        }
      }
      return <Field {...props} component={SingleSelect} />

    case 'datalist':
      return <Field {...props} component={DataList} />

    case 'textarea':
      return <Field {...props} component={TextArea} />

    case 'hr':
      return <div className={props.class}><hr /></div>

    case 'newline':
      return <div className={props.class} />
    default:
      return <div />
  }
}

export default FieldInput
