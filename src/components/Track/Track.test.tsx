import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Track from './Track';
import ReduxProvider from '@/store/ReduxProvider';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('Track component', () => {
  test('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );

    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);

    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);

    expect(screen.getAllByText(mockTrack.album).length).toBeGreaterThan(0);

    expect(screen.getByText('3:25')).toBeInTheDocument();
  });

  test('Клик по треку', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );

    const trackName = document.querySelector('.track__titleLink');

    expect(trackName).toBeInTheDocument();

    fireEvent.click(trackName!);

    expect(trackName).toBeInTheDocument();
  });

  test('Отображается иконка лайка или дизлайка', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );

    const icon = document.querySelector('use');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('xlink:href');
  });
});
