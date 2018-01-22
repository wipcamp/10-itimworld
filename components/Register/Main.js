import React from 'react'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import {
  header,
  information_fields,
  dob_fields,
  citizen_field,
  gender_field,
  blood_field,
  religion_field,
  school_field,
  schoolGrade_field,
  gpax_field,
  major_field,
  addr_fields,
  telno_field,
  emergency_fields,
  parent_fields,
  textarea_fields
} from './form.json'
import {actions as registerActions} from '../../store/reducers/register'
import dataDropdown from './data-dropdown.json'

const renderField = ({
  label,
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div className='input-row'>
    <label>{label}</label>
    <input {...input} type={type} placeholder={placeholder} />
    {touched && error && <span className='error'>{error}</span>}
  </div>
)

const templateInput = ({
  input,
  type,
  meta: { touched, error, warning },
  className
}) => (
  <Input {...input} type={type} className={className} />
  // {touched && error && <span className='error'>{error}</span>}
)

const templateSelect = ({
  input,
  type,
  meta: { touched, error, warning },
  className,
  middleClass,
  dropdown,
  width = '100%',
  values,
  separator
}) => (
  <div className={middleClass}>
    <Select {...input} type={type} className={className} width={width} separator={separator}>
      <option value='' >โปรดเลือก</option>
      {
        dropdown.map((v, i) => (
          <option key={i} value={values[i]}>{v}</option>
        ))
      }
    </Select>
  </div>
)

const templateTextArea = ({
  input,
  meta: { touched, error, warning },
  className
}) => (
  <TextArea {...input} className={className} />
)

const templateDataList = ({
  input,
  meta: { touched, error, warning },
  className,
  dropdown,
  list
}) => (
  <div>
    <Input list={list} className={className} {...input} />
    <datalist id={list} >
      {
        dropdown.map((v, i) => (
          <option key={i} value={v} />
        ))
      }
    </datalist>
  </div>
)

const templateRadio = ({
  input,
  type,
  meta: { touched, error, warning },
  className
}) => {
  return (
    <Input {...input} type={type} className={className} />
  )
}

const StyledHeader = styled.div`
  background-image: url('https://wip.camp/assets/img/logo/wipcamp9-full-transparent.svg');
  margin: 40px 0 20px;
  width: 40%;
  height: 150px;
  display: inline-block;
  background-size: cover;
`

const SubHeader = styled.h3`
  background: #336699;
  color: #fff;
  padding: 10px 0;
  margin: 0;
  border-radius: 10px 10px 0 0;
`

const BackgroundContainer = styled.div`
  background: #252525;
  min-height: 100vh;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`

const inputStyle = {
  backgroundColor: '#D6D6D6',
  color: '#fff',
  minHeight: '38px'
}

const Input = styled.input`

  background-color: ${inputStyle.backgroundColor};
  border-radius: 10px;
  padding: 4px 15px;
  outline: 0;
  border: 0;
  color: ${inputStyle.color};
  min-height: ${inputStyle.minHeight};

  &:foucus {
    background-color: #D6D6D6 !important;
  }
`

const TextArea = styled.textarea`
  background-color: ${inputStyle.backgroundColor};
  color: ${inputStyle.color};
`

const RegisterSection = styled.form`
  color: #0E3559;
  background: #fff;
  margin-bottom: 5em;
  border-radius: 10px;
  /* box-shadow: 0px 5px 10px 2px rgba(0,0,0,0.5); */
`

const Label = styled.label`
  /* min-height: 50px; */
  padding-left: 10px;
`

const Select = styled.select`
  width: ${props => props.width};
  background-color: #D6D6D6;
  border-radius: 10px;
    color: white;

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

  ${props => props.separator && `
  `}
`

const SubmitButton = styled.button`
  background-color: #336699;
  color: #fff;
  font-weight: bold;

  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'} ;
  }
`

export const MainRegister = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <div>
      <BackgroundContainer>
        <div className='container'>
          <div className='row '>
            <div className='col-12 text-center'>
              <StyledHeader />
            </div>
            <div className='col-12 text-center text-white'>
              <div>
              ขั้นตอนการลงทะเบียน
              </div>
            </div>
            <div className='col-12 col-sm-10 mx-auto text-center'>
              <RegisterSection onSubmit={handleSubmit(registerActions.saveRegister)}>
                <SubHeader>ลงทะเบียน</SubHeader>
                <div className='row px-4 pb-5 pt-3'>
                  <div className='col-12 text-dark'>
                    <h2>ข้อมูลส่วนตัว</h2>
                  </div>
                  {
                    information_fields.map((e, i) => (
                      <div key={i} className={e.outerClass}>
                        <Label>{e.label}</Label>
                        <Field
                          name={e.name}
                          component={templateInput}
                          type={e.type}
                          className={e.innerClass}
                        />
                      </div>
                    ))
                  }

                  {
                    <div className={dob_fields.outerClass}>
                      <Label>{dob_fields.label}</Label>
                      <div>
                        {
                          dob_fields.data.map((e, i) => (
                            <Field
                              name={e.name}
                              component={templateSelect}
                              className={e.innerClass + ' col'}
                              middleClass={dob_fields.middleClass}
                              dropdown={e.dropdown}
                              values={e.values}
                              separator={1}
                            />
                          ))
                        }
                      </div>
                    </div>
                  }

                  <div className={citizen_field.outerClass}>
                    <Label>{citizen_field.label}</Label>
                    <Field
                      name={citizen_field.name}
                      component={templateInput}
                      className={citizen_field.innerClass}
                    />
                  </div>
                  <div className={`d-sm-inline-block d-none col-4`} />
                  <div className={gender_field.outerClass}>
                    <Label>{gender_field.label}</Label>
                    <div>
                      {
                        gender_field.data.map((e, i) => (
                          <div key={i} className={e.innerClass}>
                            <Field
                              name={gender_field.name}
                              component={'input'}
                              value={`${i + 1}`}
                              type={'radio'}
                            />
                            <label className=' pl-0' htmlFor='gender-input' >{e.label}</label>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className={telno_field.outerClass}>
                    <Label>{telno_field.label}</Label>
                    <Field
                      name={telno_field.name}
                      component={templateInput}
                      type={telno_field.type}
                      className={telno_field.innerClass}
                    />
                  </div>
                  {
                    addr_fields.map((e, i) => (
                      <div key={i} className={e.outerClass}>
                        <Label>{e.label}</Label>
                        <Field
                          name={e.name}
                          component={templateSelect}
                          dropdown={e.dropdown}
                          values={e.dropdown}
                          className={e.innerClass}
                        />
                      </div>
                    ))
                  }
                  <div className={blood_field.outerClass}>
                    <Label>{blood_field.label}</Label>
                    <Field
                      name={blood_field.name}
                      component={templateSelect}
                      className={blood_field.innerClass}
                      dropdown={blood_field.dropdown}
                      values={blood_field.dropdown}
                    />
                  </div>
                  <div className={religion_field.outerClass}>
                    <Label>{religion_field.label}</Label>
                    <Field
                      name={religion_field.name}
                      component={templateSelect}
                      className={religion_field.innerClass}
                      dropdown={religion_field.dropdown}
                      values={religion_field.dropdown}
                    />
                  </div>

                  <div className={school_field.outerClass}>
                    <Label>{school_field.label}</Label>
                    <Field
                      className={school_field.innerClass}
                      name={school_field.name}
                      component={templateDataList}
                      dropdown={['โรงเรียนของเราน่าอยู่', 'โรงเรียนของเราน่าอยู่ 2']}
                      list={school_field.list}
                    />
                  </div>

                  <div className={schoolGrade_field.outerClass}>
                    <Label>{schoolGrade_field.label}</Label>
                    <Field
                      name={schoolGrade_field.name}
                      component={templateSelect}
                      className={school_field.innerClass}
                      dropdown={schoolGrade_field.dropdown}
                      values={schoolGrade_field.dropdown}
                    />
                  </div>
                  <div className={gpax_field.outerClass}>
                    <Label>{gpax_field.label}</Label>
                    <Field
                      name={gpax_field.name}
                      component={templateInput}
                      type={gpax_field.type}
                      className={gpax_field.innerClass}
                    />
                  </div>
                  <div className={major_field.outerClass}>
                    <Label>{major_field.label}</Label>
                    <Field
                      name={major_field.name}
                      component={templateSelect}
                      className={major_field.innerClass}
                      dropdown={dataDropdown.major}
                      values={dataDropdown.major}
                    />
                  </div>
                  {
                    parent_fields.map((e, i) => (
                      <div key={i} className={e.outerClass}>
                        <Label>{e.label}</Label>
                        <Field
                          name={e.name}
                          component={templateInput}
                          className={e.innerClass}
                        />
                      </div>
                    ))
                  }
                  {
                    emergency_fields.map((e, i) => (
                      <div key={i} className={e.outerClass}>
                        <Label>{e.label}</Label>
                        <Field
                          name={e.name}
                          component={templateInput}
                          className={e.innerClass}
                        />
                      </div>
                    ))
                  }
                  <div className='col-12' />

                  <div className='col-12 text-dark'>
                    <hr />
                    <h2>ทักษะคอมพิวเตอร์</h2>
                  </div>
                  {
                    textarea_fields.map((e, i) => (
                      <div key={i} className={e.outerClass}>
                        <label>{e.label}</label>
                        <Field
                          name={e.name}
                          component={templateTextArea}
                          className={e.innerClass}
                        />
                      </div>
                    ))
                  }
                  <div className='col-12'>
                    <SubmitButton
                      className={'btn btn-lg'}
                      type='submit'
                      disabled={pristine || submitting}
                      title={'ถัดไป'}
                    >
                    ถัดไป
                    </SubmitButton>
                  </div>
                </div>
              </RegisterSection>
            </div>
          </div>
        </div>
      </BackgroundContainer>
    </div>
  )
}

export default compose(
  reduxForm({
    form: 'register',
    initialValues: {
      user_id: 1
    }
  })
)(MainRegister)
