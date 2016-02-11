// Create angularJS module
angular.module('miniTPOrderForm', [])
	.service('ArticleService', function () {
		this.articles = [{
			id: 1,
			title: 'A superb laptop',
			price: 1900
		}, {
			id: 2,
			title: 'The superman baby spoon',
			price: 900
		}, {
			id: 3,
			title: 'A weekend to die (trip)',
			price: 10
		}, {
			id: 4,
			title: 'Chocolate',
			price: 400
		}]
	})
	.controller('orderFormCtrl', function (ArticleService) {
		// Create a shortcut vm for ViewModel
		var vm = this

		var computeTotal = function () {
			var total = 0;
			angular.forEach(vm.selectedArticles, function (article, articleId) {
				if (article) {
					total += article.price
				}
			})
			vm.total = total
		}

		vm.total = 0;
		vm.selectedArticles = {}
		vm.articles = ArticleService.articles
		vm.isArticleSelected = function (article) {
			return vm.selectedArticles[ article.id ]
		}
		vm.toggleSelectArticle = function (article) {
			if(vm.isArticleSelected(article)) {
				vm.selectedArticles[ article.id ] = null
			} else {
				vm.selectedArticles[ article.id ] = article
			}
			computeTotal()
		}
	})