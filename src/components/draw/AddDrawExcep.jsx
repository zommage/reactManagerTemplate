import React, { Component } from 'react';
import { Card, Form, Input, Select, Row, Col, Button, Modal, DatePicker, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {DrawExcepAddFunc} from '../../axios/draw';

const FormItem = Form.Item;
const Option = Select.Option;
const TypeOption = Select.Option;
const { TextArea } = Input
const confirm = Modal.confirm;

class DrawExcepAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                let d = new Date(Date.parse(fieldsValue['drawDate'].format('YYYY-MM-DD HH:mm:ss').replace(/-/g, "/")))
                let tmpTimestamp = Date.parse(d)/1000
                let params = {
                    code: fieldsValue.code,
                    issueNo: fieldsValue.issueNo,
                    drawTime: tmpTimestamp,
                    manualStatus: Number(fieldsValue.manualStatus),
                    describe: fieldsValue.describe,
                }

                // 在 confirm 的 onOk 中调用 this.adjustDrawIssueEdit 需要在外部声明
                const drawExcepAdd = this.drawExcepAdd
                confirm({
                    title: '确认是否提交?',
                    onOk() {
                        drawExcepAdd(params)
                    },
                    onCancel() {
                    },
                });
            }
        });
    };

    // 发送开奖异常编辑请求
    drawExcepAdd = (params = {}) => {
        this.setState({ loading: true });
        // 获取开奖异常列表
        DrawExcepAddFunc(params).then((res) => {
            message.success("新增订单成功")
            this.setState({
                loading: false,
            });
        }).catch((error) => {
            message.error("新增订单失败")
            this.setState({ loading: false });
        });
    }

    // 只包含数字和字母
    LetterNum = (rule, value='', callback) => {
        if (value.length > 32) {
            callback("数据过长,应少于32");
            return;
        }
        let reg = /^[0-9a-zA-Z]+$/
        if(!reg.test(value)){
            callback("你输入的字符不是数字或者字母");
            return;
        }
        callback();
        return;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const detailFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 32 },
                sm: { span: 32, offset: 4, },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="订单" second="新建订单异常" />
                <Row gutter={24}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="新建订单异常" bordered={false} >
                                <Form onSubmit={this.handleSubmit} style={{float: 'left', marginTop: 20, width: 500}} >
                                    <FormItem
                                        {...formItemLayout}
                                        label="选择订单类型"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('code', {
                                            rules: [
                                                { required: true, message: 'Please select lottery!' },
                                            ],
                                        })(
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="选择订单"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >

                                                <Option value="111111">支付订单</Option>
                                                <Option value="222222">购买订单</Option>
                                                <Option value="333333">出货订单</Option>
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="输入订单号"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('issueNo', {
                                            rules: [{
                                                required: true, message: '请输入合理期号',
                                            },{
                                                validator: this.LetterNum,
                                            }],
                                        })(
                                            <Input placeholder="请输入合理期号" />
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="下单时间: "
                                    >
                                        {getFieldDecorator('drawDate', config)(
                                            <DatePicker
                                                showTime
                                                style={{width: 335}}
                                                placeholder="Please Select Time"
                                                format="YYYY-MM-DD HH:mm:ss"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="异常类型"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('manualStatus', {
                                            rules: [
                                                { required: true, message: 'Please select type!' },
                                            ],
                                        })(
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="选择异常类型"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <TypeOption value="1">未处理</TypeOption>
                                                <TypeOption value="2">异常预警</TypeOption>
                                                <TypeOption value="3">24小时成功处理</TypeOption>
                                                <TypeOption value="4">已超时</TypeOption>
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...detailFormItemLayout}
                                        label="详细信息"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('describe', {
                                        })(
                                            <TextArea
                                                rows={8}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary"
                                                htmlType="submit"
                                                size="large"
                                                style={{backgroundColor: "#1890ff", borderColor: "#1890ff"}}
                                        >
                                            提交
                                        </Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const FormDrawExcepAdd = Form.create()(DrawExcepAdd);

export default FormDrawExcepAdd;