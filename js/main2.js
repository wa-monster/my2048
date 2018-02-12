/**
 * Created by 杨阳阳 on 2018/2/5.
 */
//main2048
var bord=new Array();
var hasimpact=new Array();
var score=0;
var documentWidth=window.screen.availWidth;//当前屏幕宽度
var contentLen=0.92*documentWidth;//内容容器宽度
var contentSpace=0.04*documentWidth;//内容容器padding
var cellLen=0.18*documentWidth;//内部小盒子宽度
var cellSpace=0.04*documentWidth;//小盒子margin
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(document).ready(function () {
        ForMobile();
        newgame();
    //事件响应功能点 1.点击方向键，然后程序判断点击哪个箭头。
     //           2。确定箭头，先判断当前能否继续往箭头方向移动，能进行3个功能 方块移动，显示新的方块，判断游戏是否结束，不能则不作为
    //            3.方块移动，判断能移动到那个位置，进行动画演示，显示新方块，调用随机函数生成，判断游戏是否结束。
        $(document).keydown(function (event) {//事件响应
            switch(event.keyCode){
                case 37:
                    event.preventDefault();
                    if(toleft()){
                        score++;
                        updatescore(score);
                        setTimeout("generateOneNumber()",300);
                        setTimeout("isgameover()",400);
                    }
                    break;
                case 38:
                    event.preventDefault();
                    if(toup()){
                        score++;
                        updatescore(score);
                        setTimeout("generateOneNumber()",300);
                        setTimeout("isgameover()",400);
                    }
                    break;
                case 39:
                    event.preventDefault();
                    if(toright()){
                        score++;
                        updatescore(score);
                        setTimeout("generateOneNumber()",300);
                        setTimeout("isgameover()",400);
                    }
                    break;
                case 40:
                    event.preventDefault();
                    if(todown()){
                        score++;
                        updatescore(score);
                        setTimeout("generateOneNumber()",300);
                        setTimeout("isgameover()",400);
                    }
                    break;
                default:
                    break;

            }
        });
    document.addEventListener("touchstart",function (event) {
        startx=event.touches[0].pageX;
        starty=event.touches[0].pageY;
    })
    document.addEventListener("touchend",function (event) {
        endx=event.changedTouches[0].pageX;
        endy=event.changedTouches[0].pageY;

        var deltax=endx-startx;
        var deltay=endy-starty;
        // console.log("开始x轴"+startx);
        // console.log("开始Y轴"+starty);
        // console.log("结束X轴"+endx);
        // console.log("结束Y轴"+endy);
        // console.log("X轴值："+deltax);
        // console.log("Y轴值："+deltay);
        if(Math.abs(deltax)>=Math.abs(deltay)){
            //左右
            if(deltax>0){
               // console.log("右");
                //right
                if(toright()){
                    score++;
                    updatescore(score);
                    setTimeout("generateOneNumber()",300);
                    setTimeout("isgameover()",400);
                }
            }else{
                //console.log("左");
                //left
                if(toleft()){
                    score++;
                    updatescore(score);
                    setTimeout("generateOneNumber()",300);
                    setTimeout("isgameover()",400);
                }
            }
        }else{
            //上下
            //console.log("下");
            if(deltay>0){
                //down
                if(todown()){
                    score++;
                    updatescore(score);
                    setTimeout("generateOneNumber()",300);
                    setTimeout("isgameover()",400);
                }
            }else{
               //up
               // console.log("上");
               if(toup()){
                    score++;
                    updatescore(score);
                    setTimeout("generateOneNumber()",300);
                    setTimeout("isgameover()",400);
               }
            }
        }
    })
    $(".newgame").mousedown(function () {//开始新游戏
        newgame();
    })
});
function newgame() {
    //初始化棋盘
    init();
    //初始化数字
    generateOneNumber();
    generateOneNumber();
    //随机数字
}
function init() {//棋盘初始化函数，
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var cell=$("#c_cell_"+i+"_"+j);
            cell.css("left",getdis(i));
            cell.css("top",getdis(j));
        }
    }
    for(var i=0;i<4;i++){
        bord[i]=new Array();
        hasimpact[i]=new Array();
        for(var j=0;j<4;j++){
            bord[i][j]=0;
            hasimpact[i][j]=true;
        }
    }
    bordUpdate();
}

