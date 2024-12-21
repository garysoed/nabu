load('node_modules/devbase/.mk.config-base.js');
load('node_modules/devbase/ts/.mk.config-base.js');

set_vars({
  vars: {
    local_deps: ['devbase', 'gs-testing', 'gs-types'],
  },
});
