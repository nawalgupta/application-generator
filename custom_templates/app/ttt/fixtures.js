import { Meteor } from 'meteor/meteor';

{% for model in app.models %}

import { [[model.proper_plural_name]] } from '../api/[[model.plural_name]]';

{% endfor %}


Meteor.startup(() => {
	

{% for model in app.models %}
	
  if ([[model.proper_plural_name]].find().count() === 0) {
	//todo check model.sample is not blank
	//todo loop
	

    const [[model.plural_name]] = [ [[model.sample]] ];

    [[model.plural_name]].forEach(([[model.name]]) => {
      [[model.proper_plural_name]].insert([[model.name]])
    });
  }
{% endfor %}
  
  
}


);