function bordUpdate() {
    $(".shuzi").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $(".content").append("<div class='shuzi' id='shuzi_" + i + "_" + j + "'></div>")
            var number_cell = $("#shuzi_" + i + "_" + j);
            if (bord[i][j] == 0) {
                number_cell.css("width", 0);
                number_cell.css("height", 0);
                number_cell.css("top", getdis(i));
                number_cell.css("left", getdis(j));
            } else {
                number_cell.css("width", cellLen);
                number_cell.css("height", cellLen);
                number_cell.css("top", getdis(i));
                number_cell.css("left", getdis(j));
                number_cell.css("background-color", getNumberBackgroundColor(bord[i][j]));
                number_cell.css("color", getNumberColor(bord[i][j]));
                number_cell.text(bord[i][j]);
            }
            hasimpact[i][j]=true;
        }
    }
}
function generateOneNumber() {
    //判断是否还有空位置
    if(nospace(bord)){
        return false;
    }

    //随机空位置

    var randx=Math.floor(Math.random()*4);
    var randy=Math.floor(Math.random()*4);
    while (true){
        if(bord[randx][randy]!=0){
            randx=Math.floor(Math.random()*4);
            randy=Math.floor(Math.random()*4);
        }else{
            break;
        }
    }
    //随机一个2或者4
    var randnum=Math.random()<0.5?2:4;
    bord[randx][randy]=randnum;
    //动画效果
    donghua(randx,randy,randnum);
    return true;
}



function toleft() {//事件响应左移
    if(!isleft()){
        return false;
    }

    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(bord[i][j]!=0){
                for(var k=0;k<j;k++){

                    if(bord[i][k]==0&&noObsteclel(i,k,j)){
                        //移动
                        $("#shuzi_"+i+"_"+j).animate({
                            left:getdis(k)
                        },200)
                        //数据变化
                        bord[i][k]=bord[i][j];
                        bord[i][j]=0;
                        continue;
                    }else if(bord[i][k]==bord[i][j]&&noObsteclel(i,k,j)&&hasimpact[i][k]){
                        //移动
                        $("#shuzi_"+i+"_"+j).animate({
                            left:getdis(k)
                        },200)
                        //数据变化
                        hasimpact[i][k]=false;
                        bord[i][k]+=bord[i][j];
                        bord[i][j]=0;
                        continue;
                    }
                }
            }
        }
    }
    //console.log(bord);
    setTimeout(bordUpdate,200);
    return true;
}

