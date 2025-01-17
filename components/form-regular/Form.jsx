import Link from "next/link";
import { Form, Input, Select, Button, Checkbox, Icon } from "antd";
import { tailFormItemLayout, formItemLayout } from "components";

const { Option } = Select;

export default function CustomForm({
  form,
  profile,
  methods,
  loginForm,
  registerForm,
  defaultValue,
  compareToFirstPassword,
  validateToNextPassword
}) {
  const { getFieldDecorator } = form;
  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "62"
  })(
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  const formToRender = [
    {
      label: "E-Mail",
      field: "username",
      placeholder: "Email will be your user name",
      initialValue: profile ? defaultValue.user_name : "",
      rules: [
        {
          type: "email",
          message: "The input is not valid E-mail!"
        },
        {
          required: true,
          message: "Please input your E-mail!"
        }
      ]
    },
    {
      label: "Full Name",
      field: "fullname",
      initialValue: profile ? defaultValue.user_full_name : "",
      rules: [
        {
          required: true,
          message: "Please input your Full Name!"
        }
      ]
    },
    {
      label: "Password",
      field: "password",
      hasFeedback: true,
      rules: [
        {
          required: true,
          message: "Please input your password!"
        },
        {
          validator: validateToNextPassword
        }
      ]
    },
    {
      label: "Confirm Password",
      field: "confirm",
      hasFeedback: true,
      handleConfirmBlur: e => methods.handleConfirmBlur(e, this),
      rules: [
        {
          required: true,
          message: "Please confirm your password!"
        },
        {
          validator: compareToFirstPassword
        }
      ]
    },
    {
      label: "Address",
      field: "address",
      initialValue: profile ? defaultValue.user_address : ""
    },
    {
      label: "Phone Number",
      field: "phone",
      addonBefore: prefixSelector,
      initialValue: profile ? defaultValue.user_phone_number : "",
      style: { width: "100%" }
    }
  ];

  const formLogin = [
    {
      field: "username",
      placeholder: "Username",
      icon: "user",
      rules: [{ required: true, message: "Please input your username!" }]
    },
    {
      field: "password",
      placeholder: "Password",
      icon: "lock",
      rules: [
        {
          required: true,
          message: "Please input your password!"
        }
      ]
    }
  ];

  if (loginForm) {
    return (
      <Form onSubmit={methods.handleSubmit} className="login-form">
        {formLogin.map(item => (
          <Form.Item key={item.field}>
            {getFieldDecorator(item.field, {
              rules: item.rules
            })(
              <Input
                key={item.label}
                prefix={
                  <Icon type={item.icon} style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder={item.placeholder}
              />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or
          <Link href="/register">
            <a> Register Now!</a>
          </Link>
        </Form.Item>
      </Form>
    );
  }

  return (
    <Form
      {...formItemLayout}
      onSubmit={e => methods.handleSubmit(e, this.props)}
    >
      {formToRender.map(item => {
        /**
         * For Readability, if then else
         * is better than itinerary operator
         */
        if (
          profile &&
          (item.field === "password" || item.field === "confirm")
        ) {
          return null;
        } else {
          return (
            <Form.Item
              label={item.label}
              key={item.field}
              hasFeedback={item.hasFeedback}
            >
              {getFieldDecorator(item.field, {
                initialValue: item.initialValue,
                rules: item.rules
              })(
                <Input
                  key={item.label}
                  placeholder={item.placeholder}
                  onBlur={item.handleConfirmBlur}
                  addonBefore={item.addonBefore}
                  style={item.style}
                />
              )}
            </Form.Item>
          );
        }
      })}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {profile ? "Save" : "Register"}
        </Button>
      </Form.Item>
    </Form>
  );
}
