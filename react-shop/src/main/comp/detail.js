import React , {Component} from "react"
import data from "../data/data"
import Error from './error'

class Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            cont:data,
            addnum:1,
            one:true,
            two:false,
            three:false
        }
    }

    togimg=(url)=>{
        this.refs.bigimg.src = require(`../${url}`);
    }
    min = ()=>{
        let {addnum} = this.state;
        addnum = Number(addnum);
        addnum--;
        if(addnum<1)addnum = 1
        this.setState({
            addnum:addnum
        })
    }
    max = ()=>{
        let {cont,addnum} = this.state;
        let {oid} = this.props;
        let pro = cont.find(e=>e.id===Number(oid));
        addnum = Number(addnum);
        addnum++;
        if(addnum>pro.count)addnum = pro.count
        this.setState({
            addnum:addnum
        })
        
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
        let {addnum} = this.state;// 加入购物车的商品数量
        // 获取cookie中的 用户
        let ck = document.cookie.split("; ").find(e=>/^u=/.test(e));
        let user = ck ? ck.split("=")[1].replace(/((^"*)|("*$))|((^\s*)|(\s*$))/g,""):null;
        if(user){
            let {cont} = this.state;
            let {oid,addcart1} = this.props;
            oid = Number(oid);//如果不转换为数字，则存入localstorage中的id值为字符串
            // 获取到id等于oid的商品对象
            let pro = cont.find(e=>e.id===Number(oid));
            // 获取user用户的购物车信息
            let st = localStorage.getItem(user);
            // 获取到的信息为JSON格式，此处转换为js字符串
            st = JSON.parse(st);
            // 如果localstorage中有此用户的商品
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
            let num = 0;
            // 算出 总价格
            carts.forEach(e=>{
                num += Number(e.sum)* Number(e.pri);
            })
            
            addcart1(num);
        }
        else{
            alert("您还没有登录")
        }
    }
    render(){
        let {cont,addnum,one,two,three} = this.state;
        let {oid} = this.props;
        let pro = cont.find(e=>e.id===Number(oid));
        if(!oid) {
            return <Error />
        }
        else{
            
            return(
                <div className="replace">
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
                                <div className="de-top">
                                    <div className="de-t-l">
                                        <div className="img-big">
                                            <img alt="" ref="bigimg"  src={require(`../${pro.preview[0]}`)}/>
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
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                                            </p>
                                        </div>
                                        <div style={{display:two?"block":"none"}}>
                                            <p>222222222222222222222222京东价：京东价为商品的销售价，是您最终决定是否购买商品的依据。
    划线价：商品展示的划横线价格为参考价，并非原价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在京东平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
    折扣：如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。
    异常问题：商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                                            </p>
                                        </div>
                                        <div style={{display:three?"block":"none"}}>
                                            <p>3333333333333333333333333333333京东平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ 
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

export default Detail;