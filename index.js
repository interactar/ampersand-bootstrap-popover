var View = require('ampersand-view');
window.jQuery = require('jquery');
require('bootstrap');
require('bootstrap-tooltip');
var extend = require('lodash/assign');

module.exports = View.extend({
  props:{
    target:['any',true],
    view:['state',true],
    title:'string',
    trigger:['string',false,'click'],
    placement:['string',false,'right'],
    html:['string',false,'html'],
    events:['object',false,function (){
      return {};
    }]
  },
  template:require('./template.hbs'),
  render:function(){
    this.renderWithTemplate(this);

    var content = this.view.render();

    var $popover = this.$popover = $(this.target);
    this.$popover.popover({
      title: this.title,
      content: content.el,
      html: true,
      placement: this.placement,
      trigger: this.trigger
    });

    var self = this;
    for(var eventName in this.events){
      var eventHandler = this.events[eventName];
      $popover.on(eventName,function(){
        eventHandler.prototype.apply(self,arguments);
      });
    }

    return this;
  },
  remove:function(){
    this.$popover.popover('destroy');
  }
});
