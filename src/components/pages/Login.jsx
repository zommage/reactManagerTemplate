import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { fetchData, receiveData } from '@/action';
import {userLogin} from '../../axios/users';
import {createToken} from '../../axios';

const FormItem = Form.Item;

class Login extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }

    componentWillReceiveProps(nextProps) {
        //const { auth: nextAuth = {} } = nextProps;
        // console.log("next props==========", nextAuth)
        //
        // const { history } = this.props;
        // if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
        //     localStorage.setItem('user', JSON.stringify(nextAuth.data));
        //     history.push('/');
        // }

        //console.log("nextProps==========", nextProps)

        // token 是否存在
        // let user = localStorage.getItem("user")
        // if(user == '' || user == null) {
        //     console.log("user not exist----------")
        //     localStorage.setItem('user', JSON.stringify(nextAuth.data));
        //     // 跳转到主页面
        //     this.props.history.push({
        //         pathname: '/app/dashboard/index',
        //     })
        // }
    }

    // 用户登录
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let userInfo = {
                    user: values.userName,
                    pwd: values.password,
                }
                // 生成 token
                let tokenStr = createToken(userInfo)
                let loginReq = {
                    token: tokenStr,
                }


                // 用户登录发送请求
                userLogin(loginReq).then((resp) => {
                    let userData = {
                        user: values.userName,
                        role: resp.data.data.role,
                        token: resp.data.data.token,
                    }

                    // 将用户信息存到本地
                    localStorage.setItem('user', JSON.stringify(userData));

                    // 跳转到主页面
                    this.props.history.push({
                        pathname: '/app/dashboard/index',
                    })

                }).catch((error) => {
                    message.error("用户登录失败")
                    console.log("==========user login err:", error)
                });
            }
        });
    };

    // 只包含数字和字母横杠下划线
    LetterNumLine = (rule, value='', callback) => {
        if (value.length > 16) {
            callback("数据过长,应少于16");
            return;
        }
        let reg = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/
        if(!reg.test(value)){
            //console.log("invalid-----------")
            callback("输入的字符不是数字或者字母");
            return;
        }
        callback();
        return;
    }

    PwdCheck = (rule, value='', callback) => {
        // 密码需要同时包含数字和字母, 且长度需要大于6小于20
        let reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,20}$/
        if(!reg.test(value)){
            //console.log("invalid-----------")
            callback("需要同时包含数字和字母,长度6-20");
            return;
        }

        callback();
        return;
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' },
                                    {
                                        validator: this.LetterNumLine,
                                    }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' },
                                    {
                                        validator: this.PwdCheck,
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));