function toup() {//事件响应上移
    if(!isup()){
        return false;
    }

    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(bord[j][i]!=0){
                for(var k=0;k<j;k++){

                    if(bord[k][i]==0&&noObsteclet(i,k,j)){
                        //移动
                        $("#shuzi_"+j+"_"+i).animate({
                            top:getdis(k)
                        },200)
                        //数据变化
                        bord[k][i]=bord[j][i];
                        bord[j][i]=0;
                        continue;
                    }else if(bord[k][i]==bord[j][i]&&noObsteclet(i,k,j)&&hasimpact[k][i]){
                        //移动
                        $("#shuzi_"+j+"_"+i).animate({
                            top:getdis(k)
                        },200)
                        //数据变化
                        hasimpact[k][i]=false;
                        bord[k][i]+=bord[j][i];
                        bord[j][i]=0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(bordUpdate,200);
    return true;
}

function toright() {//事件响应右移
    if(!isright()){
        return false;
    }
    for(var i=3;i>=0;i--){
        for(var j=3;j>=0;j--){
            if(bord[i][j]!=0){
                for(var k=3;k>j;k--){

                    if(bord[i][k]==0&&noObstecler(i,k,j)){
                        //移动
                        $("#shuzi_"+i+"_"+j).animate({
                            left:getdis(k)
                        },200)
                        //数据变化
                        bord[i][k]=bord[i][j];
                        bord[i][j]=0;
                        continue;
                    }else if(bord[i][k]==bord[i][j]&&noObstecler(i,k,j)&&hasimpact[i][k]){
                        //移动
                        $("#shuzi_"+i+"_"+j).animate({
                            left:getdis(k)
                        },200)
                        //数据变化
                        hasimpact[i][k]=false;
                        bord[i][k]+=bord[i][j];
                        bord[i][j]=0;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout(bordUpdate,200);
    return true;
}

function todown() {//事件响应下移
    if(!isdown()){
        return false;
    }

    for(var i=3;i>=0;i--){
        for(var j=2;j>=0;j--){
            if(bord[j][i]!=0){
                for(var k=3;k>j;k--){

                    if(bord[k][i]==0&&noObstecled(i,k,j)){
                        //移动
                        $("#shuzi_"+j+"_"+i).animate({
                            top:getdis(k)
                        },200)
                        //数据变化
                        bord[k][i]=bord[j][i];
                        bord[j][i]=0;
                        continue;
                    }else if(bord[k][i]==bord[j][i]&&noObsteclet(i,k,j)&&hasimpact[k][j]){
                        //移动
                        $("#shuzi_"+j+"_"+i).animate({
                            top:getdis(k)
                        },200)
                        //数据变化
                        hasimpact[k][j]=false;
                        bord[k][i]+=bord[j][i];
                        bord[j][i]=0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(bordUpdate,200);
    return true;
}


function isgameover() {
    //console.log(nomove(nospace(bord)));
    if(nospace(bord)&&nomove()){
        console.log(1);
        gameover();
    }
}
function gameover() {
    alert("游戏结束");
}






//support2048
function ForMobile() {
    $(".content").css("width",contentLen);//-2*contentSpace
    $(".content").css("height",contentLen);
    //$(".content").css("padding",contentSpace);

    $(".c_cell").css("width",cellLen);
    $(".c_cell").css("height",cellLen);
}


function getdis(num) {//棋盘初始化函数，计算位置
    return cellSpace+num*(cellLen+cellSpace);
}

function getNumberBackgroundColor(number) {
    switch(number){
        case 1:
            return "#eee4da";
            break;
        case 2:
            return "#ede0c8";
            break;
        case 4:
            return "#f2b178";
            break;
        case 8:
            return "#f59563";
            break;
        case 16:
            return "#f67c5f";
            break;
        case 32:
            return "#f65e3b";
            break;
        case 64:
            return "#edcf72";
            break;
        case 128:
            return "#edcc61";
            break;
        case 256:
            return "#9c0";
            break;
        case 512:
            return "#33b5e5";
            break;
        case 1024:
            return "#09c";
            break;
        case 2048:
            return "#a6c";
            break;
        case 4096:
            return "#93c";
            break;
    }
    return "black";//当没有参数导致switch无法运行，则返回black
}
function getNumberColor(number) {
    if(number<=4){
        return "#333"
    }
    return "white";//当number大于4直接返回白色
}



//left
function isleft() {
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(bord[i][j]!=0){
                if(bord[i][j-1]==0||bord[i][j-1]==bord[i][j]){
                    return true;
                }   
            }
        }
    }
    return false;
}

function noObsteclel(row,cols1,cols2) {
    for(var a=cols1+1;a<cols2;a++){
      if(bord[row][a]!=0){
          return false;
      }
    }
    return true;
}
//top
function isup() {
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(bord[j][i]!=0){
                if(bord[j-1][i]==0||bord[j-1][i]==bord[j][i]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noObsteclet(row,cols1,cols2) {
    for(var a=cols1+1;a<cols2;a++){
        if(bord[a][row]!=0){
            return false;
        }
    }
    return true;
}
//right
function isright() {
    for(var i=3;i>=0;i--){
        for(var j=3;j>=0;j--){
            if(bord[i][j]!=0){
                if(bord[i][j+1]==0||bord[i][j+1]==bord[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noObstecler(row,cols1,cols2) {
    for(var a=cols1-1;a>cols2;a--){
        if(bord[row][a]!=0){
            return false;
        }
    }
    return true;
}

//down
function isdown() {
    for(var i=3;i>=0;i--){
        for(var j=2;j>=0;j--){
            if(bord[j][i]!=0){
                if(bord[j+1][i]==0||bord[j+1][i]==bord[j][i]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noObstecled(row,cols1,cols2) {
    for(var a=cols1-1;a>cols2;a--){
        if(bord[a][row]!=0){
            return false;
        }
    }
    return true;
}
function nomove() {
    if(!isleft()&&!isup()&&!isright()&&!isdown()){
        console.log(isleft());
        console.log(isup());
        console.log(isright());
        console.log(isdown());
        return true;
    }
    return false;
}
function nospace(a) {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(a[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
function updatescore(score) {
    $(".fenshu").text(score);
}






//show animation2048
function donghua(i,j,number) {
    $("#shuzi_"+i+"_"+j).text(number);
    $("#shuzi_"+i+"_"+j).css("background-color",getNumberBackgroundColor(number));
    $("#shuzi_"+i+"_"+j).css("color",getNumberColor(number));
    $("#shuzi_"+i+"_"+j).css("line-height",cellLen+"px");
    $("#shuzi_"+i+"_"+j).animate({
        width:cellLen+"px",
        height:cellLen+"px",
        top:getdis(i),
        left:getdis(j)
    },50)
}