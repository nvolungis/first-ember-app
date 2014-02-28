App = Ember.Application.create();

App.Router.map(function(){
  this.resource('about');
  this.resource('posts', function(){
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function(){
    return posts;
  }
})

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function(){
      this.set('isEditing', true);
    },

    doneEditing: function(){
      this.set('isEditing', false);
    }
  }
});

Ember.Handlebars.helper('format-date', function(date){
  return moment(date).fromNow();
});

Ember.Handlebars.helper('format-markdown', function(input){
  var converter = new Showdown.converter();
  return new Handlebars.SafeString(converter.makeHtml(input));
});

var posts = [{
  id: "1",
  title: 'Rails is Omakase',
  author: { name: 'd2h' },
  date: new Date("12,27 2012"),
  excerpt: 'There are lots of a la carte software environments in this world. Places where in ...',
  body: 'I want this for my ORM, I want that for my template langage, and lets finish it off with...'
},
{
  id: "2",
  title: 'The Parley Letter',
  author: { name: 'd2h' },
  date: new Date('12, 24 2012'),
  excerpt: 'There are lots of a la carte software environments in this world. Places where in ...',
  body: 'I want this for my ORM, I want that for my template langage, and lets finish it off with...'
}];
