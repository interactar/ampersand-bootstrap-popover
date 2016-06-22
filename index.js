var View = require('ampersand-view');
window.jQuery = require('jquery');
require('bootstrap');
require('bootstrap-tooltip');

var extend = require('lodash/assign');

module.exports = View.extend({
  props:{
    target:['object',true],
    content:['string',true],
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

    var content = this.content.render();

    var options = _.extend({
      title:'Title',
      content:content,
      html:true,
      placement:'right',
      trigger:'click'
    },this._values);

    var $popover = this.$popover = $(this.target);
    this.$popover.popover(options);

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
