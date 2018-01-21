import React from 'react'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import { header, fields } from './form.json'
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
  dropdown,
  width = '100%'
}) => (
  <Select {...input} type={type} className={className} width={width}>
    <option disabled>โปรดเลือก</option>
    {
      dropdown.map((v, i) => (
        <option key={i} value={v}>{v}</option>
      ))
    }
  </Select>
)

const templateDataList = ({
  input,
  meta: { touched, error, warning },
  className,
  dropdown
}) => (
  <datalist {...input} className={className}>
    {
      dropdown.map((v, i) => (
        <option key={i} value={v} />
      ))
    }
  </datalist>
)

const templateRadio = ({
  input,
  type,
  meta: { touched, error, warning },
  className,
  value
}) => (
  <Input {...input} type={type} className={className} value={value} />
)

const StyledHeader = styled.div`
  background-image: url('https://wip.camp/assets/img/logo/wipcamp9-full-transparent.svg');
  margin: 40px 0 20px;
  width: 40%;
  height: 150px;
  display: inline-block;
  background-size: cover;
`

const SubHeader = styled.h3`
  background: #032E51;
  color: #fff;
  padding: 10px 0;
  margin: 0;
`

const BackgroundContainer = styled.div`
  background: #045DA5;
  min-height: 100vh;
  height: auto;
`

const inputStyle = {
  backgroundColor: '#D6D6D6',
  color: '#fff'
}

const Input = styled.input`

  background-color: ${inputStyle.backgroundColor};
  border-radius: 20px;
  padding: 4px 15px;
  outline: 0;
  border: 0;
  color: ${inputStyle.color};

  &:foucus {
    background-color: #D6D6D6 !important;
  }
`

const TextArea = styled.textarea`
  background-color: ${inputStyle.backgroundColor};
  color: ${inputStyle.color};
`

const RegisterSection = styled.form`
  color: blue;
  background: #fff;
  margin-bottom: 5em;
  border-radius: 0 0 10px 10px;
  /* box-shadow: 0px 5px 10px 2px rgba(0,0,0,0.5); */
`

const Label = styled.label`
  /* min-height: 50px; */
  padding-left: 10px;
`

const Select = styled.select`
  width: ${props => props.width};
  background-color: #D6D6D6;
  border-radius: 20px;
    color: white;

  & select {
    appearance: none;
    background-color: #fff;
    height: 100px;
  }
`

const Button = styled.button`
  border-radius: 10px;
`

