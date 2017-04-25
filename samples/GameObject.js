function GameObject () {
  this.gameManager = null;

	this.init = function (gameManager) {
		this.gameManager = gameManager;
	};

	this.update = function (delta) { };

	this.draw = function (ctx) { };
}
