import Ember from 'ember';
import layout from '../templates/components/form-for';

const {
  computed: { reads, bool, readOnly },
  get,
  inject: { service },
  isPresent,
  set,
  run: { schedule },
  Component
} = Ember;

const FormForComponent = Component.extend({
  layout,

  tagName: 'form',

  config: service('ember-form-for/config'),
  customFormFields: reads('config.customFormFields'),

  attributeBindings: ['tabindex'],

  init() {
    this._super(...arguments);

    // Freshdesk specific code
    var rules = this.get('rules') || {};
    this.get('object').reopen(rules);

    let formClasses = get(this, 'config.formClasses');
    let classNames = get(this, 'classNames');
    set(this, 'classNames', (classNames || []).concat(formClasses));

    this.propertyDidChange();
  },

  // Freshdesk specific code
  model: readOnly('object'),
  validations: readOnly('model.validations'),
  hasValidations: bool('validations'),
  startValidate: false,

  submit: (object) => object.save(),
  reset:  (object) => object.rollback(),

  update(object, propertyName, value) {
    set(object, propertyName, value);
  },

  actions: {
    submit(object) {
      // console.log("subit");
      // get(this, 'submit')(object);
      // set(this, 'tabindex', undefined);
      //
      // let errors = get(object, 'errors');
      // if (errors) {
      //   for (let propertyName in errors) {
      //     if (isPresent(get(errors, propertyName))) {
      //       set(this, 'tabindex', -1);
      //       schedule('afterRender', () => this.$().focus());
      //       break;
      //     }
      //   }
      // }
      let model = this.get('object');
      model.validate().then(({validations}) => {
          set(this, 'startValidate', true);
          // debugger
          // debugger
          let isValid = validations.get('isValid');
          if(isValid){
            console.log("submit");
            // this.sendAction('submit', model);
          // console.log("success");
          } else {
            console.log("error");
            // this.sendAction('onValidationFailed');
          }
      });
    }
  }
});

FormForComponent.reopenClass({
  positionalParams: ['object', 'rules']
});

export default FormForComponent;