const Radio = styled.input`

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
                  {/* field */}
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>{fields.firstName.label}</Label>
                    <Field name={fields.firstName.name} component={templateInput} type={fields.firstName.type} className='form-control' />
                  </div>
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>{fields.lastName.label}</Label>
                    <Field name={fields.lastName.name} component={templateInput} type={fields.lastName.type} className='form-control' />
                  </div>
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>{fields.firstName_en.label}</Label>
                    <Field name={fields.firstName_en.name} component={templateInput} type={fields.firstName_en.type} className='form-control' />
                  </div>
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>{fields.lastName_en.label}</Label>
                    <Field name={fields.lastName_en.name} component={templateInput} type={fields.lastName_en.type} className='form-control' />
                  </div>
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>{fields.nickname.label}</Label>
                    <Field name={fields.nickname.name} component={templateInput} type={fields.nickname.type} className='form-control' />
                  </div>
                  {/* field */}

                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>{fields.date_dob.name}</Label>
                    <div>

                      <Field
                        name={fields.date_dob.name}
                        component={templateSelect}
                        className='form-control d-inline-block'
                        dropdown={new Array(31).fill(0).map((v, i) => i + 1)}
                        width='65px'
                      />
                      <Field
                        name={fields.month_dob.name}
                        component={templateSelect}
                        className='form-control d-inline-block ml-1'
                        width='110px'
                        dropdown={dataDropdown.months}
                      />
                      <Field
                        name={fields.year_dob.name}
                        component={templateSelect}
                        className='form-control d-inline-block ml-1'
                        width='85px'
                        dropdown={[1998, 1999, 2000, 2001]}
                      />
                    </div>
                  </div>
                  <div className='col-12 col-sm-8 text-left form-group'>
                    <Label>เลขที่บัตรประชาชน</Label>
                    <Field
                      name={fields.citizen_id.name}
                      component={templateInput}
                      type={fields.citizen_id.type}
                      className='form-control'
                    />
                  </div>
                  <div className='col-sm-4 d-none d-sm-inline-block' />
                  <div className='form-check col-12 col-sm-4 text-left form-group'>
                    <Label>{fields.gender.label}</Label>
                    <div>
                      <div className='form-check form-check-inline ml-sm-4 mb-0' >
                        <Field
                          name={fields.gender.name}
                          component={templateRadio}
                          type={fields.gender.type}
                          value={fields.gender.values[0]}
                        />{` `}
                        <label className=' pl-0' htmlFor='inlineRadio1' >{fields.gender.values[0]}</label>
                      </div>
                      <div className='form-check form-check-inline ml-sm-4' >
                        <Field
                          name={fields.gender.name}
                          component={templateRadio}
                          type={fields.gender.type}
                          value={fields.gender.values[1]}
                        />{` `}
                        <label className=' pl-0' htmlFor='inlineRadio1' >{fields.gender.values[1]}</label>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-2 text-left form-group'>
                    <Label>{fields.blood.label}</Label>

                    <Field
                      name={fields.blood.name}
                      component={templateSelect}
                      className='form-control d-block ml-1'
                      dropdown={dataDropdown.blood}
                    />
                  </div>
                  <div className='col-12 col-sm-4 text-left form-group'>
                    <Label>{fields.religion.label}</Label>
                    <Field
                      name={fields.religion.name}
                      component={templateSelect}
                      className='form-control d-block ml-1'
                      dropdown={dataDropdown.religion}
                    />
                  </div>
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>{fields.school.label}</Label>
                    <Field
                      className='form-control d-inline-block ml-1'
                      name={fields.school.name}
                      component={templateDataList}
                      dropdown={['โรงเรียนของเราน่าอยู่', 'โรงเรียนของเราน่าอยู่ 2']}
                    />
                    <Select className='form-control d-inline-block ml-1'>
                      <option>ไก่</option>
                      <option>-</option>
                    </Select>
                  </div>
                  <div className='col-12 col-sm-3 text-left form-group'>
                    <Label>{fields.grade.label}</Label>
                    <Field
                      name={fields.grade.name}
                      component={templateSelect}
                      dropdown={dataDropdown.academicYear}
                      className='form-control d-inline-block ml-1'
                    />
                  </div>
                  <div className='col-12 col-sm-3 text-left form-group'>
                    <Label>{fields.gpax.label}</Label>
                    <Field
                      name={fields.gpax.name}
                      component={templateInput}
                      type={fields.gpax.type}
                      className='form-control'
                    />
                  </div>
                  <div className='col-12 col-sm-3 text-left form-group'>
                    <Label>{fields.major.label}</Label>
                    <Field
                      name={fields.major.name}
                      component={templateSelect}
                      dropdown={dataDropdown.major}
                      className='form-control d-inline-block ml-1'
                    />
                  </div>
                  <div className='col-12 text-dark form-group'>
                    <hr />
                    <h2>ติดต่อ</h2>
                  </div>
                  <div className='col-12 col-sm-4 text-left form-group'>
                    <Label>{fields.district.label}</Label>
                    <Field
                      name={fields.district.name}
                      component={templateSelect}
                      dropdown={dataDropdown.district}
                      className='form-control d-inline-block ml-1'
                    />
                  </div>
                  <div className='col-12 col-sm-4 text-left form-group'>
                    <Label>จังหวัด</Label>
                    <Select className='form-control d-inline-block ml-1'>
                      <option>จังหวัด</option>
                      <option>อะไรวะ</option>
                    </Select>
                  </div>
                  <div className='col-12 col-sm-4 text-left form-group'>
                    <Label>รหัสไปรษณีย์</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12 col-sm-5 text-left form-group'>
                    <Label>เบอร์โทรศัพท์</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12 text-dark'>
                    <hr />
                    <h2>ฉุกเฉิน</h2>
                  </div>
                  <div className='col-12 col-sm-5 text-left form-group'>
                    <Label>อาหารที่แพ้</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12 col-sm-5 text-left form-group'>
                    <Label>โรคประจำตัว</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12 col-sm-5 text-left form-group'>
                    <Label>ยาที่แพ้</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12 col-sm-5 text-left form-group'>
                    <Label>ยาประจำตัว</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12' />
                  <div className='col-12 col-sm-5 text-left form-group'>
                    <Label>เบอร์โทรศัพท์ผู้ปกครอง</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12 col-sm-5 text-left form-group'>
                    <Label>เบอร์โทรศัพท์ผู้ปกครอง</Label>
                    <input type='radio' /> พ่อ
                    <input type='radio' /> แม่
                  </div>

                  <div className='col-12 text-dark'>
                    <hr />
                    <h2>ทักษะคอมพิวเตอร์</h2>
                  </div>
                  <div className='col-12 text-left form-group'>
                    <Label>น้องๆ เคยมีทักษะคอมพิวเตอร์มาก่อนหรือเปล่า</Label>
                    <TextArea className='form-control' />
                  </div>
                  <div className='col-12 text-left form-group'>
                    <Label>ค่ายที่เคยเข้า</Label>
                    <TextArea className='form-control' />
                  </div>
                  <div className='col-12 text-left form-group'>
                    <Label>น้องๆ เคยมีทักษะคอมพิวเตอร์มาก่อนหรือเปล่า</Label>
                    <TextArea className='form-control' />
                  </div>
                  <div className='col-12 text-left form-group'>
                    <Label>รู้จักค่ายนี้จากไหน</Label>
                    <div className='form-check col-12 col-sm-4 text-left form-group'>
                      <div>
                        <div className='form-check form-check-inline ml-sm-4 mb-0' >
                          <Input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1' />
                          <label className='form-check-label pl-0' htmlFor='inlineRadio1' style={{marginTop: '-13px', verticalAlign: 'middle'}}>facebook</label>
                        </div>
                        <div className='form-check form-check-inline ml-sm-4' >
                          <Input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1' />
                          <label className='form-check-label pl-0' htmlFor='inlineRadio1' style={{marginTop: '-13px'}}>line</label>
                        </div>
                        <div className='form-check form-check-inline ml-sm-4' >
                          <Input className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1' />
                          <label className='form-check-label pl-0' htmlFor='inlineRadio1' style={{marginTop: '-13px'}}>อื่นๆ</label>
                          <div className='form-group'>
                            <Input className='form-control' placeholder='อื่นๆ' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 text-left form-group'>
                    <Label>มีอะไรอยากจะบอกไหม </Label>
                    <TextArea className='form-control' />
                  </div>
                  <div className='col-12 text-right'>
                    <button className={'btn btn-primary'} type='submit' disabled={pristine || submitting}>
                      ถัดไป
                    </button>
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
    form: 'register'
  })
)(MainRegister)
