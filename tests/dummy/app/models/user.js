import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  firstName: attr('string'),
  email: attr('string'),
  location: attr('string'),
  address: attr('string')
});
