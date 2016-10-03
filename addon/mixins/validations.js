import Ember from 'ember';
// import LabelId from './label-id';
// import FormComponent from 'ember-form/components/form-for/component';
/*
  Note:
  Three state for input field
    1. valid
    2. error
    3. warning -- have to implement
 */

const {
  computed,
  computed: { and, not, notEmpty, readOnly, reads },
  defineProperty,
  get
} = Ember;

export default Ember.Mixin.create({

  value: null,
  propertyName: null,

  init() {
    this._super(...arguments);
    let propertyName = this.get('propertyName');
    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${propertyName}`));
    // defineProperty(this, 'value', computed.alias(`model.${propertyName}`));
  },

  classNames: ['input'],
  classNameBindings: [
    'hasContent:has-content',
    'isValid:valid',
    'showError:error'
  ],

  // These will be passed as states when they are in contexual mode.
  // This can be removed after a point.
  // form: computed({
  //   get: function () {
  //     return this.nearestOfType(FormComponent);
  //   }
  // }),
  // model: ('form.for'),
  // validations: ('form.validations'),
  // startValidate: ('form.startValidate'),


  // Show error when validation is dirty, invalid and didvalidated
  showError: and('startValidate', 'isInvalid').readOnly(),

  // Show hint is inverse of showError, will be true initially
  showHint: not('showError').readOnly(),

  // Required state
  isRequired: readOnly('model.validation.options.presence'),

  // Property should be true if async validation,
  notValidating: not('model.validation.isValidating').readOnly(),

  // Check input has value
  hasContent: notEmpty('value').readOnly(),

  // valid state
  isValid: and('hasContent', 'model.validation.isValid', 'notValidating').readOnly(),

  // Invalid state
  isInvalid: readOnly('model.validation.isInvalid'),
  // Display an
  error: reads('model.validation.messages.firstObject'),
  errors: reads('model.validation.messages')
});
