function Vector2() {
		this.x;
		this.y;
};

var TILE = 64;

function Player(x, y, raycaster) {
		this.x = x;
		this.y = y;
		this.angle = Math.PI / 3;
		this.moveableForward = true;
		this.moveableBackward = true;
		this.raycaster = raycaster;

		this.update = function(delta) {
				if (Key.isDown(Key.UP) && this.moveableForward) {
						this.x += Math.cos(this.angle) * (TILE / 2) * delta;
						this.y += Math.sin(this.angle) * (TILE / 2) * delta;
				}
				if (Key.isDown(Key.DOWN) && this.moveableBackward) {
						this.x -= Math.cos(this.angle) * (TILE / 2) * delta;
						this.y -= Math.sin(this.angle) * (TILE / 2) * delta;
				}
				if (Key.isDown(Key.LEFT)) {
						this.angle -= 0.05;
				}
				if (Key.isDown(Key.RIGHT)) {
						this.angle += 0.05;
				}

				if (this.angle < 0) {
						this.angle += Math.PI * 2;
				}

				this.angle %= Math.PI * 2;
		}
};
Player.prototype = new Vector2();

function Raycaster() {
		this.map = null;
		var COLORS = ['', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)', 'rgb(255, 255, 255)'];
		var INFINITY = 1 / 0;
		var SCR_W = 0;
		var SCR_H = 0;
		var SCR_W_HALF = 0;
		var SCR_H_HALF = 0;
		var WALL_H_FACTOR = 90;
		var WALL_H = 0;
		var RAY_ANGLE = 0;
		var PI_TWO = Math.PI * 2;
		var PI_HALF = Math.PI / 2;
		var VOF = 60 * (Math.PI / 180);
		var VOF_HALF = VOF / 2;
		var TILE_QUATER = TILE / 2;
		this.preciseDistance = true
		this.depthShading = true
		this.player = new Player(TILE * 4.5, TILE * 2, this);
		var textures = new Array();

		this.init = function (gameManager) {
				this.gameManager = gameManager;
				SCR_W_HALF = (SCR_W = this.gameManager.width) / 2;
				SCR_H_HALF = (SCR_H = this.gameManager.height) / 2;
				RAY_ANGLE = VOF / SCR_W;
				WALL_H = SCR_H * WALL_H_FACTOR;
				this.loadMap();
				this.loadTextures();

				var ctx = gameManager.getCtx();
				ctx.webkitImageSmoothingEnabled = false;
				ctx.mozImageSmoothingEnabled = false;
				ctx.operaImageSmoothingEnabled = false;
		}

		this.draw = function(ctx) {
				this.drawBackgound(ctx);

				var lineElement = {
						y: 0,
						x: 0,
						texture: null,
						north: false,
						dist: 0,
						part: 0
				};

				var i = 0;
				for (var rayAngle = -VOF_HALF; rayAngle < VOF_HALF; rayAngle += RAY_ANGLE) {
						var dx = this.player.x + Math.cos(this.player.angle + rayAngle) * 100;
						var dy = this.player.y + Math.sin(this.player.angle + rayAngle) * 100;

						this.getLine(this.player.x, this.player.y, dx, dy, lineElement);

						var vX = this.player.x - lineElement.x;
						var vY = this.player.y - lineElement.y;
						lineElement.dist = Math.sqrt(vX * vX + vY * vY) * Math.cos(rayAngle);

						var wallFactor = (SCR_H_HALF / lineElement.dist * TILE_QUATER) * 2
						var texture = lineElement.texture;

						if (texture)
						ctx.drawImage(texture, Math.floor(lineElement.part * (texture.width / TILE)), 0, 1, texture.height, i, SCR_H_HALF - wallFactor, 1, wallFactor * 2)

						ctx.globalAlpha = lineElement.dist / 1000 * (lineElement.north ? 1 : 1.5);
						ctx.fillStyle = "black";
						ctx.beginPath();
						ctx.moveTo(i, SCR_H_HALF - wallFactor);
						ctx.lineTo(i, SCR_H_HALF + wallFactor);
						ctx.closePath();
						ctx.stroke();
						ctx.globalAlpha = 1;

						if (i == SCR_W_HALF) {
								this.player.moveableForward = lineElement.dist > 10;
						}

						i++;
				}

				this.drawMap(ctx);
		}

		this.drawBackgound = function(ctx) {
				var grd = ctx.createLinearGradient(0,SCR_H_HALF,0,0);
				grd.addColorStop(0,"black");
				grd.addColorStop(1,"grey");
				ctx.fillStyle = grd;
				ctx.fillRect(0, 0, SCR_W, SCR_H_HALF);

				grd = ctx.createLinearGradient(0,SCR_H_HALF,0,SCR_H);
				grd.addColorStop(0,"black");
				grd.addColorStop(1,"grey");
				ctx.fillStyle = grd;
				ctx.fillRect(0, SCR_H_HALF, SCR_W, SCR_H);
		}

		this.getLine = function(x1, y1, x2, y2, lineElement) {
				var dx = Math.abs(x2 - x1);
				var dy = Math.abs(y2 - y1);
				var sx = (x1 < x2) ? 1 : -1;
				var sy = (y1 < y2) ? 1 : -1;
				var err = dx - dy;
				var e2;
				var perviousTileX = 0;
				var perviousTileY = 0;

				while (!((x1 == x2) && (y1 == y2))) {
						e2 = err << 1;
						if (e2 > -dy) {
								err -= dy;
								x1 += sx;
						}
						else if (e2 < dx) {
								err += dx;
								y1 += sy;
						}

						var mapX = Math.floor(x1 / TILE);
						var mapY = Math.floor(y1 / TILE);

						if (this.map[mapY][mapX]) {
								lineElement.y = y1;
								lineElement.x = x1;
								lineElement.texture = textures[this.map[mapY][mapX]];
								lineElement.north = perviousTileX == mapX;
								lineElement.part = lineElement.north ? x1 - (mapX * TILE) : y1 - (mapY * TILE)
								return;
						}
						perviousTileX = mapX;
						perviousTileY = mapY;
				}
		}

		this.update = function(delta) {
				this.player.update(delta);
		}

		this.loadMap = function() {
				this.map = [
						[ 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 4, 5, 6, 5, 6, 5, 6, 5, 6],
						[ 6, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0, 4],
						[ 5, 0, 0, 0, 0, 0, 0, 0, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5],
						[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 7, 8, 0, 6],
						[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 7, 0, 5],
						[ 6, 0, 0,10, 0,10, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 7, 8, 0, 6],
						[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 8, 7, 0, 5],
						[ 6, 0, 0,10, 0,10, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 7, 8, 0, 6],
						[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
						[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
						[ 5, 0, 0,11,11,11,11,11,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
						[ 6, 0, 0,11, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
						[ 5, 0, 0,11,11,11,11,11,11, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 5],
						[ 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
						[ 5, 7, 8, 9, 8, 7, 7, 8, 9, 8, 7, 8, 3, 3, 3, 3, 3, 3, 8, 7]
				];
		}

		this.loadTextures = function() {
				var maxTexture = 0;
				for (var y = 0; y < this.map.length; y++) {
						for (var x = 0; x < this.map[y].length; x++) {
								maxTexture = Math.max(maxTexture, this.map[y][x]);
						}
				}

				for (var i = 0; i <= maxTexture; i++) {
						var texture = new Image();
						texture.src = 'Textures/' + i + '.png';
						textures.push(texture)
				}
		}

		this.drawMap = function (ctx) {
				ctx.fillStyle = 'BLACK'
				ctx.fillRect(0, 0, this.map[0].length * 2, this.map.length * 2);

				for (var y = 0; y < this.map.length; y++) {
						for (var x = 0; x < this.map[y].length; x++) {
								if (!this.map[y][x]) {
										continue;
								}

								ctx.fillStyle = COLORS[this.map[y][x]];
								ctx.fillRect(x*2, y*2, 2, 2);
						}
				}

				ctx.fillStyle = 'WHITE'
				ctx.fillRect((this.player.x / TILE) * 2, (this.player.y / TILE) * 2, 4 ,4)
		}
};
Raycaster.prototype = new GameObject();
