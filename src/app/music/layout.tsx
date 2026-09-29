'use client'

import Navigation from '@/components/Navigation/Navigation';
import { ReactNode } from 'react';
import styles from '@/app/music/layout.module.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { UseInitAuth } from '@/hooks/useInitAuth';

interface pageLayoutProps {
  children: ReactNode;
}

export default function pageLayout({ children }: pageLayoutProps) {
  UseInitAuth()
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <FetchingTracks />
            <Navigation />
            {children}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
