import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PasswordFormData } from '@/zod-schemas';
import { Form, Input, Button } from '..';

const PasswordForm = () => {
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    console.log('Данные формы:', data);
  };

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <Input type="hidden" name="subject" value="Восстановление пароля" />
        <Input type="email" name="email" required placeholder="E-mail" />

        <Button size="small" variant="green" icon="arrow-right" full>
          Senden
        </Button>
      </Form>
    </>
  );
};

export default PasswordForm;
