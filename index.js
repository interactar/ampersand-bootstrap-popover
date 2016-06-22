var View = require('ampersand-view');
window.jQuery = require('jquery');
require('bootstrap');
require('bootstrap-tooltip');
var extend = require('lodash/assign');

module.exports = View.extend({
  autoRender:true,
  props:{
    target:['any',true],
    view:['state',true],
    events:['object',false,function (){
      return {};
    }],
    _title:'string',
    _trigger:['string',false,'click'],
    _placement:['string',false,'right']
  },
  template:require('./template.hbs'),
  render:function(){
    this.renderWithTemplate(this);

    var content = this.view.render();

    var $popover = this.$popover = $(this.target);
    this.$popover.popover({
      title: this._title,
      content: content.el,
      html: true,
      placement: this._placement,
      trigger: this._trigger
    });

    var self = this;
    for(var eventName in this._events){
      var eventHandler = this._events[eventName];
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
