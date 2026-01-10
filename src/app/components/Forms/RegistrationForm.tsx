import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormData } from '@/zod-schemas';
import { Form, Input, Button, Text } from '..';

const RegistrationForm = () => {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      agree: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    console.log('Данные формы:', data);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Input type="text" name="name" placeholder="Имя" />
      <Input
        type="select"
        name="language"
        placeholder="Select your language"
        required
        options={[
          { value: 'EN', label: 'English' },
          { value: 'FR', label: 'Français' },
          { value: 'UA', label: 'Українська' },
          { value: 'PL', label: 'Polski' },
          { value: 'IT', label: 'Italiano' },
          { value: 'ES', label: 'Español' },
          { value: 'TR', label: 'Türkçe' },
          { value: 'RU', label: 'Русский' },
        ]}
      />

      <Input type="email" name="email" required placeholder="E-mail" />
      <Input type="password" name="password" required placeholder="Password" />
      <Input type="checkbox" name="agree" required>
        Mit Klick auf den Button stimmen Sie den <Text href="./profile">Datenschutzbestimmungen</Text> zu
      </Input>
      <Button size="small" variant="green" icon="arrow-right" full>
        Create accaunt
      </Button>
    </Form>
  );
};

export default RegistrationForm;
