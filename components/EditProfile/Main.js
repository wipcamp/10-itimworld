import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import styled from 'styled-components'

import EditForm from './EditFormContainer'
import api from '../../utils/api'
import cookie from '../../utils/cookie'
import getToken from '../../utils/getToken'
import { validate } from '../Core/validationForm'

import { actions as editprofileActions } from '../../store/reducers/editprofile'

import { fields as fields1 } from '../Register/form.json'
import { fields as fields2 } from '../Register/form2.json'

const allFields = [
  ...fields1,
  {
    component: 'header',
    label: 'ประสบการณ์'
  },
  ...fields2
]

const mapingProfileField = (values) => {
  const fields = [
    'user_id',
    'first_name',
    'last_name',
    'first_name_en',
    'last_name_en',
    'nickname',
    'gender_id',
    'citizen_id',
    'religion_id',
    'birth_at',
    'blood_group',
    'congenital_diseases',
    'allergic_foods',
    'congenital_drugs',
    'addr_prov',
    'addr_dist',
    'telno_personal',
    'edu_name',
    'edu_lv',
    'edu_major',
    'edu_gpax',
    'parent_relation',
    'telno_parent',

    'known_via',
    'activities',
    'past_camp',
    'skill_computer'
  ]
  let data = {}
  fields.map(field => {
    if (field === 'blood_group') {
      const blood = values.blood_group
      if (!['A', 'B', 'AB', 'O'].includes(blood)) {
        data.other_blood_group = blood
        data.blood_group = 'other'
      } else {
        data.blood_group = blood
      }
    } else if (field === 'gender_id') {
      data.gender_id = values.gender_id.toString()
    } else if (field === 'birth_at') {
      data.birth_at = moment(values.birth_at, 'YYYY-MM-DD')
    } else {
      data[field] = values[field]
    }
  })
  return data
}

const BackgroundContainer = styled.div`
  min-height: 100vh;
  background-image: url('/static/img/bg.png');
  background-size: cover;
  background-position: 50%;
  background-attachment: fixed;

  @media screen and (min-width: 0) and (max-width: 576px) {
    background-position: right;
  }
`

const MainEditProfile = props => {
  console.log(props)
  return (
    <BackgroundContainer>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-6 col-md-5 mt-4 mb-2'>
            <img src='/static/img/logo.svg' alt='' />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10 mb-4'>
            <EditForm
              {...props}
              fields={allFields}
            />
          </div>
        </div>
      </div>
    </BackgroundContainer>
  )
}

export default compose(
  connect(
    state => ({
      editprofileData: state.editprofile
    }),
    { onSubmit: editprofileActions.saveProfile }
  ),
  getToken(),
  reduxForm({
    validate,
    form: 'edit-profile'
  }),
  lifecycle({
    async componentDidMount () {
      const { props } = this
      const { user_id: userId } = props.initialValues
      let {token} = cookie({req: false})
      let { data } = await api.get(`/registrants/${userId}`, {Authorization: `Bearer ${token}`})
      data = data[0]
      console.log(data)
      // const blood = data.blood_group
      // if (!['A', 'B', 'AB', 'O'].includes(blood)) {
      //   data.other_blood_group = blood
      //   data.blood_group = 'other'
      // }
      const userData = {
        ...data,
        ...data.profile_registrant
        // gender_id: data.gender_id.toString(),
        // birth_at: moment(data.birth_at, 'YYYY-MM-DD')
      }

      let user = mapingProfileField(userData)
      console.log(user)
      props.initialize(user)
    }
  })
)(MainEditProfile)
