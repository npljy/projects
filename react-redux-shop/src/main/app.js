import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import data from "./data/data";
import users from "./data/user";
import Ad from "./comp/ad";
import Nav from "./comp/nav";
import Home from "./comp/home";
import Sex from "./comp/sex";
import Form from "./comp/form";
import Detail from "./comp/detail";
import Login from "./comp/login";
import Reg from "./comp/reg";
import Foot from "./comp/foot";
import IsLogin from "./comp/islogin";
import NotLogin from "./comp/notlogin";
import Cart from "./comp/cart";
import Forget from "./comp/forget";

class AppR extends Component {
	constructor(props) {
		super(props);
		this.state = {
		cont: data,
		mask: false,
		imgurl: "imgs/pc0.jpg",
		islog: false,
		cart: 0, // 购物车 总价
		pros: 0 // 品类 数量，几种商品
		};
	}
	// 弹出 遮罩层，图片放大
	togmask = id => {
		let { cont } = this.state;
		let oimg = cont.find(e => {
		return e.id === id;
		});
		this.setState({
		mask: true,
		imgurl: oimg.img
		});
	};

	close = () => {
		this.setState({
		mask: false,
		imgurl: "imgs/pc0.jpg"
		});
	};
	logout = () => {
		this.setState({
		islog: false
		});
	};
  	initCart = () => {
		let ck = document.cookie.split("; ").find(e => /^u=/.test(e));
		let user = ck ? ck.split("=")[1] : null;
		let carts = JSON.parse(localStorage.getItem(user));
		let count = 0;
		let num = 0;
		if (carts) {
		carts.forEach(e => {
			num += Number(e.sum);
			count += Number(e.sum) * Number(e.pri);
		});
		}
		this.addcart1(num, count);
	};
	addcart1 = (num, count) => {
		this.setState({
		cart: count,
		pros: num
		});
	};
	clearCart = () => {
		let ck = document.cookie.split("; ").find(e => /^u=/.test(e));
		let user = ck ? ck.split("=")[1] : null;
		let carts = JSON.parse(localStorage.getItem(user));
		// 清空购物车，库存随之改变
		if (carts) {
			carts.forEach(e => {
				data.forEach(el => {
					if (el.id === Number(e.id)) {
						el.send -= Number(e.sum);
					}
				});
			});
		}
		localStorage.removeItem(user);
		this.setState({
			cart: 0,
			pros: 0
		});
	};

	componentDidMount() {
		this.initCart();
		document.documentElement.scrollTop = "0px";
		document.body.scrollTop = "0px";
	}

	newPath = () => {
		let { dispatch } = this.props;
		dispatch({ type: "NEW_PATH" });
		dispatch({type:'ADD_CART'});
		dispatch({type:'IN_NUM'});
	};

	render() {
		let { mask, imgurl, islog, cart, pros } = this.state;
		let ck = document.cookie.split("; ").find(e => /^u=/.test(e));
		let user = ck ? ck.split("=")[1] : null;

		if (user) {
		users.forEach(e => {
				if (e.user === user) {
				islog = true;
				}
			});
		}

		return (
			<div>
				<div className="adcenter clearfix">
				{/* ad ↓ */}
				<Ad />
				{/* ad ↑ */}
				<div className="ad-right">
					<div>
					<Link to="/cart" onClick={this.newPath} >
						<h3>
						<div className="total">
							RMB：<span className="t-count">{cart ? cart : 0}</span>
						</div>
						<img alt="cart" src={require("./imgs/cart.png")} />
						<span className="num">{pros ? pros : 0}</span>
						</h3>
					</Link>
					<p>
						<a onClick={this.clearCart}>清空购物车</a>
					</p>
					</div>
				</div>
				</div>

				{/* head ↓ */}
				<div className="header">
				<div className="container">
					<div className="logo">
					<Link to="/" onClick={this.newPath}>
						<img src={require("./imgs/logo.png")} alt="logo" />
					</Link>
					</div>
				</div>
				<div className="head-top">
					<div className="container">
					<div className="head-top-l clearfix">
						{islog ? (
						<IsLogin logout={this.logout} initCart={this.initCart} />
						) : (
						<NotLogin />
						)}
					</div>
					<div className="head-top-r" />
					</div>
				</div>
				<div className="head-btm">
					<div className="container">
					{/* nav ↓ */}
					<Nav />
					{/* nav ↑ */}
					</div>
				</div>
				</div>
				{/* head ↑ */}
				{/* banner 在 Home 中 */}
				{/* 路由 填充部分 ↓ */}
				<Route
				path="/"
				exact
				render={props => {
					return (
					<Home
						initCart={this.initCart}
						togfn={this.togmask}
						addcart1={this.addcart1}
					/>
					);
				}}
				/>
				<Route
				path="/:name"
				render={props => {
					if (props.match.url === "/contact") return <Form />;
					else if (props.match.url === "/login") {
					// 判断是否有登录的cookie信息，没有则跳转到登录页面
					return <Login initCart={this.initCart} />;
					} else if (props.match.url === "/reg")
					return (
						<Reg
						initCart={this.initCart}
						togfn={this.togmask}
						addcart1={this.addcart1}
						/>
					);
					else if (props.match.url === "/forget") return <Forget />;
					else if (props.match.url === "/cart")
					return <Cart initCart={this.initCart} />;
					else if (props.match.url === "/detail")
					return (
						<Detail
						oid={props.location.search.substring(1).split("=")[1]}
						addcart1={this.addcart1}
						initCart={this.initCart}
						/>
					);
					else
					return (
						<Sex
						initCart={this.initCart}
						sex={props.match.url.substring(1)}
						togfn={this.togmask}
						addcart1={this.addcart1}
						/>
					);
				}}
				/>

				{/* 路由 填充部分 ↑ */}
				{/* list遮罩 ↓ */}
				<div className="mask" style={{ display: mask ? "block" : "none" }}>
				<div>
					{/* 图片初始值为空的话，会导致require报错 */}
					<img alt={`./${imgurl}`} src={require(`./${imgurl}`)} />
					<a className="close" onClick={this.close}>
					X
					</a>
				</div>
				</div>
				{/* list遮罩 ↑ */}

				{/* footer ↓ */}
				<Foot />
				{/* footer ↑ */}
			</div>
		);
	}
}
const App = connect(state => state)(AppR);
export default App;
