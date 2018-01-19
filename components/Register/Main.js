import React from 'react'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import { header, fields } from './form.json'

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

const RegisterSection = styled.div`
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
  &:checked, &:not(:checked) {
    position: absolute;
    left: -99999px;
    opacity: 0;
  }

  &:checked + label, &:not(:checked) + label {
    position: relative;
    padding-left: -28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
  }

  //not checked border
  &:checked + label:before, &:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }

  //checked circle
  &:checked + label:after, &:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #555;
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 100%;
    transition: all 0.2s ease;
  }  

  //hide not checked circle 
  &:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }

  &:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }


`

export const MainRegister = props => {
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
              <RegisterSection>
                <SubHeader>ลงทะเบียน</SubHeader>
                <div className='row px-4 pb-5 pt-3'>
                  <div className='col-12 text-dark'>
                    <h2>ข้อมูลส่วนตัว</h2>
                  </div>
                  {
                    ['ชื่อ(ภาษาไทย)',
                      'นามสกุล(ภาษาไทย)',
                      'ชื่อ(ภาษาอังกฤษ)',
                      'นามสกุล(ภาษาอังกฤษ)',
                      'ชื่อเล่น'].map((val, index) =>
                      (
                        <div key={index} className='col-12 col-sm-6 text-left form-group'>
                          <Label>{val}</Label>
                          <Input className='form-control' />
                        </div>
                      ))
                  }
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>วัน/เดือน/ปี เกิด</Label>
                    <div>
                      <Select className='form-control d-inline-block' width='65px'>
                        <option>วัน</option>
                        {
                          new Array(31).fill(0).map((val, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                          ))
                        }
                      </Select>
                      <Select className='form-control d-inline-block ml-1' width='100px'>
                        <option>เดือน</option>
                        <option >มกราคม</option>
                      </Select>
                      <Select className='form-control d-inline-block ml-1' width='85px'>
                        <option>ปี</option>
                        <option >1998</option>

                      </Select>
                    </div>
                  </div>
                  <div className='col-12 col-sm-8 text-left form-group'>
                    <Label>เลขที่บัตรประชาชน</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-sm-4 d-none d-sm-inline-block'/>
                  <div className='form-check col-12 col-sm-4 text-left form-group'>
                    <Label>เพศ</Label>
                    <div>
                      <div className='form-check form-check-inline ml-sm-4 mb-0' >
                        <Radio className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1' />
                        <label className='form-check-label pl-0' htmlFor='inlineRadio1' style={{marginTop: '-13px', verticalAlign: 'middle'}}>ชาย</label>
                      </div>
                      <div className='form-check form-check-inline ml-sm-4' >
                        <Radio className='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1' />
                        <label className='form-check-label pl-0' htmlFor='inlineRadio1' style={{marginTop: '-13px'}}>หญิง</label>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-4 text-left form-group'>
                    <Label>กรุ๊ปเลือด</Label>
                    <Select className='form-control d-inline-block ml-1'>
                      <option>+</option>
                      <option>-</option>
                    </Select>
                  </div>
                  <div className='col-12 col-sm-4 text-left form-group'>
                    <Label>ศาสนา</Label>
                    <Select className='form-control d-inline-block ml-1'>
                      <option>+</option>
                      <option>-</option>
                    </Select>
                  </div>
                  {/* <div className='col-sm-4 d-none d-sm-inline-block' /> */}
                  <div className='col-12 col-sm-6 text-left form-group'>
                    <Label>โรงเรียน</Label>
                    <Select className='form-control d-inline-block ml-1'>
                      <option>ไก่</option>
                      <option>-</option>
                    </Select>
                  </div>
                  <div className='col-12 col-sm-3 text-left form-group'>
                    <Label>ระดับชั้น</Label>
                    <Select className='form-control d-inline-block ml-1'>
                      <option>ม.4</option>
                      <option>ม.5</option>
                    </Select>
                  </div>
                  <div className='col-12 col-sm-3 text-left form-group'>
                    <Label>เกรด</Label>
                    <Input className='form-control' />
                  </div>
                  <div className='col-12 col-sm-3 text-left form-group'>
                    <Label>สายการเรียน</Label>
                    <Select className='form-control d-inline-block ml-1'>
                      <option>วิทย์ - คณิต</option>
                      <option>ม.5</option>
                    </Select>
                  </div>
                  <div className='col-12 text-dark form-group'>
                    <hr />
                    <h2>ติดต่อ</h2>
                  </div>
                  {/* <div className='col-12 text-left form-group'>
                    <Label>ที่อยู่</Label>
                    <TextArea className='form-control'/>
                  </div> */}
                  <div className='col-12 col-sm-4 text-left form-group'>
                    <Label>เขต/อำเภอ</Label>
                    <Select className='form-control d-inline-block ml-1'>
                      <option>เขต</option>
                      <option>อะไรวะ</option>
                    </Select>
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
                  <div className='col-12'/>
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
                          <div class="form-group">
                            <Input className="form-control"  placeholder="อื่นๆ" />
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
                    <Button className='btn btn-primary'>ถัดไป</Button>

                  </div>
                </div>
              </RegisterSection>
            </div>
            {/* <h1>{`${header}`}</h1>
          {fields.map(({ label, name, type, placeholder }, i) => (
            <Field
            key={i}
              label={label}
              name={name}
              placeholder={placeholder}
              component={renderField}
              type={type}
            />
          ))} */}
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
