'use client';

import { useForm } from 'react-hook-form';
import { usePopup } from '@/stores/popup-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/zod-schemas';
import { Form, Input, Button, Text } from '../../components';

const LoginForm = () => {
  const { openPopup } = usePopup();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('Данные формы:', data);
  };

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <Input type="email" name="email" required placeholder="E-mail" />
        <Input type="password" name="password" required placeholder="Password" />
        <Button size="small" variant="green" icon="arrow-right" full>
          Sign in
        </Button>
      </Form>

      <Text align="center" light size="small" color="green" onClick={() => openPopup('password')}>
        Забыли пароль?
      </Text>
    </>
  );
};

export default LoginForm;
