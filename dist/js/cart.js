
let theDT = $.cookie("cartDatas");
class Cart {
    constructor(theDT) {
        if (theDT) {
            this.theDT = theDT
        } else {
            this.theDT = {};
        }
    }
    saveData(id, num, ter) {
        if (this.theDT[id] && ter) {
            this.theDT[id] += Number(num);
        } else {
            this.theDT[id] = Number(num);
        }
        $.cookie("theDT", this.theDT, { expires: 7 });
    }

    show(id) {
        // 这里是详情页的数据
        $(".checkAll").on("click", function () {
            $(this).prop("checked") = $(".licheck").prop("checked");
        })
    }
}
//商品id  购买的数量num  累加值或者最终值 ter 为true时表示累加值
Cart.prototype.saveData = function (id, num, ter) {
    if (this.cartData[id] && ter) {
        //列表页点击购物车按钮 详情页点击购物车按钮 这些数量是在原来的基础上进行累加的
        this.cartData[id] += Number(num); //加Number是为了将传过来的文本框的值变成字符串，以免进行拼接
    } else {
        //第一次加入购物车 和 在购物车列表页修改数量  这些值是最终值，直接赋值即可
        this.cartData[id] = Number(num);
    }

    localStorage.setItem("cartDatas", JSON.stringify(this.cartData)); //任何购物车数据的变化都要体现在localStorage中

}

//DOM结构的id 用于展示购物车数据列表的ul的id
Cart.prototype.show = function (id) {
    //购物车列表展示的DOM结构
    this.oCartList = document.getElementById(id);
    //从本地取到商品数据，因为购物车列表的里的一些属性在商品数据列表中
    let productDatas = JSON.parse(localStorage.getItem("productDatas"));
    let str = "";
    //购物车列表的拼接展示
    for (let id in this.cartData) {
        str += `<li data-id="${id}" class="list">
        <input type="checkbox" class="ck">
        <img src="${productDatas[id].imgsrc}">
        <span>${productDatas[id].title}</span>
        <span class="price">${productDatas[id].price}</span>
        <span class="minus">-</span><input type="text" value="${this.cartData[id]}" class="num"><span class="plus">+</span>
        <span class="prices">${this.cartData[id] * productDatas[id].price}</span>
        <span class="delBtn">删除</span>
        </li>`;

        this.oCartList.innerHTML = str;
    }
    //取到需要操作的DOM节点，由于有些节点要在其他原型方法里使用，避免访问不到，当成实例属性来处理
    let oCheckAll = document.getElementById("checkAll"); //全选复选框
    this.aList = document.querySelectorAll(".list"); // 列表
    this.aCk = document.querySelectorAll(".ck"); //列表里的单个复选框结合
    this.aMinus = document.querySelectorAll(".minus"); //减号
    this.aPlus = document.querySelectorAll(".plus"); //加号
    this.aPrice = document.querySelectorAll(".price"); //单价
    this.aNum = document.querySelectorAll(".num"); //数量
    this.aPrices = document.querySelectorAll(".prices"); //单种商品总价
    this.aDelBtn = document.querySelectorAll(".delBtn"); //删除按钮

    //全选  不全选
    oCheckAll.onclick = () => {
        //所有单个复选框的状态和checkAll的状态一致
        for (let i = 0; i < this.aCk.length; i++) {
            this.aCk[i].checked = oCheckAll.checked;
        }
        this.getTotalPrice(); //点击全选复选框需要展示总价
    }

    for (let i = 0; i < this.aList.length; i++) {
        //复选 点击单个复选框时，判断选中的数量和实际复选框的数量是否相同，如果相同，让全选复选框选中
        this.aCk[i].onclick = () => {
            let count = 0; //计数用的，默认为0，每次点击时，重新开始计算
            for (let j = 0; j < this.aCk.length; j++) {
                if (this.aCk[j].checked) { //只要有选中的计数器+1
                    count++;
                }
            };

            if (count === this.aCk.length) { //判断选中的数量和实际数量是否相同
                oCheckAll.checked = true;
            } else {
                oCheckAll.checked = false;
            }

            this.getTotalPrice(); //这个操作也需要更新总价

        }
        //减
        this.aMinus[i].onclick = () => {
            if (this.aNum[i].value <= 1) { //临界值限制，不能小于1
                this.aNum[i].value = 1;
            } else {
                this.aNum[i].value--;
            }
            this.update(i); //更新单种商品总价和所有商品总价
        }

        //改
        this.aNum[i].oninput = () => {
            this.update(i); //更新单种商品总价和所有商品总价
        }

        //加

        this.aPlus[i].onclick = () => {
            this.aNum[i].value++;
            this.update(i); //更新单种商品总价和所有商品总价
        }
        //删
        this.aDelBtn[i].onclick = () => {
            let id = this.aList[i].getAttribute("data-id");
            this.delData(id, i); //id指的是商品id ，i 对应的点击的那个删除按钮的索引
        }

    }

}
//更新购物车及单个总价
Cart.prototype.update = function (i) { //i 指的操作DOM节点的索引
    let id = this.aList[i].getAttribute("data-id"); //取到对应的商品id
    this.saveData(id, this.aNum[i].value, false); //更新购物车中对应商品的数据
    this.aPrices[i].innerText = this.aNum[i].value * this.aPrice[i].innerText; //更新单种商品总价
    this.getTotalPrice(); //更新总价
}

//删除购物车

Cart.prototype.delData = function (id, i) {
    //数据
    delete this.cartData[id]; //这是删除一个对象属性的方法 ， 删除商品实际上就是将某个属性从thiscartData里删掉
    localStorage.setItem("cartDatas", JSON.stringify(this.cartData)); //删完之后立即更新本地数据，避免刷新还会出现
    //DOM节点
    this.oCartList.removeChild(this.aList[i]); //移除节点，但使用query方式获取的节点列表在移除其中节点后，长度并未发生改变
    this.aCk[i].checked = false; //所以将移除的节点对应的复选框置为false，这样在计算总价时，不计算在内


    this.getTotalPrice();

}

//取总价
Cart.prototype.getTotalPrice = function () {
    let totalPrice = document.getElementById("totalPrice"); //存放总价的DOM结构
    let total = 0;
    for (let i = 0; i < this.aCk.length; i++) { //找到所有选中的商品，将单种商品总价累加即可得到所有商品总价

        if (this.aCk[i].checked) {
            total += Number(this.aPrices[i].innerText); //字符串转数值
        }
    };
    totalPrice.innerText = total; //将和放到DOM结构中
}
