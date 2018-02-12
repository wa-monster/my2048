/**
 * Created by 杨阳阳 on 2018/1/28.
 */
var bord=new Array();
var score=0;
$(document).ready(function () {
        newgame();
    $(document).keydown(function (event) {
        console.log(event.keyCode);
        if(event.keyCode==37){

        }
    })
    $(".newgame").mousedown(function () {
        newgame();
    })
    }
);

function newgame() {
    //初始化棋盘
    //初始化数字
    init();
    //监听事件
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
        for(var j=0;j<4;j++){
            bord[i][j]=0;
        }
    }
    //ok();
    bordUpdate();
}
function getdis(num) {//棋盘初始化函数，计算位置
    return 20+num*120;
}
function bordUpdate() {
    $(".shuzi").remove();
    var a1=Math.floor(Math.random()*4);
    var a2=Math.floor(Math.random()*4);
    var b1=Math.floor(Math.random()*4);
    var b2=Math.floor(Math.random()*4);
    console.log(a1);
    console.log(a2);
    console.log(b1);
    console.log(b2);
    while (true){
        if(b1==a1&&b2==a2){
            b1=Math.floor(Math.random()*4);
            b2=Math.floor(Math.random()*4);
        }else{
            break;
        }
    }
    bord[a1][a2]=Math.random()<0.5?2:4;
    bord[b1][b2]=Math.random()<0.5?2:4;
   ok();
}
function ok() {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var div="<div class='shuzi' id='shuzi_"+i+"_"+j+"'></div>";
            $(".content").append(div);
            $("#shuzi_"+i+"_"+j).text(bord[i][j]);
            var shuzi=$("#shuzi_"+i+"_"+j);
            shuzi.css("position","absolute");
            if(shuzi.text()==0){
                shuzi.css("display","none");
                shuzi.css("width",0);
                shuzi.css("height",0);
                shuzi.css("top",getdis(i)+50);
                shuzi.css("left",getdis(j)+50);
            }else{
                shuzi.css("text-align","center");
                shuzi.css("line-height","100px");
                shuzi.css("display","block");
                shuzi.css("width",100);
                shuzi.css("height",100);
                shuzi.css("left",getdis(i));
                shuzi.css("top",getdis(j));
                shuzi.css("background-color","red");
            }
        }
    }
}