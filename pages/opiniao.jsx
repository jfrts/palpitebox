import React from "react";
import PageTitle from '../components/PageTitle';

// Tailwind CSS classes
const title = `text-center text-2xl font-bold mb-4`;
const label = `block tracking-wide text-gray-800 text-sm mb-1 mt-6`;
const input = `appearance-none block w-full bg-gray-100 text-gray-900 border border-gray-300 shadow-xs rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-50`;
const btn = `p-4 mt-12 w-96 text-center bg-gray-900 text-gray-50 block mx-auto transition-all duration-100 ease-in hover:bg-gray-800 shadow-lg`;

const Opiniao = () => {
  const [form, setForm] = React.useState({
    Nome: '',
    Email: '',
    WhatsApp: '',
    'Avaliação': '',
    'Opinião': ''
  });

  const [success, setSuccess] = React.useState(false);
  const [giftReturn, setGiftReturn] = React.useState({});

  const ratingValues = [1, 2, 3, 4, 5];

  const save = async () => {
    const response = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(form)
    })

    const data = await response.json();
    setSuccess(true);
    setGiftReturn(data);
  }

  const inputChanged = event => {
    console.log(event);

    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <PageTitle title="Deixe aqui a sua opinião" />

      {
        !success &&

        <section>
          <h1 className={title}>
            Críticas e Sugestões
          </h1>

          <p className='text-center'>
            A pousada Villa Monte Verde sempre busca atender melhor nossos clientes. <br />
            Por isso, estamos sempre disponíveis para ouvir a sua opinião e melhorar nossos serviços.
          </p>

          <div className="my-8">
            <label htmlFor="Nome" className={label}>Nome:</label>
            <input type="text" id="Nome" name="Nome" onChange={inputChanged} value={form.Nome} className={input} />

            <label htmlFor="Email" className={label}>E-mail:</label>
            <input type="text" id="Email" name="Email" onChange={inputChanged} value={form.Email} className={input} />

            <label htmlFor="WhatsApp" className={label}>WhatsApp:</label>
            <input type="text" id="WhatsApp" name="WhatsApp" onChange={inputChanged} value={form.WhatsApp} className={input} />

            <label htmlFor="Avaliação" className={label}>Avaliação:</label>
            <div className="flex gap-2 items-center">
              {
                ratingValues.map(value => (
                  <>
                    <input type="radio" id={value} name="Avaliação" onChange={inputChanged} value={value} />
                    <label for={value} className="mr-4">{value}</label>
                  </>
                ))
              }
            </div>

            <label htmlFor="Opinião" className={label}>Deixe aqui sua opinião / sugestão:</label>
            <textarea rows={5} id="Opinião" name="Opinião" onChange={inputChanged} value={form["Opinião"]} className={input} />

            <button onClick={save} className={btn}>Enviar</button>
          </div>
        </section>
      }

      {
        success &&
        giftReturn.gift &&

        <section className="my-8 text-center">
          <h2 className="text-3xl my-4">Obrigado por nos ajudar a melhorar. 😃</h2>
          <p>Utilize o código para receber nosso presente. 🎁</p>
          <span className="font-bold text-3xl block my-6 p-6 text-gray-50 bg-gray-800">{giftReturn.gift}</span>
          <p className="text-gray-700">{giftReturn.promotionMessage}</p>
        </section>
      }

      {
        success &&
        !giftReturn.gift &&

        <section className="my-8 text-center">
          <h2 className="text-3xl my-4">Obrigado por nos ajudar a melhorar. 😃</h2>
        </section>
      }
    </>
  )
}

export default Opiniao;