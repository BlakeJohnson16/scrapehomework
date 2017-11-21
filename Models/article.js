var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type:String,
    required:true
  },
  link: {
    type:String,
    required:true
  },
  snippet: {
    type:String,
    required:false
  },
  vidimage: {
    type:String,
    required:false
  },
  note: {
      type: Schema.Types.ObjectId,
      ref: 'Note'
  }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;


ArticleSchema.methods.viewNotes = function(req, res, Note, article) {
	return this.model('Article')
	.find({_id: req.query.articleID})
	.exec(function(err, data) {
		console.log('viewNotes exec fired');
		console.log(data);
			Note.find({_id: {$in: data[0].notes}})
			.sort({created: -1})
			.exec(function(err, doc) {
				if(err) {
					console.log(err);
				} else {
					console.log('doc is ' + doc);
					res.render('article.hbs', {article: data[0], notes: doc, showNotes: req.query.showNotes});
				}
			});
	});
};



var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
