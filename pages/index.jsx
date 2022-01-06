import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import PageTitle from '../components/PageTitle';

// Tailwind CSS classes 
const title = `text-center text-2xl font-bold mb-4`;
const btn = `p-4 max-w-full mt-12 w-96 text-center bg-gray-900 text-gray-50 block mx-auto transition-all duration-100 ease-in hover:bg-gray-800 shadow-lg`;
const promo_text = `mt-12 text-center`;

// useSWR Fetcher
const fetcher = (...args) => fetch(...args).then(res => res.json());

const Index = () => {
  const { data, error } = useSWR('/api/get-promo', fetcher);

  return (
    <>
      <PageTitle title="Seja bem-vindo" />

      <h1 className={title}>
        Seja muito bem-vindo(a) a área de opiniões
      </h1>

      <p className='text-center'>
        A pousada Villa Monte Verde sempre busca atender melhor nossos clientes. <br />
        Por isso, estamos sempre disponíveis para ouvir a sua opinião e melhorar nossos serviços.
      </p>

      <Link href="/opiniao">
        <a className={btn}>Deixe aqui a sua opinião</a>
      </Link>

      {
        !data &&

        <p className={promo_text}>Verificando promoções...</p>
      }

      {
        data &&
        !data.showPromotion &&

        <p className={promo_text}>
          Não temos promoções ativas no momento. 🙁
        </p>
      }

      {
        data &&
        data.showPromotion &&

        <p className={promo_text}>
          {data.promotionMessage}
        </p>
      }
    </>
  )
}

export default Index;