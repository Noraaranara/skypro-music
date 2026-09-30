import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import ReduxProvider from '@/store/ReduxProvider';

describe('Search component', () => {
  test('Отрисовка поля поиска', () => {
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>,
    );

    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
  });

  test('Ввод текста в поле поиска', () => {
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>,
    );

    const input = screen.getByPlaceholderText('Поиск');

    fireEvent.change(input, {
      target: {
        value: 'Chase',
      },
    });

    expect(input).toHaveValue('Chase');
  });

  test('Очистка поля поиска', () => {
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>,
    );

    const input = screen.getByPlaceholderText('Поиск');

    fireEvent.change(input, {
      target: {
        value: 'Chase',
      },
    });

    fireEvent.change(input, {
      target: {
        value: '',
      },
    });

    expect(input).toHaveValue('');
  });
});
