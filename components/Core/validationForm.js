import moment from 'moment'

export const validate = values => {
  const errors = {}
  const required = 'โปรดระบุ'
  const range = {
    start: moment('1998 GMT+7', 'YYYY'),
    end: moment('2004 GMT+7', 'YYYY')
  }

  const validDate = (cur) => cur.isBetween(range.start, range.end)
 
  const fields = [
    'first_name',
    'last_name',
    'first_name_en',
    'last_name_en',
    'nickname',
    'gender_id',
    'telno_personal',
    'addr_prov',
    'addr_dist',
    'religion_id',
    'edu_name',
    'edu_lv',
    'edu_gpax',
    'edu_major',
    'telno_parent',
    'parent_relation',
    'allergic_foods',
    'congenital_diseases',
    'congenital_drugs',

    'skill_computer',
    'past_camp',
    'activities',
    'known_via'
  ]

  fields.map(e => {
    if (!values[e]) {
      errors[e] = required
    } else if (typeof values[e] === 'string' && !values[e].trim()) {
      errors[e] = 'โปรดอย่าเว้นช่องว่าง'
    } else if (e.includes('telno') && values[e].replace(/[^\d]/g, '').length !== 10) {
      errors[e] = 'โปรดกรอกเบอร์โทรศัพท์ให้ครบถ้วน'
    }
  })

  if (!values.birth_at) {
    errors.birth_at = required
  } else if (!moment.isMoment(values.birth_at)) {
    errors.birth_at = 'กรุณารูปแบบวันที่ให้ถูกต้อง (DD/MM/YYYY)'
  } else if (!validDate(values.birth_at)) {
    errors.birth_at = 'กรุณากรอกช่วงวันให้ถูกต้อง (ค.ศ. 1998 - 2004)'
  }

  if (!values.citizen_id) {
    errors.citizen_id = required
  } else if (values.citizen_id.replace(/[^\d]/g, '').length !== 13) {
    errors.citizen_id = 'โปรดระบุเลขบัตรประชาชนให้ครบ 13 หลัก'
  }

  if (!values.blood_group) {
    errors.blood_group = required
  } else if (values.blood_group === 'other') {
    errors.other_blood_group = required
  }

  return errors
}
