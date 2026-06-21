'use client';

import { useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useUrlError } from '@/shared/hooks/useUrlError';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateWordSchema, GenerateWordFormData } from '@/zod-schemas';
import { Form, Input, Button } from '@/components';
import { usePopup } from '@/stores/popup-store';
import { useState } from 'react';
import levelsData from '@/database/levels.json';
import categoriesData from '@/database/categories.json';

const levelOptions = levelsData.map(l => ({
  value: l.level,
  label: `${l.level} - ${l.title}`,
}));

const GenerateWordForm = () => {
  const router = useRouter();
  const { setUrlError } = useUrlError();
  const openPopup = usePopup(state => state.openPopup);
  const [loading, setLoading] = useState(false);

  const form = useForm<GenerateWordFormData>({
    resolver: zodResolver(generateWordSchema),
    defaultValues: { word: '', level: '', category: '' },
  });

  const [word, level, category] = useWatch({
    control: form.control,
    name: ['word', 'level', 'category'],
  });

  useEffect(() => {
    form.setValue('category', '');
  }, [level, form]);

  const categoryOptions = categoriesData
    .filter(c => c.level === level)
    .map(c => ({ value: c.slug, label: c.name }));

  const isDisabled = !word || !level || !category;

  const onSubmit = async (data: GenerateWordFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/words/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('word-generation-error');
      }
      const result = await response.json();

      if (result.message) {
        throw new Error('word-generation-error');
      }

      console.log('Результат:', result);
      openPopup('message', {
        image: '/img/lex/success.webp',
        title: 'Готово',
        text: 'Слово сгенерированно и добавлено в базу. Хочешь посмотреть?',
        choice: true,
        buttonEvent: () =>
          router.push(`/levels/${result.word.level}/${result.word.category}/${result.word.slug}`),
      });
    } catch (error) {
      setUrlError(error instanceof Error ? error.message : 'word-generation-error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} loading={loading}>
      <Input type="text" name="word" placeholder="Слово на немецком" />
      <Input type="select" name="level" placeholder="Выбери уровень" options={levelOptions} />
      {level && (
        <Input type="select" name="category" placeholder="Выбери тему" options={categoryOptions} />
      )}
      <Button
        size="small"
        variant="green"
        icon="arrow-right"
        full
        loading={loading}
        disabled={isDisabled}
      >
        Сгенерировать переводы
      </Button>
    </Form>
  );
};

export default GenerateWordForm;
