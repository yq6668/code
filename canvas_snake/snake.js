//蛇的自调用函数
(function (w) {
    var sco=document.querySelector(".sco");
    //小蛇的构造函数
    function Snake(width, height, direction) {
        this.width = width || 40;
        this.height = height || 40;
        this.direction = direction || "right";
        //游戏分数统计
        this.score=0;
        sco.innerText=this.score;
        //小蛇身躯
        this.body = [
            { x: 3, y: 2, color: "red" },
            { x: 2, y: 2, color: "green" },
            { x: 1, y: 2, color: "green" },
        ];
    }
    //小蛇的初始化方法

    Snake.prototype.init = function (ctx) {
        //创建小蛇的每一个身躯
        var image = new Image();
        for (var i = 0; i < this.body.length; i++) {
            //创建页面元素
            // image.src = this.body[i].color;
            // ctx.drawImage(image, this.body[i].x * 40, this.body[i].y * 40, this.width, this.height);
            ctx.beginPath();
            ctx.fillStyle = this.body[i].color;
            ctx.fillRect(this.body[i].x * 40, this.body[i].y * 40, this.width, this.height);
        }
    };
    //小蛇移动的方法
    Snake.prototype.move = function (ctx, food) {
        //改变非蛇头部分坐标
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //改变蛇头部分坐标
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "up":
                this.body[0].y -= 1;
                break;
            case "down":
                this.body[0].y += 1;
                break;

            default:
                break;
        }

        //当蛇头坐标和食物坐标重叠的时候，就可以吃食物了
        if (this.body[0].x === food.x && this.body[0].y === food.y) {
            //让小蛇的身躯+1
            this.score+=500;
            sco.innerText=this.score;
            var last = this.body[this.body.length - 1];
            var item = {
                x: last.x,
                y: last.y,
                color: last.color,
            };
            this.body.push(item);
            food.init(ctx, 0);
        }
        for (var i = 1; i < this.body.length; i++) {
            if (this.body[i].x === food.x && this.body[i].y === food.y) {
                food.init(ctx, 0);
            }
        }
        //每次移动就会删除之前的，重新生成
        this.init(ctx);
    };
    w.Snake = Snake;
})(window);