
## Other issues found during React import pass

| Файл | Строка | Проблема |
|------|--------|----------|
| `src/app/[locale]/layout.tsx` | 3 | Комментарий `//hasLocale` оставлен рядом с импортом — `hasLocale` фактически используется ниже, но комментарий вводит в заблуждение |
| `src/components/Forms/InputSelect/InputSelect.tsx` | 73 | Приведение `(error as any)?.message` — небезопасный `any`; лучше `(error as { message?: string })?.message` |
| `src/components/Forms/InputPassword/InputPassword.tsx` | 58 | Приведение `(error as any)?.message` — небезопасный `any` |
| `src/components/Forms/InputDefault/InputDefault.tsx` | 59 | Приведение `(error as any)?.message` — небезопасный `any` |
| `src/components/Forms/InputTextarea/InputTextarea.tsx` | 58 | Приведение `(error as any)?.message` — небезопасный `any` |
| `src/components/Forms/InputSelect/InputSelect.tsx` | 9 | `InputSelect` использует `React.FC<InputSelectProps>`, но тип не проверяет наличие контекста формы — падает с ошибкой если нет `FormProvider` (в отличие от `InputDefault`/`InputPassword`, где есть `try/catch`) |
| `src/components/Forms/InputCheckbox/InputCheckbox.tsx` | 12-15 | Возврат `null` при отсутствии `formContext` без предупреждения — тихий сбой |
| `src/components/Buttons/ButtonMenu\ButtonMenu.tsx` | 16 | Проп `onClick` берётся из `HTMLAttributes<HTMLButtonElement>`, но типизация интерфейса расширяет `HTMLAttributes<HTMLButtonElement>`, а не `HTMLAttributes<HTMLAnchorElement>` — при `href` onClick на `<Link>` может иметь несовместимый тип |
| `src/components/Collections/Levels/Level.tsx` | — | Дубликат компонента `LevelSingle.tsx` — оба файла содержат практически идентичный код |
| `src/components/Icon/Icon.tsx` | 519 | Проп `AvatarPlus` получает `stroke` из `IconPropTypes`, но `AvatarPlus` его игнорирует (жёстко задан цвет) |
| `src/components/Forms/Fieldset/Fieldset.tsx` | 6 | Опечатка в имени пропа: `cal` вместо `col` или `columns` — неочевидное API |
| `src/components/Forms/Fieldset/Fieldset.tsx` | 3 | Интерфейс называется `fieldsetProdTypes` (опечатка: `Prod` вместо `Prop`) |
| `src/components/CenteredMessage/CenteredMessage.tsx` | 4 | Интерфейс называется `childrenType` вместо `CenteredMessageProps` — не соответствует конвенции именования |
