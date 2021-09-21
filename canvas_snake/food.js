//食物的自调用函数
(function (w) {
    //食物的构造函数
    function Food(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 40;
        this.height = height || 40;
        this.color = "red";
        this.q = 0;
    }
    //食物的初始化方法
    var image = new Image();
    image.src = "images/bianbian.png";
    Food.prototype.init = function (ctx, x) {
        if (x == 0) {
            this.q = x;
        }
        //指定食物的坐标
        if (this.q == 0) {
            var maxX = Math.floor(ctx.canvas.width / this.width);
            var maxY = Math.floor(ctx.canvas.height / this.height);
            x = Random.getRandom(0, maxX);
            y = Random.getRandom(0, maxY);
            this.x = x;
            this.y = y;
            this.q = 1;
        }
        //创建页面元素
        ctx.beginPath();
        ctx.drawImage(image, this.x * 40, this.y * 40, this.width, this.height);
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x*40, this.y*40, this.width, this.height);
    };
    w.Food = Food;
})(window);