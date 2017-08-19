/**
 * Created by luyun on 2017/8/15.
 */
$(function(){
    //首页菜单动态渲染
    getIndexMenu();

    getDissale();

    clickMore();

    backTop();
})

//首页菜单动态渲染
function getIndexMenu(){
    $.ajax({
        url:url + "api/getindexmenu",
        success: function(result){
            //准备模板
            //绑定数据和模板
            console.log(result);
            var indexMenuHtml = template('indexMenuTpl',result);

            $('#menu .row').html(indexMenuHtml);
        }
    })
}
//首页折扣列表
function getDissale(){
    $.ajax({
        url:url+"api/getmoneyctrl",
        success: function(data){
            var html = template('indexDissaleTpl',{data:data.result});
            $('#dissale .dissaleList').html(html);
        }
    })
}

//点击菜单中的更多隐藏下面菜单
function clickMore(){
    $('#menu .row').on('click',$('#menu .row:nth-child(8)'),function(){
        $('#menu .item:nth-last-child(-n+4)').toggle();
    })
}

//点击底部登录返回顶部
function backTop(){
    $('.width40').on('click',function(){
        //console.log(123);
        $('html body').animate({scrollTop:0},100,'linear');
        return false;
    })
}