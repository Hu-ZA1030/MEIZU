$(function() {
    // 全选和单选
    $("#check").check($("#account-list").find("input[type=checkbox]"));
    $(".check").find("input").check($("#account-list").find("input[type=checkbox]"));
    // 点击复选框时候，我们调用函数，计算价格
    $(":checkbox").click(function() {
        totalMoney();
    })

    // 点击+ 按钮
    $(".addBtn").click(function() {
        console.log($(this))
            // 先拿到到单价，数量， 计算金额
            // 数量
        let count = parseInt($(this).prev().val()); // 同级的前一个兄弟元素
        count++;
        $(this).prev().val(count);
        // 单价
        let price = parseFloat($(this).parent().prev().find("p").html());
        console.log(price);

        // 计算金额
        let money = price * count;
        $(this).parent().next().find("span").html(money);

        // 总金额
        totalMoney()
    })

    // 点击 - 按钮
    $(".reduceBtn").click(function() {
        console.log($(this))
            // 先拿到到单价，数量， 计算金额
            // 数量
        let count = parseInt($(this).next().val()); // 同级的前一个兄弟元素
        count--;
        if (count < 1) {
            count = 1;
        }
        $(this).next().val(count);
        // 单价
        let price = parseFloat($(this).parent().prev().find("p").html());
        console.log(price);

        // 计算金额
        let money = price * count;
        $(this).parent().next().find("span").html(money);

        // 总金额
        totalMoney()
    })

    // 删除
    let $delList = $(".del");
    console.log($delList)
    $delList.each(function() {
        $(this).click(function() {
            if (confirm("您确定要移出此件商品？？")) {
                $(this).parent().parent().remove()
                totalMoney()
            }

        })
    });



})






// 计算总金额
function totalMoney() {
    let money = 0;
    let $tr = $("#account-list tbody").children(); // 获取所有的商品列表
    // 循环所有的商品tr
    $tr.each(function() {
        // 判断复选框是否选中   
        let iptbool = $(this).find('td').eq(0).find(":checkbox").prop("checked");
        if (iptbool) {
            money += parseFloat($(this).find("td").eq(3).find("span").html());
            console.log(money);
        }
    })
    $("#Toprice").html(money);
    // console.log(money)
}