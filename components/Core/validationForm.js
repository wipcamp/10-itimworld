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

  const maximumLength = [
    {
      field: ['nickname'],
      length: 32
    },
    {
      field: ['addr_prov', 'addr_dist', 'edu_lv', 'edu_major', 'first_name', 'last_name', 'first_name_en', 'last_name_en'],
      length: 64
    },
    {
      field: ['edu_name'],
      length: 128
    },
    {
      field: ['congenital_diseases', 'allergic_foods', 'congenital_drugs'],
      length: 191
    },
    {
      field: ['citizen_id'],
      length: 13
    },
    {
      field: ['skill_computer', 'past_camp', 'activities', 'known_via'],
      length: 65535
    }
  ]

  fields.map(e => {
    if (!values[e]) {
      errors[e] = required
    } else if (typeof values[e] === 'string' && !values[e].trim()) {
      errors[e] = 'โปรดอย่าเว้นช่องว่าง'
    } else if (maximumLength[0].field.includes(e) &&
                values[e].length > maximumLength[0].length) {
      errors[e] = `ป้อนได้ไม่เกิน ${maximumLength[0].length} ตัวอักษร`
    } else if (maximumLength[1].field.includes(e) &&
                values[e].length > maximumLength[1].length) {
      errors[e] = `ป้อนได้ไม่เกิน ${maximumLength[1].length} ตัวอักษร`
    } else if (maximumLength[2].field.includes(e) &&
                values[e].length > maximumLength[2].length) {
      errors[e] = `ป้อนได้ไม่เกิน ${maximumLength[2].length} ตัวอักษร`
    } else if (maximumLength[3].field.includes(e) &&
                values[e].length > maximumLength[3].length) {
      errors[e] = `ป้อนได้ไม่เกิน ${maximumLength[3].length} ตัวอักษร`
    } else if (maximumLength[4].field.includes(e) &&
                values[e].length > maximumLength[4].length) {
      errors[e] = `ป้อนได้ไม่เกิน ${maximumLength[4].length} ตัวอักษร`
    } else if (maximumLength[5].field.includes(e) &&
                values[e].length > maximumLength[5].length) {
      errors[e] = `ป้อนได้ไม่เกิน ${maximumLength[5].length} ตัวอักษร`
    } else if (e.includes('telno') && values[e].replace(/[^\d]/g, '').length !== 10) {
      errors[e] = 'โปรดกรอกเบอร์โทรศัพท์ให้ครบ 10 ตัว'
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
    if (!values.other_blood_group) {
      errors.other_blood_group = required
    } else if (!values.other_blood_group.trim()) {
      errors.other_blood_group = 'โปรดอย่าเว้นช่องว่าง'
    } else if (values.other_blood_group > 16) {
      errors.other_blood_group = `ป้อนได้ไม่เกิน 16 ตัวอักษร`
    }
  }

  if (!values.edu_gpax) {
    errors.edu_gpax = required
  } else if (!/^[0-9.]+$/.test(values.edu_gpax)) {
    errors.edu_gpax = 'อนุญาต ให้ใส่เฉพาะตัวเลข'
  } else if (Number(values.edu_gpax) > 4 || Number(values.edu_gpax) < 0) {
    errors.edu_gpax = 'ให้อยู่ช่วง 0 ถึง 4'
  } else if (values.edu_gpax.split('.')[1] && values.edu_gpax.split('.')[1].length > 2) {
    errors.edu_gpax = 'ทศนิยม 2 ตำแหน่ง'
  }

  return errors
}
