import React from 'react'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import styled from 'styled-components'
import Router from 'next/router'

import EditForm from './EditFormContainer'
import api from '../../utils/api'
import cookie from '../../utils/cookie'
import getToken from '../../utils/getToken'
import { validate } from '../Core/validationForm'
import Alert from '../Core/Alert'
import checkStep from '../../utils/checkRegisterStep'
import Header from '../Core/Header/Main'

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
    if (['gender_id', 'edu_gpax'].includes(field)) {
      data[field] = values[field].toString()
    } else if (field === 'birth_at') {
      data[field] = moment(values[field], 'YYYY-MM-DD')
    } else if (field.includes('telno')) {
      let number = values[field]
      if (number.length <= 3) {
        data[field] = number
      } else if (number.length <= 6) {
        data[field] = `${number.slice(0, 3)}-${number.slice(3)}`
      } else {
        data[field] = `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`
      }
    } else if (field === 'citizen_id') {
      let numberId = values[field]
      let len = numberId.length
      if (numberId < 2) {
        data[field] = numberId
      } else if (len < 6) {
        data[field] = `${numberId.slice(0, 1)}-${numberId.slice(1)}`
      } else if (len < 11) {
        data[field] = `${numberId.slice(0, 1)}-${numberId.slice(1, 5)}-${numberId.slice(5)}`
      } else if (len < 13) {
        data[field] = `${numberId.slice(0, 1)}-${numberId.slice(1, 5)}-${numberId.slice(5, 10)}-${numberId.slice(10)}`
      } else {
        data[field] = `${numberId.slice(0, 1)}-${numberId.slice(1, 5)}-${numberId.slice(5, 10)}-${numberId.slice(10, 12)}-${numberId.slice(12, 13)}`
      }
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
  return (
    <BackgroundContainer>
      <Header />
      <div className='container'>
        <Alert {...props} {...props.editprofileData} />
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10 my-4'>
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
    {
      ...editprofileActions,
      onSubmit: editprofileActions.saveProfile
    }
  ),
  getToken(),
  checkStep('/editprofile'),
  reduxForm({
    validate,
    form: 'edit-profile',
    onSubmitFail: (err, __, ___, props) => props.onSubmitError(err)
  }),
  lifecycle({
    async componentDidMount () {
      const { props } = this
      const { user_id: userId } = props.initialValues
      let {token} = cookie({req: false})
      let { data } = await api.get(`/registrants/${userId}`, {Authorization: `Bearer ${token}`})
      data = data[0]
      const userData = {
        ...data,
        ...data.profile_registrant
      }
      let user = mapingProfileField(userData)
      props.initialize(user)
    },
    componentWillReceiveProps (nextProps) {
      if (nextProps.editprofileData.success) {
        nextProps.setSucces()
        setTimeout(() => {
          Router.push('/dashboard')
        }, 2000)
      }
    }
  })
)(MainEditProfile)
