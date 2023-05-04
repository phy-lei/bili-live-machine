import { Form, Input } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import AtomTitle from '../AtomTitle/AtomTitle';

const FormItem = Form.Item;

const BaseSetting = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const save = () => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', form.getFields());
    navigate('/danmaku');
  };

  return (
    <AtomTitle title="基础设置" saveHandle={save}>
      <Form style={{ maxWidth: 600 }} autoComplete="off" layout="vertical" form={form}>
        <FormItem
          label="up uid"
          field="uid"
          tooltip={<div>up uid is required </div>}
          rules={[{ required: true }]}
        >
          <Input style={{ width: 270 }} placeholder="please enter your name" />
        </FormItem>
      </Form>
    </AtomTitle>
  );
};

export default BaseSetting;
