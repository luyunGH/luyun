/**
 * Created by luyun on 2017/8/18.
 */

/*入口函数*/
$(function () {
    //1
    //console.log(getRequest().category);
    $('#plisttitle').html(getRequest().category);
    //2渲染产品列表
    var plisttitleid = getRequest().categoryid;
    var pageid = 1;
    var totalSize = 100;
    getplist(plisttitleid, pageid,totalSize);
    backTop();
})


function getplist(plisttitleid, pageid,totalSize) {
    $.ajax({
        url: url + 'api/getproductlist',
        data: {
            "categoryid": plisttitleid,
            "pageid": pageid
        },
        success: function (data) {
            console.log(data);
            var plisthtml = template('productlistTpl', {data: data.result})
            $('#productContent').html(plisthtml);
            //页数操作处理
            //获取每类产品显示在页面的总页数
            totalSize = Math.ceil(data.totalCount / data.pagesize)
            /*定义空字符串*/
            var str = "";
            /*循环总页数 根据总页数渲染下拉框的个数*/
            for (var i = 1; i <= totalSize; i++) {
                //option中的value属性是数据发送服务器时需用的值
                str+='<option value='+i+'>'+i+'</option><br/>';
            }
            /*将拼接好的下拉框放到select中*/
            $('#productListSelect').html(str);
            $('#productListSelect option').each(function(i,item){
                if((i+1) === pageid){
                    $(item).attr('selected','selected');
                }
            })
        },
        complete:function(){
            $('#btnPre').click(function(){
                console.log(111);
                if(pageid === 1) return false;
                pageid--;
                console.log(pageid);
                getplist(plisttitleid,pageid);
            })
            $('#btnNext').unbind('click').click(function(){
                if(pageid === totalSize)return false;
                pageid++;
                console.log(pageid);
                getplist(plisttitleid,pageid);
            })
        }
    })
}

function backTop(){
    $('.width40').click(function(){
        $('html,body').animate({scrollTop:0},0,'linear');
        return false;
    })
}

//获取地址栏内容
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
}