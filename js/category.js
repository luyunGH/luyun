/**
 * Created by luyun on 2017/8/16.
 */

$(function(){
    getCategoryTitle();
    bindClick();
})
//异步渲染title
function getCategoryTitle(){
    $.ajax({
        url:url+'api/getcategorytitle',
        success:function(result){
            console.log(result);
            var html = template('categoryTitleTpl',result);
            $('#categoryMenuUU').html(html);
        }
    })
}

//异步渲染分类列表
function bindClick(){
    $('#categoryMenuUU').off('click').on('click','.categoryTitle',function(){
        var tid = parseInt($(this).attr('titleId'));
        $.ajax({
            url:url+'api/getcategory',
            data:{titleid : tid},
            success:function(result){
                console.log(result);
                var html = template('categoryListTpl',result);
                $('.categoryList'+tid).html(html);
            },
            complete:function(){
                $('.categoryList').hide();
                $('.categoryList'+tid).show();

            }
        })
    })
}
