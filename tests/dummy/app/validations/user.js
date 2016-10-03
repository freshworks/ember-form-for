import { validator, buildValidations } from 'ember-cp-validations';

// import { belongsTo, hasMany } from 'ember-data/relationships';
export default buildValidations({
  firstName: {
    description: 'Firstname',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 5,
        max: 15
      })
    ]
  },
  email: {
   validators: [
     validator('presence', true),
     validator('format', {
       type: 'email'
     })
   ]
  },
  location: {
    description: 'Location',
    validators: [
      validator('presence', true)
    ]
  },
  address: {
    description: 'Address',
    validators: [
      validator('presence', true)
    ]
  },
  terms: {
    description: 'Terms',
    validators: [
      validator('presence', true)
    ]
  }
});
