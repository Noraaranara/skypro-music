import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Filter from './Filter';
import ReduxProvider from '@/store/ReduxProvider';

const mockTracks: TrackType[] = data;

describe('Filter component', () => {
  test('Отрисовка фильтров', () => {
    render(
      <ReduxProvider>
        <Filter tracks={mockTracks} />
      </ReduxProvider>,
    );

    expect(screen.getByText('Искать по:')).toBeInTheDocument();

    expect(screen.getByText('исполнителю')).toBeInTheDocument();

    expect(screen.getByText('году выпуска')).toBeInTheDocument();

    expect(screen.getByText('жанру')).toBeInTheDocument();
  });

  test('Открытие фильтра по исполнителю', () => {
    render(
      <ReduxProvider>
        <Filter tracks={mockTracks} />
      </ReduxProvider>,
    );

    fireEvent.click(screen.getByText('исполнителю'));

    expect(screen.getByText('Alexander Nakarada')).toBeInTheDocument();

    expect(screen.getByText('Frank Schroter')).toBeInTheDocument();

    expect(screen.getByText('Kevin Macleod')).toBeInTheDocument();
  });

  test('Открытие фильтра по жанру', () => {
    render(
      <ReduxProvider>
        <Filter tracks={mockTracks} />
      </ReduxProvider>,
    );

    fireEvent.click(screen.getByText('жанру'));

    expect(screen.getByText('Классическая музыка')).toBeInTheDocument();
  });

  test('Открытие фильтра по году', () => {
    render(
      <ReduxProvider>
        <Filter tracks={mockTracks} />
      </ReduxProvider>,
    );

    fireEvent.click(screen.getByText('году выпуска'));

    expect(screen.getByText('Сначала новые')).toBeInTheDocument();

    expect(screen.getByText('Сначала старые')).toBeInTheDocument();

    expect(screen.getByText('По умолчанию')).toBeInTheDocument();
  });

  test('Закрытие фильтра при повторном нажатии', () => {
    render(
      <ReduxProvider>
        <Filter tracks={mockTracks} />
      </ReduxProvider>,
    );

    const filterButton = screen.getByText('исполнителю');

    fireEvent.click(filterButton);

    expect(screen.getByText('Alexander Nakarada')).toBeInTheDocument();

    fireEvent.click(filterButton);

    expect(screen.queryByText('Alexander Nakarada')).not.toBeInTheDocument();
  });
});
