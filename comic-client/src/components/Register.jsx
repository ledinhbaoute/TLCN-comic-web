import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";

const Register = () => {
    const imgBgUrl = `${process.env.PUBLIC_URL}images/normal-breadcrumb.jpg`

    return (
        <div>
            {/* <!-- Normal Breadcrumb Begin --> */}
    <section class="normal-breadcrumb set-bg" style={{ backgroundImage: `url(${imgBgUrl})`}}>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="normal__breadcrumb__text">
                        <h2>Đăng ký</h2>
                        <p>Chào mừng đến với BQComic</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Normal Breadcrumb End --> */}

    {/* <!-- Signup Section Begin --> */}
    <section class="signup spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="login__form">
                        <h3>Đăng ký</h3>
                        <form action="#">
                            <div class="input__item">
                                <input type="text" placeholder="Email address"/>
                                <span class="icon_mail"></span>
                            </div>
                            <div class="input__item">
                                <input type="text" placeholder="Your Name"/>
                                <span class="icon_profile"></span>
                            </div>
                            <div class="input__item">
                                <input type="text" placeholder="Password"/>
                                <span class="icon_lock"></span>
                            </div>
                            <button type="submit" class="site-btn">Login Now</button>
                        </form>
                        <h5>Đã có tài khoản? <Link to='../login'> <a>Đăng nhập!</a> </Link></h5>
                    </div>
                </div>
                {/* <div class="col-lg-6">
                    <div class="login__social__links">
                        <h3>Login With:</h3>
                        <ul>
                            <li><a href="#" class="facebook"><i class="fa fa-facebook"></i> Sign in With Facebook</a>
                            </li>
                            <li><a href="#" class="google"><i class="fa fa-google"></i> Sign in With Google</a></li>
                            <li><a href="#" class="twitter"><i class="fa fa-twitter"></i> Sign in With Twitter</a></li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </div>
    </section>
    {/* <!-- Signup Section End --> */}
        </div>
    );
};

export default Register;