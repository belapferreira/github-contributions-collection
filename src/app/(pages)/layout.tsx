import { Header } from '@/components/Header';
import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Git Contribs',
};

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <>
      <Header />

      {children}
    </>
  );
}
