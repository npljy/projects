import React , {Component} from "react"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import data from "../data/data"
import users from '../data/user'
import Error from './error'

class DetailR extends Component{
    constructor(props){
        super(props);
        this.state={
            cont:data,
            addnum:1,
            one:true,
            two:false,
            three:false,
            userval:'',
            pwdval:'',
            wrong:false,
            tolog:false
        }
    }
    
    togimg=(url)=>{
        this.refs.bigimg1.src = require(`../${url}`);
        this.refs.bigimg2.src = require(`../${url}`);
    }
    
    togact = (ev)=>{
        if(ev.target.classList.contains('one')){
            this.setState({
                one:true,
                two:false,
                three:false   
            })
        }
        else if(ev.target.classList.contains('two')){
            this.setState({
                one:false,
                two:true,
                three:false   
            })
        }
        else if( ev.target.classList.contains('three')){
            this.setState({
                one:false,
                two:false,
                three:true  
            })

        }
        else{
            this.setState({
                one:true,
                two:false,
                three:false   
            })
        }    
    }
    addcart=()=>{
        let {addnum,cont} = this.state;// 加入购物车的商品数量
        // 获取cookie中的 用户
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1].replace(/((^"*)|("*$))|((^\s*)|(\s*$))/g,""):null;
        if(user){
            this.refs.tips.style.top = 0;
            let _this = this;
            let rest;
            _this.refs.tips.innerText = "成功添加到购物车";
            setTimeout(function(){
                _this.refs.tips.style.transition = "none";
                _this.refs.tips.style.top = "-3em";
                _this.refs.tips.style.transition = ".5s";
            },1000)

            let {oid,addcart1} = this.props;
            oid = Number(oid);//如果不转换为数字，则存入localstorage中的id值为字符串
            // 获取到id等于oid的商品对象
            let pro = cont.find(e=>e.id===Number(oid));
            // 获取user用户的购物车信息
            let st = localStorage.getItem(user);
            // 获取到的信息为JSON格式，此处转换为js字符串
            st = JSON.parse(st);
            // 如果localstorage中有此用户的商品
            cont.forEach(e=>{
                if(e.id === oid ){
                    if(e.send < e.count){
                        rest = e.count-e.send;
                        e.send += addnum;
                    }
                    else rest = 0;
                }
            })
            if(rest !== 0){
                if(st){
                    let idx = st.findIndex(es=>{
                        return Number(es.id) === Number(oid)
                    });
                    // 如果有这个商品
                    if(idx > -1){
                        let obj = {id:oid,sum:(addnum+st[idx].sum),pri:pro.sale}
                        st.splice(idx,1,obj)
                    }
                    // 没有这个商品
                    else{
                        st.push({id:oid,sum:addnum,pri:pro.sale}); 
                    }

                    localStorage.setItem(user,JSON.stringify(st));
                }
                // 如果localstorage中没有此用户的商品
                else{
                    localStorage.setItem(user,JSON.stringify([{id:oid,sum:addnum,pri:pro.sale}]));
                }
            
                let carts =JSON.parse( localStorage.getItem(user) );
                let count = 0;
                let num = 0;
                // 算出 总价格
                carts.forEach(e=>{
                    num += Number(e.sum);
                    count += Number(e.sum)* Number(e.pri);
                })
                
                addcart1(num,count);
            }
            else{
                _this.refs.tips.innerText = "该商品已售完";
            }
        }
        else{
            this.setState({
                tolog:true
            })
        }
    }

    move = (ev)=>{
        this.refs.mask.style.display = "block";
        let ls = (ev.pageX-this.refs.gettop.offsetLeft-16)/ev.target.offsetWidth;
        let ts = (ev.pageY-this.refs.gettop.offsetTop-193)/ev.target.offsetHeight;
        let maskWidth = this.refs.maskdiv.offsetWidth;
        let maskHeight = this.refs.maskdiv.offsetHeight;
        this.refs.maskdiv.style.left = -(maskWidth-432) * ls + "px";
        this.refs.maskdiv.style.top = -(maskHeight-500) * ts + "px";
    }
    out=()=>{
        this.refs.mask.style.display = "none";
    }

    // 
    toTop =()=>{
        let { dispatch } = this.props;
        dispatch({ type: "NEW_PATH" });
        document.documentElement.scrollTop = "0";
        document.body.scrollTop = "0";  
    }
    // 登录
    username=(ev)=>{
        this.setState({
            userval:ev.target.value
        })
    }
    password=(ev)=>{
        this.setState({
            pwdval:ev.target.value
        })
    }
    login = ()=>{
        let {userval,pwdval} = this.state;
        let {initCart} = this.props;
        let onoff = false; //false代表默认没登陆
        users.forEach(e=>{
            if(e.user === userval){//如果用户名正确
                if(e.pwd === pwdval){//如果密码正确
                    onoff = true;//true代登录成功
                    return;
                }
            }
        })
        // 如果登录验证成功
        if(onoff){
            let { dispatch } = this.props;
            dispatch({ type: "NEW_PATH" });
            // 登录成功，写入cookie
            let t = new Date();
            t.setDate(t.getDate()+1);
            document.cookie = 'u='+userval+';expires='+t;
            initCart(); // 初始化购物车
 
            this.setState({
                userval:'',
                pwdval:'',
                wrong:false,
                tolog:false
            })
        }
        else{
            this.setState({
                wrong:true
            })
        }
    }
    tologin=()=>{
        this.setState({
            tolog:true
        })
    }
    closeLogin = ()=>{
        this.setState({
            tolog:false
        })
    }

    min = ()=>{
        let {addnum} = this.state;
        let {oid,dispatch, cartreducer,addreducer:{add}} = this.props;
        if(add){
            cartreducer.forEach(e=>{
                if(e.id === Number(oid))addnum = e.sum;
            })
        }
        dispatch({type:'ADD_NUM'});
        addnum = Number(addnum);
        addnum--;
        if(addnum < 0)addnum = 0;
        this.setState({
            addnum:addnum
        })
    }
    max = ()=>{
        let {cont,addnum} = this.state;
        let {oid,dispatch, cartreducer,addreducer:{add}} = this.props;
        if(add){
            cartreducer.forEach(e=>{
                if(e.id === Number(oid))addnum = e.sum;
            })
        }
        dispatch({type:'ADD_NUM'});
        let pro = cont.find(e=>e.id===Number(oid));
        addnum = Number(addnum);
        addnum++;
        if(addnum>pro.count-pro.send)addnum = pro.count-pro.send;
        this.setState({
            addnum:addnum
        })
        
    }

    componentWillMount(){
        let { dispatch } = this.props;
        dispatch({ type: "ADD_CART" });
    }

    componentDidMount(){
        let {cont} = this.state;
        let {oid} = this.props;
        cont.forEach(e=>{
            if(e.id === Number(oid)){
                if(e.count===e.send){
                    this.setState({
                        addnum:0
                    })
                }
            }
        })
    }

    render(){
        
        let {cont,addnum,one,two,three,tolog,userval,pwdval,wrong} = this.state;
        let {oid,cartreducer,addreducer:{add}} = this.props; //获取store中的addreducer中的add
        let pro = cont.find(e=>e.id===Number(oid));
        // 如果add为真，则说明从购物车跳过来的，则详情页中物品数量改为购物车中的数量
        if(add){
            cartreducer.forEach(e=>{
                if(e.id === Number(oid))addnum = e.sum;
            })
        }
        if(!oid) {
            return <Error />
        }
        else{
            return(
                <div className="replace login">
                    <div id="tologin" className="tologin" ref="tologin" 
                        style={{display:tolog?"block":"none"}}
                    ></div>
                    <div className="logindiv" style={{display:tolog?"block":"none"}}>
                        <div className="close"
                            onClick ={this.closeLogin}
                        >X</div>
                        <ul>
                            <li><input placeholder="请输入用户名"
                                value = {userval}
                                onChange = {this.username}
                            /></li>
                            <li><input placeholder="请输入密码"
                                value = {pwdval}
                                onChange = {this.password}
                            /></li>
                        </ul>
                        <div className="sure">
                            <span
                                onClick = {this.login}
                            >登 录</span>
                            <strong className="wrong" ref="wrong" style={{display:wrong?"inline-block":"none"}}>帐号或密码错误</strong>
                            <Link to="/forget" onClick={this.toTop}>忘记密码</Link>
                            <Link to="/reg" onClick={this.toTop}>免费注册</Link>
                        </div>
                    </div>
                    <div id="tips" ref="tips">成功添加到购物车</div>
                    <div className="l-banner">
                        <div className="container">
                            <h2>商品详情</h2>
                            <label></label>
                            <h3>商品详情</h3>
                        </div>
                    </div>
                    <div className="w-mid cont-mid">
                        <div className="container clearfix">
                            <div className="w-mid-l clearfix">
                                <div className="de-top" ref="gettop">
                                    <div className="de-t-l">
                                        <div className="img-big">
                                            <img alt="" 
                                                ref="bigimg1"  
                                                src={require(`../${pro.preview[0]}`)}
                                                onMouseMove = {this.move}
                                                onMouseOut = {this.out}
                                            />
                                        </div>
                                        <div id="mask" ref="mask">
                                            <div ref="maskdiv">
                                                <img alt="" ref="bigimg2" src={require(`../${pro.preview[0]}`)}/>
                                            </div>
                                        </div>
                                        <div className="img-small clearfix">
                                            <ul>
                                                <li 
                                                    onClick = {this.togimg.bind(this,pro.preview[0])}
                                                >
                                                    <img  alt="" src={require(`../${pro.preview[0]}`)}/>
                                                </li>
                                                <li
                                                    onClick = {this.togimg.bind(this,pro.preview[1])}
                                                >
                                                    <img  alt="" src={require(`../${pro.preview[1]}`)}/>
                                                </li>
                                                <li
                                                    onClick = {this.togimg.bind(this,pro.preview[2])}
                                                >
                                                    <img  alt="" src={require(`../${pro.preview[2]}`)}/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="de-t-r">
                                        <h3>{pro.title}</h3>
                                        <p className="de-jj">{pro.abs}</p>
                                        <div className="de-sale">
                                            <span>RMB：{pro.sale}</span>
                                        </div>
                                        <h4>商品介绍</h4>
                                        <div className="div-ms">
                                            <p className="de-ms">{pro.desc}</p>
                                        </div>
                                        <div className="addpro clearfix">
                                            <div className="quantity">
                                                <div className="addmin"
                                                    onClick={this.min}
                                                ></div>
                                                <div className="enval" ref="num">{addnum}</div>
                                                <div className="addmax"
                                                    onClick={this.max}
                                                ></div>
                                            </div>
                                            <a className="addcart"
                                                onClick = {this.addcart}
                                            >加入购物车</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="de-btm">
                                    <div className="nav-sidebar">
                                        <ul
                                            onClick = {this.togact}
                                        >
                                            <li className={one?"one act":"one"} >产 品 介 绍</li>
                                            <li className={two?"two act":"two"}>包 装 清 单</li>
                                            <li className={three?"three act":"three"}>售 后 保 障</li>
                                        </ul>
                                    </div>
                                    <div className="tab-content">
                                        <div style={{display:one?"block":"none"}}>
                                            <p>1111111111111111111111111凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                                            </p>
                                        </div>
                                        <div style={{display:two?"block":"none"}}>
                                            <p>222222222222222222222222京东价：京东价为商品的销售价，是您最终决定是否购买商品的依据。
    折扣：如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                                            </p>
                                        </div>
                                        <div style={{display:three?"block":"none"}}>
                                            <p>3333333333333333333333333333333京东平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="w-mid-r"></div>
                        </div>
                    </div>
                </div>
            )


        }
    }
}
const Detail = connect(state=>state)(DetailR);
export default Detail;