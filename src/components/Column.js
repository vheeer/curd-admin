import React from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';
import { getDiff } from '../utils/mini_utils';
import SingleImgUploader from './mini_components/SingleImgUploader';
import styles from './OrderCollectionsPage.css';
import config from '../config';
const { TextArea } = Input;
const FormItem = Form.Item;

const GoodsCollectionCreateForm = Form.create({
  onFieldsChange(props, changedFields) {

  },
  mapPropsToFields(props) {
    const { editGoodsObj, columnMatch } = props;

    /*** 表单值生成 ***/
    //填值函数
    const KV = (key, value) => {
      fieldsObj[key] = Form.createFormField({
        value
      });
    }

    KV(key, editGoodsObj[key]);
    
    return fieldsObj;
})(
  class extends React.Component {
  	constructor(props){
  		super(props);
      this.state = {

      }
  	}
    render() {
      const { editGoodsObj, visible, onCancel, onCreate, form, columnMatch, model } = this.props;
      const { getFieldDecorator } = form;

          fieldsHTML.push((
            <FormItem
              key={key}
              label={columnMatch[key][0]}
            >
              {getFieldDecorator(key, {
                rules: [{ required: true, message: '' }],
              })(
                <Input disabled />
              )}
            </FormItem>
          ));
    }
);

export default class GoodsCollectionsPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		};
	}
  showModal = (event) => {
    this.setState({
      visible: true
    });
  }
  handleCancel = () => {
      this.setState({ 
        visible: false
      });
  }
  handleCreate = () => {
    const props = this.formRef.props;
    const form = props.form;
    const { dispatch, model, currentPage } = props;
    form.validateFields((err, values) => {
      if(err){
        return;
      }
      //提取修改过的表单域
      const newValues = Object.assign({}, values);
      for(let key in values)
      {
      	if(key === "id")
      		continue;
      	if(!form.isFieldTouched(key))
      		delete newValues[key];
      }
      //提交修改的信息
      if(Object.keys(newValues).length > 1) {
        dispatch(Object.assign({ type: model + '/updateData' }, newValues));
      }
      //重新拉取信息
      dispatch({
        type: model + '/readData',
        page: currentPage
      })
      //防止提交后表单值立即重新渲染为修改前数据
      dispatch({
        type: model + '/changeDataValues',
        values: newValues
      })
      //关闭
      this.setState({ 
        visible: false
      });
    });

  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  shouldComponentUpdate(nextProps, nextState) {
    //获取DIFF
    const diffState = getDiff(nextState, this.state);
    //不重新渲染条件
    const result = diffState.indexOf("visible") === -1;

    if(result)
      return false;
    else
      return true;
  }
  render() {
    return (
      <span>
        <a onClick={this.showModal}>
          编辑
        </a>
        <GoodsCollectionCreateForm
          {...this.props}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </span>
    );
  }
}